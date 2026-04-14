import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { PaymentOrderEntity } from '../../entity/order';
import { PaymentOrderService } from '../../service/order';

/**
 * 订单管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: PaymentOrderEntity,
  service: PaymentOrderService,
  pageQueryOp: {
    keyWordLikeFields: ['orderId', 'orderName'],
    //  'paymentType',
    fieldEq: ['orderStatus', 'orderType', 'userId', 'userPhone'],
    // select: ['*'],
    addOrderBy: {
      createTime: 'desc',
    },
  },
})
export class AdminPaymentOrderController extends BaseController { }