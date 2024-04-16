# <center> Shell + Git实现自动化构建 </center>
## 前提要求
 - 本篇文章以当前文档项目为例，所需软件可根据需要修改
 - 假设你对以下技术有一定的了解,这里就不做入门安装介绍
 - Git v2.30.2
 - GitHub or Gitee
    - 需要生成密钥,添加到本地,再将公钥上传gitee/github
 - Nginx v1.18.0
 - Node v12.22.12
 - npm v7.5.2
## 开始
 - 创建资源
    - node项目创建
    - github远程仓库创建
 - ngix配置读取node打包的dist文件夹
 - 编写自动化脚本
 ```shell
      #!/bin/bash

      # 初始化才配置仓库地址和克隆仓库
      # 配置仓库地址
      REPO_URL="git@github.com:xxxx/xxxx.git"
      # 初始化拉取时被更改而不合并
      #git config pull.rebase true
      # 克隆仓库
      #git clone $REPO_URL

      # 进入仓库目录
      cd /xxx/xx/xxx

      # 初始化变量，用于记录上次提交的哈希值
      LAST_COMMIT=""

      # 无限循环，检测仓库变化
      while true; do
      # 获取当前最新提交的哈希值
      CURRENT_COMMIT=$(git ls-remote $REPO_URL HEAD)

      # 如果当前提交的哈希值与上次提交的哈希值不同，则执行以下操作
      if [ "$CURRENT_COMMIT" != "$LAST_COMMIT" ]; then
         # 更新本地仓库
         git pull origin master

         # 安装依赖
         npm install

         # 构建项目
         npm run docs:build

         # 更新上次提交的哈希值
         LAST_COMMIT=$CURRENT_COMMIT
      fi

      # 等待一段时间后再次检测
      sleep 60
      done
 ```
  - 提交
   - 其他端pull项目并提交更新后，改项目同步拉取编译，提交