import {
  CoolController,
  CoolUrlTag,
  TagTypes,
  BaseController
} from '@cool-midway/core';
import { RpcBaseController } from '~/RpcBaseController';
import { TestGoodsEntity } from '../../entity/goods';


@CoolUrlTag({
  key: TagTypes.IGNORE_TOKEN,
  value: ['*']
})
@CoolController({
  entity: TestGoodsEntity,
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  rpc: {
    serviceName: 'micro-user',      // RPC 服务名称
    controllerName: 'testGoodsService', // RPC 控制器名称
  },
})
export class AppTestGoodsController extends RpcBaseController { }
