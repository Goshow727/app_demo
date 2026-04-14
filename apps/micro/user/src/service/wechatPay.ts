import { Inject, Provide } from '@midwayjs/core';
import {
    BaseRpcService,
    CoolRpcService,
} from '@cool-midway/rpc';
import WxPay from 'wechatpay-node-v3';
import { Utils } from '../utils/utils';


import { CoolCommException } from '@cool-midway/core';
import { CoolRpc } from '@cool-midway/rpc'; // 导入CoolRpc
import { UserInfoEntity } from '../entity/user_info';

/**
 * 描述
 */
@Provide()
@CoolRpcService({
    entity: UserInfoEntity,
    method: ['add', 'delete', 'update', 'info', 'list', 'page']
})
export class WechatPayService extends BaseRpcService {

    @Inject()
    ctx: any;
    @Inject()
    utils: Utils
    @Inject()
    rpc: CoolRpc; // 注入CoolRpc实例

    pay: WxPay;


    /**
     * 初始化支付
     */
    async init(): Promise<void> {
        await super.init();
        // this.payConfig();
        // 需等待RPC服务初始化完成，才能调用payConfig
        setTimeout(this.payConfig.bind(this), 3000);

    }

    // /**
    //  * 检查RPC连接状态
    //  */
    // async checkRpcStatus(): Promise<boolean> {
    //     try {
    //         // 获取底层的ServiceBroker实例
    //         const broker = this.rpc.getBroker();

    //         // 检查broker的连接状态
    //         // 从moleculer的类型定义看，transit对象有connected和isReady属性
    //         if (broker && broker.transit) {
    //             const isConnected = broker.transit.connected;
    //             const isReady = broker.transit.isReady;

    //             console.log(`RPC Connection Status - Connected: ${isConnected}, Ready: ${isReady}`);

    //             return isConnected && isReady;
    //         }

    //         console.log('RPC Connection Status - Broker or transit is not available');
    //         return false;
    //     } catch (error) {
    //         console.error('Error checking RPC connection status:', error);
    //         return false;
    //     }
    // }

    // /**
    //  * 安全的RPC调用 - 在调用前检查连接状态
    //  */
    // async safeRpcCall(serviceName: string, controller: string, method: string, params?: any) {
    //     // 先检查RPC连接状态
    //     const isRpcConnected = await this.checkRpcStatus();

    //     if (!isRpcConnected) {
    //         throw new CoolCommException('RPC服务未连接，请检查网络或服务配置');
    //     }
    //     try {
    //         const result = await this.rpc.call(serviceName, controller, method, params);
    //         return result;
    //     } catch (error) {
    //         console.error(`RPC调用失败: ${serviceName}.${controller}.${method}`, error);
    //         throw new CoolCommException(`RPC调用失败: ${error.message}`);
    //     }
    // }

    /**
     * 支付配置
     */
    async payConfig() {
        console.log('获取到商户配置');
        // 使用安全的RPC调用来确保连接可用
        const merchant: any = await this.rpc.call(
            'main',    // 主服务名称，需要根据实际情况调整
            'RpcService',        // 主服务中的控制器/服务名称
            'getMerchantConfig',    // 要调用的方法名
            { where: { type: 0 } } // params 查询微信商户号配置
        );

        if (!merchant || (Array.isArray(merchant) && merchant.length === 0)) {
            throw new CoolCommException('商户配置不存在');
        }

        // 处理可能的数组或对象响应
        const merchantData = Array.isArray(merchant) ? merchant[0] : merchant;
        const { appId, mchid, apiclientCert, apiclientKey } = merchantData;

        // console.log('获取到商户配置:', { appId, mchid, apiclientCert, apiclientKey });
        this.pay = new WxPay({
            appid: appId,
            mchid: mchid,
            publicKey: apiclientCert,   // 证书 → publicKey
            privateKey: apiclientKey,   // 私钥 → privateKey
        });
    }
    /**
     * h5支付
     */
    async h5Pay(payData: any) {

        try {
            const params = {
                description: '测试',
                out_trade_no: this.utils.orderNumber(1),
                notify_url: 'https://www.weixin.qq.com/wxpay/pay.php',
                amount: {
                    total: 1,
                },
                scene_info: {
                    payer_client_ip: "120.198.83.91",//await this.utils.getReqIP(this.ctx) as string,
                    h5_info: {
                        type: 'Wap',
                        app_name: '网页名称 例如 百度',
                        // app_url: 'http://127.0.0.1:8080',
                    },
                },
            };
            console.log(params);
            const { data, status } = await this.pay.transactions_h5(params);
            if (status !== 200) {
                throw new CoolCommException(data?.message || '支付失败');
            }
            return data;
        } catch (error) {
            console.log(error);
            throw new CoolCommException(error.message);
        }
    }

    /**
     * jsapi支付
     */
    async jsApiPay(payData: any) {

        try {
            const params = {
                description: '测试',
                out_trade_no: this.utils.orderNumber(1),
                notify_url: 'https://www.weixin.qq.com/wxpay/pay.php',
                amount: {
                    total: 1,
                },
                payer: {
                    openid: 'drEc8QfY',
                },
                scene_info: {
                    payer_client_ip: 'ip',
                },
            };
            console.log(params);
            const { data, status } = await this.pay.transactions_jsapi(params);
            if (status !== 200) {
                throw new CoolCommException(data?.message || '支付失败');
            }
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            throw new CoolCommException(error.message);
        }
    }

    /**
     * native支付
     */
    async nativePay(payData: any) {
        try {
            const params = {
                description: '测试',
                out_trade_no: this.utils.orderNumber(1),//订单号
                notify_url: 'https://www.weixin.qq.com/wxpay/pay.php',
                amount: {
                    total: 1,
                },
                scene_info: {
                    payer_client_ip: "120.198.83.91"
                },
            };
            const { data, status } = await this.pay.transactions_native(params);
            if (status !== 200) {
                throw new CoolCommException(data?.message || '支付失败');
            }
            return data;
        } catch (error) {
            console.log(error);
            throw new CoolCommException(error.message);
        }
    }

    /**
     * 退款
     */
    async refunds(refundData: any) {
        try {

            //  # {
            // #   mchid: '商户号',
            // #   appid: 'appid',
            // #   out_trade_no: '1610419296553',
            // #   transaction_id: '4200000848202101120290526543',
            // #   trade_type: 'NATIVE',
            // #   trade_state: 'SUCCESS',
            // #   trade_state_desc: '支付成功',
            // #   bank_type: 'OTHERS',
            // #   attach: '',
            // #   success_time: '2021-01-12T10:43:43+08:00',
            // #   payer: { openid: '' },
            // #   amount: { total: 1, payer_total: 1, currency: 'CNY', payer_currency: 'CNY' }
            // # }

            const params = {
                out_trade_no: '1615171309328', //订单号
                out_refund_no: this.utils.orderNumber(1), //退款订单号
                reason: '测试',
                amount: {
                    refund: 1,
                    total: 1,
                    currency: 'CNY',
                },
            };
            console.log(params);
            const { data, status }: any = await this.pay.refunds(params);
            if (status !== 200) {
                throw new CoolCommException(data?.message || '退款失败');
            }
            return data;

        } catch (error) {
            console.log(error);
            throw new CoolCommException(error.message);
        }
    }

    /**
     * 查询退款
     */
    async findRefunds(outRefundNo: string) {
        if (!outRefundNo) {
            throw new CoolCommException('退款订单号不能为空');
        }
        const result = await this.pay.find_refunds(outRefundNo);
        console.log(result);
    }

}