import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CozeInfoEntity } from '../entity/info';

/**
 * Coze配置服务
 */
@Provide()
export class CozeInfoService extends BaseService {
  @InjectEntityModel(CozeInfoEntity)
  cozeInfoEntity: Repository<CozeInfoEntity>;
}
