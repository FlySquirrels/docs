# <center> 服务器监控流量自动关闭服务 </center>

## 安装vanst
这里是debin系统的安装方法。
```
   apt-get install vnstat
```
## 编写自动化脚本
::: warning
执行脚本需要root权限，确保已获取。
debin下输入``` su ```，输入密码即可
:::
```shell
#!/bin/bash

# 设置流量阈值（单位：KB/s）
threshold=512000

# 设置检查流量的时间间隔（单位：秒）
interval=60

while true; do
    # 使用 vnstat 获取总出网流量
    total_outbound=$(sudo vnstat -i eth0 --json | jq '.interfaces[0].traffic.total.tx')
    
    # 将流量转换为 KB/s
    total_outbound_kb=$((total_outbound / 8 / 1024))

    # 判断流量是否超过阈值
    if [ $total_outbound_kb -gt $threshold ]; then
          echo "流量上限"
         
          # 发送关闭服务的命令（请根据实际情况修改）
          sudo nginx -s stop
         
          break
    else
      echo "当前出网: $total_outbound_kb KB/s"
    fi
    	# 等待指定的时间间隔
    	sleep $interval
done
```
## 使用方法
``` sudo ./xxx.sh ```可直接运行

可以采用多窗口来管理，因为这个脚本会在控制台输出数据
 - 安装screen
```
apt-get install screen
```
 - 使用screen
```shell 
   # 创建窗口后会自动进入
   screen -S net
   # 执行脚本
   sudo ./xxx.sh 
   # 按住即可暂时退出当前窗口
   ctrl + a + d
   # 当前脚本查看窗口列表
   screen -ls
   # 返回net窗口
   screen -r net
   # 关闭窗口，需要先进入窗口
   eixt
```
