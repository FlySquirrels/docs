# <center>Java核心类</center>
## WorldServerHandler
管理连接

将加入的连接添加到clients中进行管理

并使用工厂解析数据包分配Worker

```java
/**
 * 所有请求的接收类
 */
@Slf4j
public class WorldServerHandler extends SimpleChannelInboundHandler<EntityInfo.Entity> {

    // 首次连接
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        ClientUtils.put(ctx.channel(),"临时"+ctx.channel().id().toString());
        log.info("客户端 "+ ctx.channel().id() + " 连接成功");
    }

    //  分配worker
    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, EntityInfo.Entity entityInfo) throws Exception {
        ChannelWorker channelWorker = WorldFactory.createChannelWorker(channelHandlerContext, entityInfo);
        channelWorker.execute();
    }


    // 异常处理
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        log.error(cause.getMessage());
        ClientUtils.removeChannel(ctx.channel());
    }
}

```
## Worker
处理连接
```java
/**
 * 处理登录数据
 */
@Slf4j
public class LoginWorker extends ChannelWorker {
    @Override
    public void execute() {
        String id = ClientUtils.get(getCtx().channel());
        EntityInfo.User user = getMsg().getUser();
        if ( null != user) {
            log.info("客户端{} 上线用户 {}",id,user.getName());
            ClientUtils.put(getCtx().channel(),user.getName());
        }
        getCtx().writeAndFlush(buildMessage(NetWorkConstant.LOGIN_OK,NetWorkConstant.OK));
    }

    public EntityInfo.Entity buildMessage(String context,boolean status){
        return EntityBuild.buildMessage(NetWorkConstant.LOGIN,context,status);
    }

    public EntityInfo.Entity buildMessage(String context,boolean status,byte[] bytes){
        return EntityBuild.buildMessage(NetWorkConstant.LOGIN,context,status,bytes);
    }
}
```