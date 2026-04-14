import { CoolController, BaseController } from '@cool-midway/core';
import { MerchantInfoEntity } from '../../entity/info';
import { MerchantInfoService } from '../../service/info';

/**
 * 商户信息管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: MerchantInfoEntity,
  service: MerchantInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name', 'a.mchid'],
    fieldEq: ['a.status', 'a.appId'],
    select: ['a.*'],
  },
})
export class AdminMerchantInfoController extends BaseController { }
