import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 商户信息
 */
@Entity('merchant_info')
export class MerchantInfoEntity extends BaseEntity {
  @Column({ comment: '商户号名称' })
  name: string;
  // dict: ['微信', '支付宝'],
  @Column({ comment: '商户类型', default: 0 })
  type: number;
  @Index()
  @Column({ comment: '应用ID' })
  appId: string;

  @Column({ comment: '应用密钥' })
  appSecret: string;

  @Index()
  @Column({ comment: '商户号' })
  mchid: string;

  @Column({ comment: 'APIv3密钥' })
  v3Key: string;

  @Column({ comment: '证书 apiclientCert', type: 'text' })
  apiclientCert: string;

  @Column({ comment: '私钥 apiclientKey', type: 'text' })
  apiclientKey: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '状态', dict: ['禁用', '启用'], default: 1 })
  status: number;
}
