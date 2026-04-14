// import { CoolController } from '@cool-midway/core';
import { RpcBaseController } from '~/RpcBaseController';



// /**
//  * 商品模块 - 商品信息
//  */
// @CoolController({
//   api: ['add', 'delete', 'update', 'info', 'list', 'page'],
//   rpc: {
//     serviceName: 'micro-user',      // RPC 服务名称
//     controllerName: 'testGoodsService', // RPC 控制器名称
//   },
//   pageQueryOp: {
//     fieldEq: ['a.status'],
//     keyWordLikeFields: ['a.title']
//   },

// })
// export class AdminTestGoodsController extends RpcBaseController {

// }


import { CoolController, BaseController } from '@cool-midway/core';
import { TestGoodsEntity } from '../../entity/goods';

/**
 * 用户信息
 */

@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: TestGoodsEntity,
  pageQueryOp: {
    fieldEq: ['a.status'],
    keyWordLikeFields: ['a.title'],
  },
})
export class AdminTestGoodsController extends BaseController { }
