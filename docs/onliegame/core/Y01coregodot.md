# <center>Godot核心类</center>
## NetWork
所有的网络请求最终都要从这里被发送，接收

封装了最基本的网络功能
```gdscript
    ####################################
    # 网络管理脚本
    # 维护网络连接，并与网络进行交互
    # Login场景的login脚本开始启动
    # version 1.0
    # by XiangT
    ####################################
    extends Node

    # 客户端
    var channel:StreamPeerTCP = StreamPeerTCP.new();
    # 数据包对象
    const  LoginProto = preload("res://protobuf/Entity.gd");
    # 配置参数
    const YunConfig = preload("res://config/YunConfig.gd");
    # 响应数据
    var res:PackedByteArray = PackedByteArray();
    # 启动连接
    func run():
        # 连接服务器
        
        connection(YunConfig.IP_ADDRESS,YunConfig.IP_PORT);
        # 开始运行
        set_process(true);

    # 处理响应	
    func _process(_delta):
        # 检查连接状态
        is_connection();
        # 读取数据
        handler();

    # 初始化连接
    func connection(ip:String,port:int):
        channel.connect_to_host(ip,port);
        channel.poll();
        var state = channel.get_status();
        while !(state > 0 && state < 3):
            channel.poll();
            state = channel.get_status();
            print("连接中...");
            
    # 发送消息
    # 并在末尾添加 \n 帮助服务器拆包
    func sendMessage(data:LoginProto.Entity):
        var pack = data.to_bytes();
        pack.push_back(10);
        channel.put_data(pack);

    # 读取消息
    # 拆包
    func handler():
        # 读取可用字节个数
        var num:int = channel.get_available_bytes();
        # 存在可读字节数,解析
        if num > 0 :
            decodeMsg(num);

    # 解析消息
    func decodeMsg(num) :
        print(num);
        # 读取所有数据并添加
        while num > 0 :
            res.append(channel.get_u8());
            num-=1;
        if res[res.size()-1] != 10 :
            return;
        # 构建消息
        var msg = LoginProto.Entity.new();
        # 根据字节数组为消息赋值
        msg.from_bytes(res.slice(0,res.size()-1));
        # 选择处理器
        var operation = msg.get_operation();
        if NetWorkConstant.LOGIN == operation:
            NetWorkHandler.descMessage(msg);
        if NetWorkRoomConstant.ROOM == operation:
            RoomHandler.descMessage(msg);
        if NetWorkConstant.NET_WORK == operation:
            print(msg.get_msg().get_context());
            # 发生错误断开连接
            if !msg.get_msg().get_status():
                channel.disconnect_from_host();
        res.clear();

    # 构建user参数
    func set_user(account:String,password:String) -> LoginProto.User:
        var user = LoginProto.User.new();
        user.set_name(account);
        user.set_password(password);
        return user;
        
    # 构建Message参数
    func set_msg(msg:String) -> LoginProto.Message:
        var message = LoginProto.Message.new();
        message.set_status(true);
        message.set_context(msg);
        return message;
        
    # 构建Message参数
    func set_msg_data(msg:String,data:PackedByteArray) -> LoginProto.Message:
        var message = set_msg(msg);
        message.set_data(data);	
        return message;
        
    # 构建Message参数
    func set_msg_data_status(msg:String,data:PackedByteArray,status:bool) -> LoginProto.Message:
        var message = set_msg(msg);
        message.set_data(data);
        message.set_status(status);	
        return message;


    # 构建数据包 
    # 	header: 业务模块名
    # 	typeData: 发送的消息
    func build_user_data(typeData) -> LoginProto.Entity:
        # 初始化消息
        var user = LoginProto.Entity.new();
        user.set_operation(NetWorkConstant.LOGIN);
        # 设置消息类型
        user.set_data_type(LoginProto.Entity.EntityType.UserType);
        user.set_user(typeData);
        return user;
        
    # 构建数据包
    func build_message_data(header:String,typeData):
        var message = LoginProto.Entity.new();
        message.set_operation(header);
        message.set_data_type(LoginProto.Entity.EntityType.MessageType);
        message.set_msg(typeData)
        return message;

    # 检查连接
    func is_connection():
        channel.poll();
        var state = channel.get_status();
        if !(state > 0 && state < 3) :
            set_process(false);
            print("网络错误，重连");
            re_connection();

    # 网络断开重连
    func re_connection():
        await get_tree().create_timer(YunConfig.RE_CONNECTION_TIME).timeout;
        run();
        print("重连成功")
```
## Work
发送数据包

解析网络数据包

发射信号来改变场景

登录Work示例：
```gdscript
    ##################
    # 网络-基础功能交互工具类
    # 对NetWork进行封装，添加网络信息处理
    # version 1.0
    # by XiangT
    ##################

    extends Node

    # 数据包
    const EntityInfo = preload("res://protobuf/Entity.gd");

    # 登录信息
    func login(account:String,password:String):
        var user:EntityInfo.User = NetWork.set_user(account,password);
        var data:EntityInfo.Entity = NetWork.build_user_data(user);
        NetWork.sendMessage(data);

    # 登录成功信号
    signal loginOK();
    func login_res(data:EntityInfo.Entity):
        if data.get_msg().get_context() == NetWorkConstant.LOGIN_OK:
            # 登录成功，发送信号
            loginOK.emit();
                
    # 处理响应消息	
    func descMessage(msg:EntityInfo.Entity):
        var context = msg.get_msg().get_context();
        # 判断消息类型
        if context == NetWorkConstant.LOGIN_OK:
            login_res(msg);

```