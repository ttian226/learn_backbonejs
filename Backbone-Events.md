### Events

事件本质上是控制的倒置。它不是一个函数通过名字直接调用另一个函数，而是第二个函数被注册为一个句柄当特定的事件发生时被调用。

你的部分应用应该知道如何去调用另一部分被倒置的应用。这是一个核心的事情，它使你的业务逻辑没有必要知道用户界面如何工作的，它是Backbone Events系统最强大的功能。

操作事件是Backbone提高生产效率最快速的方法之一。让我们仔细看下Backbone的事件系统。

`Backbone.Events`被混入了Backbone中其它的类，包括：

* Backbone
* Backbone.Model
* Backbone.Collection
* Backbone.Router
* Backbone.History
* Backbone.View

注意到`Backbone.Events`被混入到了`Backbone`对象中。因为`Backbone`是全局可见的，它能够被用来处理简单的事件

```javascript
Backbone.on('event', function () {
    console.log('Handled Backbone event');
});

Backbone.trigger('event');
```



