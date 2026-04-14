# 使用官方 Node.js 镜像
FROM node:22.17.1

# 设置容器内的工作目录
WORKDIR /app/manage

# 复制 package.json 和 package-lock.json（利用 Docker 缓存）

COPY package*.json ./
# 设置时区为中国东八区，这里的配置可以被docker-compose.yml或docker run时指定的时区覆盖
ENV TZ="Asia/Shanghai"

# 如果各公司有自己的私有源，可以替换registry地址,如使用官方源注释下一行
RUN npm config set registry https://registry.npmmirror.com

# 安装依赖
RUN npm install

# 复制应用代码
COPY . .

RUN npm run build
# # 删除开发期依赖
# RUN rm -rf node_modules && rm package-lock.json    
# # 安装生产环境依赖   
# RUN npm install                        

# 如果端口更换，这边可以更新一下
# EXPOSE 8088

CMD ["npm", "run", "dev"]

#CMD ["npm", "start"]