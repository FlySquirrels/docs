# <center> 登录业务 </center>
## Godot 发起登录请求
 - godto的login.gd脚本初始化后NetWork.run();

## Java 处理信息
 - 网络连接成功后，调用NetWorkHandler.gd的login方法发送数据
 - Java端com.yunduo.world.handler.WorldServerHandler接收后，分配LoginWorker处理请求
 - 登陆后响应信息，登陆成功

## Godot 处理数据包
 - Godot端NetWork接收信息
 - 解析分配Work处理器
 - 发射信号处理游戏对象