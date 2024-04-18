# <center> 房间业务业务 </center>
## 查看房间列表
 - login.gd ``` RoomHandler.is_playing() ```

## 加入房间
```gdscript
# 请求加入房间 login.gd
RoomHandler.is_accept_join(current_room.id);
# 响应房主是否同意加入房间 ui.gd
user_join_accept(data:String)
# 同意加入就创建房间 ui.gd
RoomHandler.create_room(data);
# 创建完成后同意用户加入 ui.gd
RoomHandler.join_room_result(join_id,NetWorkConstant.OK);
# 不同意拒绝用户加入 ui.gd
RoomHandler.join_room_result(join_id,NetWorkConstant.NOT_OK);
# 用户下载地图进行同步 ui.gd
join_room(data:PackedByteArray);
```