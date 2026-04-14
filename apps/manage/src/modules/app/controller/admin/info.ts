
import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { AppInfoEntity } from '../../entity/info';
import { AppInfoService } from '../../service/info';

/**
 * 应用配置管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: AppInfoEntity,
  service: AppInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.appName'],
    fieldEq: ['a.type'],
    select: ['a.*'],
  },
})
export class AdminAppInfoController extends BaseController {
  @Inject()
  appInfoService: AppInfoService;
}
