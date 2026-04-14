import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 订单列表
 */
@Entity('payment_order')
export class PaymentOrderEntity extends BaseEntity {
    @Column({ comment: '用户手机号' })
    userPhone: string;

    @Column({ comment: '用户ID' })
    userId: number;
    // '支付宝',
    @Column({ comment: '支付类型', dict: ['微信'], default: 0 })
    paymentType: number;

    @Index({ unique: true })
    @Column({ comment: '订单ID' })
    orderId: string;

    @Column({
        comment: '订单类型',
        // , '算力卷'
        dict: ['会员充值', '算力充值'],
        default: 0,
    })
    orderType: number;


    @Column({ comment: '到账算力' })
    powerAmount: string;

    @Column({ comment: '赠送算力数量' })
    power: number;

    @Column({ comment: '赠送会员天数' })
    days: number;

    @Column({ comment: '订单名称' })
    orderName: string;

    @Column({ comment: '订单名称ID' })
    orderNameId: string;

    @Column({
        comment: '原价',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
    })
    originalPrice: number;

    @Column({
        comment: '订单金额',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
    })
    orderAmount: number;

    @Column({
        comment: '支付金额',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
    })
    payAmount: number

    @Column({ comment: '支付时间', nullable: true })
    payTime: Date

    @Column({ comment: '支付渠道', dict: ['小程序', 'H5', 'PC'], nullable: true })
    payChannel: number;

    @Column({
        comment: '状态',
        dict: ['待支付', '已取消', '已超时', '已支付', '已退款'],
        default: 0,
    })
    orderStatus: number;

    @Index({ unique: true })
    @Column({ comment: '退款订单ID', nullable: true })
    refundOrderId: string;

    @Column({ comment: '退款时间', nullable: true })
    refundTime: Date;

    @Column({ comment: '退款操作人', nullable: true })
    refundUserId: string;

    @Column({ comment: '退款操作人', nullable: true })
    refundUsername: string;

    @Column({
        comment: '退款金额',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
    })
    refundAmount: number;

    @Column({ comment: '备注', nullable: true })
    remark: string;
}
