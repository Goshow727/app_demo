// import {
//     CoolController,
//     BaseController,
//     CoolUrlTag,
//     TagTypes,
//     CoolTag,
// } from '@cool-midway/core';
// import { Body, Get, Inject, Post, Query } from '@midwayjs/core';
// import { RpcBaseController } from '~/RpcBaseController';

// /**
//  * 登录
//  */
// @CoolUrlTag()
// @CoolController({
//     rpc: {
//         serviceName: 'micro-user',      // RPC 服务名称
//         controllerName: 'MiniService', // RPC 控制器名称
//     },
// })
// export class AppUserMiniController extends RpcBaseController {


//     @CoolTag(TagTypes.IGNORE_TOKEN)
//     @Post('/login', { summary: '小程序登录' })
//     async login(@Body() body) {
//         const { code, referralCode = '' } = body;
//         console.log(111, code, referralCode);

//         const { serviceName, controllerName } = this.curdOption.rpc;
//         const result = await this.rpc.call(serviceName, controllerName, 'login', { code, referralCode });
//         return this.ok(result);
//     }

//     @CoolTag(TagTypes.IGNORE_TOKEN)
//     @Post('/phone', { summary: '小程序登录获取手机号' })
//     async phone(@Body() body: any) {
//         const { code } = body;
//         const { serviceName, controllerName } = this.curdOption.rpc;
//         const result = await this.rpc.call(serviceName, controllerName, 'getUserPhone', code);
//         console.log(result);
//         return this.ok(result);
//     }


//     @CoolTag(TagTypes.IGNORE_TOKEN)
//     @Post('/bind/phone', { summary: '绑定用户手机号' })
//     async bindPhone(@Body() body: any) {
//         const { phone, openid } = body;
//         console.log(phone, openid);
//         const { serviceName, controllerName } = this.curdOption.rpc;
//         const result = await this.rpc.call(serviceName, controllerName, 'bindUserPhone', { phone, openid });
//         return this.ok(result);
//     }

// }
