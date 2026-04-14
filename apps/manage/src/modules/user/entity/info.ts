import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 用户信息
 */
@Entity('user_info')
export class UserInfoEntity extends BaseEntity {

  @Column({ comment: '头像', nullable: true })
  avatarUrl: string;

  @Column({ comment: '昵称', nullable: true })
  nickName: string;

  @Index({ unique: true })
  @Column({ comment: '手机号', nullable: true })
  phone: string;

  @Column({ comment: '性别', dict: ['未知', '男', '女'], default: 0 })
  gender: number;

  @Column({ comment: '状态', dict: ['禁用', '正常', '已注销'], default: 1 })
  status: number;

  @Column({ comment: '登录方式', dict: ['小程序', '公众号H5', 'PC'], default: 0 })
  loginType: number;

  @Column({ comment: '密码', nullable: true })
  password: string;

  @Column({ comment: '最后登录时间', default: () => 'CURRENT_TIMESTAMP' })
  lastLoginTime: Date;

  @Column({ comment: '上级用户ID', nullable: true, default: null })
  parentId: number | null;

  @Column({ comment: '账户推广金额', type: 'decimal', precision: 10, scale: 2, default: 0 })
  inviteAmount: number;

  @Column({ comment: '推广奖励算力', type: 'decimal', precision: 10, scale: 2, default: 0 })
  inviteRewardPower: number;

  @Column({ comment: '算力值', type: 'decimal', precision: 10, scale: 2, default: 0 })
  power: number;

  @Column({ comment: '会员过期时间', nullable: true })
  expireTime: Date;

  @Column({ comment: '用户角色', dict: ['会员用户', '代理'], default: 0 })
  userRole: number;

  @Column({ comment: '代理状态', dict: ['未开通', '已开通', '已冻结'], default: 0 })
  agentStatus: number;

  // @Index({ unique: true })
  // @Column({ comment: '推广码' })
  // referralCode: string;

  // @Column({ comment: '用户ID', nullable: true })
  // userId: string;

  @Column({ comment: '姓名', nullable: true })
  realName: string;

  @Column({ comment: '账号状态', dict: ['未授权', '正常', '锁定', '注销'], default: 0 })
  accountStatus: number;

  @Column({ comment: 'H5 OpenID', nullable: true })
  h5Openid: string;

  @Column({ comment: '小程序OpenID', nullable: true })
  miniProgramOpenid: string;

  @Column({ comment: '注册来源', dict: ['其他', '公众号H5', '小程序', 'PC'], default: 0 })
  source: number;
}
