import { CoolConfig } from '@cool-midway/core';
import { MidwayConfig } from '@midwayjs/core';
const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, REDIS_HOST, REDIS_PASSWORD } = process.env as any
/**
 * 本地开发 npm run dev 读取的配置文件
 */
export default {
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: DB_HOST,
        port: 3306,
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
        synchronize: false,
        // 打印日志
        logging: true,
        // 字符集
        charset: 'utf8mb4',
        // 是否开启缓存
        cache: true,
        // 实体路径
        entities: ['*/entity'],
      },
    },
  },
  cool: {
    rpc: {
      // 服务名称 整个集群保证唯一
      name: 'micro-user',
      // 集群是以redis为注册中心，协调集群之间的工作
      redis: {
        host: REDIS_HOST,
        password: REDIS_PASSWORD,
        port: 6379,
        db: 8,
      },
    },
    // 是否自动导入数据库
    initDB: false,
  } as CoolConfig,
} as MidwayConfig;
