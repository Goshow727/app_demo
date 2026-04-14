## AI视频生成生成管理系统；



## 运行环境依赖
  Node 22.x
  mysql 8.x
  redis 6.x
  nginx 1.25.x
  docker 24.x
  docker-compose 2.x


## 运行说明
下载server 项目到 apps/manage 目录下
下载micro 项目到 apps/micro 目录下
下载manageVue 项目到 apps/micro/manageVue 目录下

## 启动项目说明

  手动创建以下目录
  mysql
  redis
  nginx/logs
  nginx/html
  nginx/ssl
  系统环境配置文件：docker-compose.yml 正常不需要改动

  启动docker 容器 docker-compose up -d
  等待容器启动完成

  进入manageVue项目目录 启动前端管理页面 npm run dev
  访问项目 http://localhost:6688
