import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { MerchantInfoEntity } from '../entity/info';

/**
 * 商户信息服务
 */
@Provide()
export class MerchantInfoService extends BaseService {
  @InjectEntityModel(MerchantInfoEntity)
  merchantInfoEntity: Repository<MerchantInfoEntity>;
}
