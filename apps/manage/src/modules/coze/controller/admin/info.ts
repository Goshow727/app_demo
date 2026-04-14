import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CozeInfoEntity } from '../../entity/info';
import { CozeInfoService } from '../../service/info';

/**
 * Coze配置管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CozeInfoEntity,
  service: CozeInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.appName', 'a.workspaceName'],
    fieldEq: ['a.status', 'a.appId'],
    select: ['a.*'],
    addOrderBy: {
      createTime: 'desc',
    },
  },
})
export class AdminCozeInfoController extends BaseController {
  @Inject()
  cozeInfoService: CozeInfoService;
}
