import { Inject, InjectClient, Provide } from '@midwayjs/core';
import {
  BaseRpcService,
  CoolRpcService,
} from '@cool-midway/rpc';
// import axios from 'axios';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { MerchantInfoEntity } from '../../merchant/entity/info';
import { CoolCommException } from '@cool-midway/core';
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
import { BaseSysParamEntity } from '../../base/entity/sys/param';




/**
 * 服务端RPC服务
 */
@Provide()
@CoolRpcService()
export class RpcService extends BaseRpcService {
  // 商户配置实体
  @InjectEntityModel(MerchantInfoEntity)
  merchantInfoEntity: Repository<MerchantInfoEntity>;

  // 参数实体
  @InjectEntityModel(BaseSysParamEntity)
  baseSysParamEntity: Repository<BaseSysParamEntity>;

  // 缓存
  @InjectClient(CachingFactory, 'default')
  midwayCache: MidwayCache;


  /**
   * 获取微信商户号和小程序签名配置
   */
  async getMerchantConfig(params: any = { where: {} }) {
    try {
      const merchant = await this.merchantInfoEntity.find(params);
      return merchant;
    } catch (error) {
      throw new CoolCommException(error.message);
    }
  }

  /**
   * 系统参数
   * @param key 参数键
   */
  async getSysParams(key: string = "all") {
    let result: any = await this.midwayCache.get(`param:${key}`);
    if (!result) {
      // console.log('获取系统参数参数', key);
      if (key === "all") {
        result = await this.baseSysParamEntity.find();
      } else {
        result = await this.baseSysParamEntity.findOneBy({ keyName: key });
      }
      // 缓存
      this.midwayCache.set(`param:${key}`, result, 1000 * 60 * 1); // 缓存1分钟
    }
    if (result && key !== 'all') {
      if (result.dataType == 0) {
        try {
          return JSON.parse(result.data);
        } catch (error) {
          return result.data;
        }
      }
      if (result.dataType == 1) {
        return result.data;
      }
      if (result.dataType == 2) {
        return result.data.split(',');
      }
    }
    return result;
  }
}