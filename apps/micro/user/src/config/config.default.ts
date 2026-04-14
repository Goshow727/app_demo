import { MidwayConfig } from '@midwayjs/core';

const { PORT = 8002 } = process.env as any

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: 'cool-admin for node rpc',
  koa: {
    port: PORT,
  },
} as MidwayConfig;
