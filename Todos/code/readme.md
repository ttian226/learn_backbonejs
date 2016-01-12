### RESTful

**默认情况下,以下操作都是要触发服务器通信的,由于使用了本地存储,下面操作和localStorage直接交互**

#### model.save()

保存model(更新操作),更新localStorage中的model,触发model的change事件

#### collection.create()

在集合中创建一个新的model实例,在localStorage中加入了新的model,触发了collection的add事件

#### model.destroy()

model.destory()不会销毁model本身,model从包含它的collection中删除
如果model被保存到了localStorage中,那么也会在localStorage的collection中删除这个model,它触发了model的destory事件


#### collection.fetch()

获取localStorage中的数据到collection中


### 事件处理

#### TodoView中

this.listenTo(this.model, 'change', this.render);

监听model的change事件,通过model.save()触发:
1.点击单个todo上的checkbox,切换完成状态时(TodoView)
2.点击toggle-all的checkbox,改变所有todo的状态(AppView)
3.在编辑状态下输入回车保存title时(TodoView)
4.focus状态下的编辑框中,触发blur事件(TodoView)
触发后重新渲染todo节点


this.listenTo(this.model, 'destroy', this.remove);

监听model的destroy事件,通过model.destroy()触发
1.点击footer中的clear按钮,清除已完成的todo时(AppView)
2.点击单个todo上的删除按钮,删除单个todo(TodoView)
触发后删除todo对应的dom节点


#### AppView中

this.listenTo(app.Todos, 'add', this.addOne);

监听collection的add事件,通过collection.create()触发
1.在input输入框中输入完标题回车时触发(AppView)
2.app.Todos.fetch()获取本地存储的数据会触发add事件(AppView)
触发后在列表中插入一条渲染后的todo HTML

this.listenTo(app.Todos, 'change:completed', this.filterOne);

监听collection的'change:completed'事件,通过model.save()触发
1.当单个todo改变状态时触发
2.点切换全部可以触发所有的todo状态改变
触发后根据当前的过滤器决定是否隐藏这个model对应的<li>标签

this.listenTo(app.Todos, 'all', this.render);

监听collection的所有事件
1.app.Todos.fetch(),如果没有model,捕获sync事件
2.app.Todos.fetch(),有model,依次捕获add,sort,update,sync事件
3.点击单个todo改变状态时,依次捕获change:completed,change,sync事件
4.删除单个todo时,依次捕获sync,remove,update,destroy事件
触发后会渲染app

#### AppView首次渲染

AppView中的initialize(),app.Todos.fetch()触发sync事件.all监听回调,执行render()方法进行第一次渲染.




