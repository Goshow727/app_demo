import { Inject, Provide } from '@midwayjs/core';
import {
    BaseRpcService,
    CoolRpc,
    CoolRpcService,
} from '@cool-midway/rpc';
import axios from 'axios';

import { UserInfoEntity } from '../entity/user_info';
import { CoolCommException } from '@cool-midway/core';
import { TestGoodsEntity } from '../entity/goods';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';

import { Utils } from '../utils/utils';



/**
 * 描述
 */
@Provide()
@CoolRpcService({
    entity: TestGoodsEntity,
    method: ['add', 'delete', 'update', 'info', 'list', 'page']
})


export class MiniService extends BaseRpcService {
    @InjectEntityModel(UserInfoEntity)
    userInfoEntity: Repository<UserInfoEntity>;

    @Inject()
    rpc: CoolRpc; // 注入CoolRpc实例


    @Inject()
    utils: Utils;


    protected sysParamsData = new Map<string, any>();
    protected cachedAccessToken = null;
    protected accessTokenExpiresAt = 0;

    /**
     * 小程序配置
     */
    wxConfig = {
        appId: null,
        appSecret: null,
    };

    async init() {
        await super.init();
        setTimeout(async () => {
            await this.getSysParams();
            await this.miniProgramConfig();
        }, 3000);
    }

    /**
     * 支付配置
     */
    async miniProgramConfig() {
        console.log('获取小程序配置');
        // 使用安全的RPC调用来确保连接可用
        const merchant: any = await this.rpc.call(
            'main',    // 主服务名称，需要根据实际情况调整
            'RpcService',        // 主服务中的控制器/服务名称
            'getMerchantConfig',    // 要调用的方法名
            { where: { type: 0 } } // params 查询微信商户号配置
        );

        if (!merchant || (Array.isArray(merchant) && merchant.length === 0)) {
            throw new CoolCommException('小程序配置不存在');
        }

        // 处理可能的数组或对象响应
        const merchantData = Array.isArray(merchant) ? merchant[0] : merchant;
        const { appId, appSecret } = merchantData;
        this.wxConfig.appId = appId;
        this.wxConfig.appSecret = appSecret;
    }

    async getSysParams(key: string = "all") {
        console.log('获取系统参数参数');
        const data: any = await this.rpc.call(
            'main',    // 主服务名称，需要根据实际情况调整
            'RpcService',        // 主服务中的控制器/服务名称
            'getSysParams',    // 要调用的方法名
            key // 参数
        );
        data.map((item: any) => {
            this.sysParamsData.set(item.keyName, { value: item.data, remark: item.remark });
        });
    }

    /**
     * 获得小程序access_token
     */
    async getAccessToken() {

        // 缓存access_token
        if (this.cachedAccessToken && Date.now() < this.accessTokenExpiresAt) {
            return this.cachedAccessToken;
        }
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.wxConfig?.appId}&secret=${this.wxConfig?.appSecret}`;
        const res = await axios.get(url);
        this.cachedAccessToken = res.data.access_token;
        this.accessTokenExpiresAt = Date.now() + (res.data.expires_in * 1000);
        return this.cachedAccessToken;
    }

    /**
     * 获得小程序session（获取openid和session_key）
     */
    async code2Session(code: string) {
        try {
            const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.wxConfig?.appId}&secret=${this.wxConfig?.appSecret}&js_code=${code}&grant_type=authorization_code`;
            const response = await axios.get(url);
            if (response.data.errcode) throw new CoolCommException(`code2Session 失败: ${response.data.errmsg}`);
            return response.data;
        } catch (error) {
            // console.log(error);
            throw new CoolCommException(error.message);
        }

    }


    /**
     * 小程序登录 - 只获取openid
     */
    async login(params: any) {
        try {
            const { code, parentId } = params;
            if (!code) throw new CoolCommException('code不能为空');
            const session = await this.code2Session(code);
            // 获取用户的 openid
            const { openid } = session;
            // 查询用户是否已经存在
            let user = await this.userInfoEntity.findOne({
                where: {
                    miniProgramOpenid: openid,
                }
            });

            if (!user) {
                // 如果用户不存在，创建新用户
                user = new UserInfoEntity();
                user.miniProgramOpenid = openid;
                user.nickName = '微信用户'; // 设置默认昵称
                user.avatarUrl = ''; // 默认空头像
                user.loginType = 0; // 小程序登录方式
                user.lastLoginTime = new Date(); // 设置为当前时间
                user.accountStatus = 0; // 未授权状态
                user.parentId = parentId || null;// 上级用户ID
                // user.referralCode = this.utils.randomStr(10);
                // 保存新用户
                user = await this.userInfoEntity.save(user);
            } else {
                // 如果用户存在，更新最后登录时间
                user.lastLoginTime = new Date();
                user = await this.userInfoEntity.save(user);
            }

            delete user.password;
            // 返回用户信息
            return {
                ...session,
                userInfo: user
            };
        } catch (error) {
            console.log(error);
            throw new CoolCommException(error.message);
        }

    }

    /**
     * 小程序获取手机号
     */
    async getUserPhone(code: string) {
        try {
            const accessToken = await this.getAccessToken();
            const response = await axios.post(`https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${accessToken}`, { code });
            return response.data.phone_info;
        } catch (error) {
            // console.log(error);
            throw new CoolCommException(error.message);
        }
    }


    /**
     * 绑定手机号
     */
    async bindUserPhone(res: any) {
        try {
            const { phone, openid } = res;
            if (!phone || !openid) throw new CoolCommException('手机号或openid不能为空');
            const user = await this.userInfoEntity.findOne({
                where: {
                    miniProgramOpenid: openid
                }
            });

            if (!user) throw new CoolCommException('用户不存在');

            await this.userInfoEntity.update(user.id, { phone });

            // 更新上级用户推广金额
            if (user.parentId) {
                const parentUser: UserInfoEntity = await this.userInfoEntity.findOne({
                    where: {
                        id: user.parentId
                    }
                });

                if (parentUser) {
                    // 判断系统参数是否存在
                    if (!this.sysParamsData.has('inviteRewardPower')) {
                        await this.getSysParams();
                    }
                    // 获取系统参数值
                    const inviteRewardPower = Number(this.sysParamsData.get('inviteRewardPower')?.value || 0);
                    if (inviteRewardPower) {
                        // 更新上级用户推广奖励算力
                        await this.userInfoEntity.update(user.parentId, {
                            inviteRewardPower: () => `inviteRewardPower + ${inviteRewardPower}`,
                        });
                    }

                }
            }
        } catch (error) {
            throw new CoolCommException(error.message);
        }
    }
}
