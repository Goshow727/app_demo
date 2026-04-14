import { BaseController } from '@cool-midway/core';
import { CoolRpc } from '@cool-midway/rpc';
import { Inject, Provide } from '@midwayjs/core';

/**
 * 扩展的 BaseController，支持 RPC 调用
 */
// @Provide()
export abstract class RpcBaseController extends BaseController {
  @Inject()
  protected rpc: CoolRpc;
  private serviceName!: string;
  private controllerName!: string;


  async init() {
    // this.rpc = new CoolRpc();
    // console.log(this.rpc);

    await super.init();
    if (!this.curdOption?.rpc || !this.curdOption?.rpc?.serviceName || !this.curdOption?.rpc?.controllerName)
      throw new Error('请配置 RPC 服务名称和控制器名称');

    const { serviceName, controllerName } = this.curdOption.rpc;
    this.serviceName = serviceName;
    this.controllerName = controllerName;

    // 如果配置了 RPC，自动创建 RPC 调用方法
    // if (this.curdOption?.rpc) {
    //   const { serviceName, controllerName } = this.curdOption.rpc;
    //   const apis = this.curdOption.api || [];

    //   // 为每个 API 方法创建 RPC 调用
    //   for (const api of apis) {
    //     // console.log(this[api]);
    //     // if (!this[api]) {
    //     console.log(!!this[api], serviceName, controllerName, api);
    //     this[api] = async () => {
    //       // const body: any = this.baseCtx.method === 'POST' ? this.baseCtx.request.body : ;
    //       const body: any = Object.assign({}, this.baseCtx.request.query, this.baseCtx.request.body)
    //       let params = api === 'delete' ? (body as any).ids : body;

    //       if (api === 'info') {
    //         params = params.id;
    //       }
    //       console.log("执行微服务：", serviceName, controllerName, api, params);
    //       return this.ok(await this.rpc.call(serviceName, controllerName, api, params));
    //     };
    //     // }
    //   }
    // }
  }

  async info() {
    const { id } = this.baseCtx.request.query;
    console.log("rpc info", id);
    return this.ok(await this.rpc.call(this.serviceName, this.controllerName, 'info', id));
  }
  async add() {
    const { body } = this.baseCtx.request;
    console.log("rpc add", body);
    return this.ok(await this.rpc.call(this.serviceName, this.controllerName, 'add', body));
  }
  async page() {
    const { body } = this.baseCtx.request;
    console.log("rpc page", body);
    return this.ok(await this.rpc.call(this.serviceName, this.controllerName, 'page', body));
  }
  async list() {
    const { body } = this.baseCtx.request;
    console.log("rpc list", body);
    return this.ok(await this.rpc.call(this.serviceName, this.controllerName, 'list', body));
  }
  async update() {
    const { body } = this.baseCtx.request;
    console.log("rpc update", body);
    return this.ok(await this.rpc.call(this.serviceName, this.controllerName, 'update', body));
  }
  async delete() {
    const { ids } = this.baseCtx.request.body as { ids: string[] };
    console.log("rpc delete", ids);
    return this.ok(await this.rpc.call(this.serviceName, this.controllerName, 'delete', ids));
  }
}
