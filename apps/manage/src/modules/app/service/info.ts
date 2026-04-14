import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { AppInfoEntity } from '../entity/info';

/**
 * 应用配置服务
 */
@Provide()
export class AppInfoService extends BaseService {
  @InjectEntityModel(AppInfoEntity)
  appInfoEntity: Repository<AppInfoEntity>;
}
