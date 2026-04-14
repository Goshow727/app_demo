import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentOrderEntity } from '../entity/order';

/**
 * 订单服务
 */
@Provide()
export class PaymentOrderService extends BaseService {
  @InjectEntityModel(PaymentOrderEntity)
  paymentOrderEntity: Repository<PaymentOrderEntity>;

  /**
   * 示例：根据订单ID获取详情
   * @param orderId
   */
  async getByOrderId(orderId: string) {
    return await this.paymentOrderEntity.findOneBy({ orderId });
  }
}
