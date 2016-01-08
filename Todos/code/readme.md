**默认情况下,以下操作都是要触发服务器通信的,由于使用了本地存储,下面操作和localStorage直接交互**

#### model.save()

保存model(更新操作),更新localStorage中的model,触发model的change事件

#### collection.create()

在集合中创建一个新的model实例,在localStorage中加入了新的model,触发了collection的add事件

#### model.destory()

model.destory()不会销毁model本身,model从包含它的collection中删除
如果model被保存到了localStorage中,那么也会在localStorage的collection中删除这个model,它触发了model的destory事件





