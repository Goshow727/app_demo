import {
    CoolController,
    BaseController,
    CoolUrlTag,
    TagTypes,
    CoolTag,
} from '@cool-midway/core';
import { Body, Get, Inject, Post, Query } from '@midwayjs/core';
import { RpcBaseController } from '~/RpcBaseController';

/**
 * 登录接口
 */
@CoolUrlTag()
@CoolController({
    rpc: {
        serviceName: 'micro-user',      // RPC 服务名称
        controllerName: 'WechatPayService', // RPC 控制器名称
    },
})
export class AppPaymentController extends RpcBaseController {

    /**
     * 微信h5支付
     * @param body 
     * @returns 
     */
    @CoolTag(TagTypes.IGNORE_TOKEN)

    @Post('/h5', { summary: 'h5Pay 微信h5支付' })
    async h5Pay(@Body() body: any) {
        const { serviceName, controllerName } = this.curdOption.rpc
        const result = await this.rpc.call(serviceName, controllerName, 'h5Pay', body);
        return this.ok(result);
    }

    /**
    * jsapi支付
    * @param body 
    * @returns 
    */
    @CoolTag(TagTypes.IGNORE_TOKEN)
    @Post('/jsapi', { summary: 'jsapi支付' })
    async jsapi(@Body() body: any) {
        const { serviceName, controllerName } = this.curdOption.rpc
        const result = await this.rpc.call(serviceName, controllerName, 'jsapiPay', body);
        return this.ok(result);
    }

    /**
     * native支付
     * @param body 
     * @returns 
     */
    @CoolTag(TagTypes.IGNORE_TOKEN)
    @Post('/native', { summary: 'native 支付' })
    async native(@Body() body: any) {
        const { serviceName, controllerName } = this.curdOption.rpc
        const result = await this.rpc.call(serviceName, controllerName, 'nativePay', body);
        return this.ok(result);
    }



}
