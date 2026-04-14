import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * Coze配置信息
 */
@Entity('coze_info')
export class CozeInfoEntity extends BaseEntity {

  @Index()
  @Column({ comment: '应用ID' })
  appId: string;

  @Column({ comment: '应用密钥' })
  appSecret: string;

  @Column({ comment: '应用公钥', type: 'text', nullable: true })
  publicKey: string;

  @Column({ comment: '空间名称' })
  workspaceName: string;

  @Column({ comment: '空间ID' })
  workspaceId: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '状态', dict: ['关闭', '开启'], default: 1 })
  status: number;
}
