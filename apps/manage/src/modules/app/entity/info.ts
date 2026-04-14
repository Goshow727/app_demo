import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 应用配置信息
 */
@Entity('app_info')
export class AppInfoEntity extends BaseEntity {
  @Index()
  @Column({ comment: '应用名称' })
  appName: string;

  @Column({ comment: '简介',  nullable: true })
  description: string;

  @Column({ comment: 'Logo', nullable: true })
  logo: string;

  @Column({
    comment: '应用类型',
    dict: ['小程序', 'H5', 'PC端'],
    default: 0
  })
  type: number;

  @Column({ comment: '分享标题', nullable: true })
  shareTitle: string;

  @Column({ comment: '分享图标', nullable: true })
  shareIcon: string;
}
