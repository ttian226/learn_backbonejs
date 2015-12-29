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

#### on(),off(),trigger()

`Backbone.Events`能够给与任何对象绑定事件和触发自定义事件的能力。我们可以很容易的把这个模块混入到任何一个对象中，对于事件来说也并没有需求一定要在注册回调之前声明。

```javascript
var ourObject = {};

// 混入
_.extend(ourObject, Backbone.Events);

// 添加自定义事件
ourObject.on('dance', function(msg){
  console.log('We triggered ' + msg);
});

// 触发自定义事件
ourObject.trigger('dance', 'our event');
```

如果你熟悉jQuery自定义事件或者发布/订阅模式的概念，`Backbone.Events`提供了这样一种事件系统：`on`类似于订阅，`trigger`类似于发布。

`on`给一个对象绑定了一个回调函数，像上面的例子我们使用的`dance`。当任何时候`dance`事件被触发时回调函数会被调用。

官方的Backbone.js文档推荐使用冒号作为事件命名空间的分隔符，例如：

```javascript
var ourObject = {};

// 混入
_.extend(ourObject, Backbone.Events);

function dancing (msg) { console.log("We started " + msg); }

// 添加带命名空间的自定义事件
ourObject.on("dance:tap", dancing);
ourObject.on("dance:break", dancing);

// 触发自定义事件
ourObject.trigger("dance:tap", "tap dancing. Yeah!");
ourObject.trigger("dance:break", "break dancing. Yeah!");

// 由于没有对应事件的监听，所以不会触发任何事件
ourObject.trigger("dance", "break dancing. Yeah!");
```

`all`是一个特殊的事件，你可以用它来监听发生在一个对象上的每一个事件。`all`可以像下面这样使用：

```javascript
var ourObject = {};

// Mixin
_.extend(ourObject, Backbone.Events);

ourObject.on("all", function(eventName){
  console.log("The name of the event passed was " + eventName);
});

// This time each event will be caught with a catch 'all' event listener
ourObject.trigger("dance:tap", "tap dancing. Yeah!");
ourObject.trigger("dance:break", "break dancing. Yeah!");
ourObject.trigger("dance", "break dancing. Yeah!");
```

`off`可以移除之前绑定到一个对象上的回调函数。比较一下之前的发布/订阅模式，可以把它看做取消订阅自定义事件。

移除我们之前绑定在`ourObject`对象上的`dance`事件，我们可以这样做：

```javascript
var ourObject = {};

// Mixin
_.extend(ourObject, Backbone.Events);

function dancing (msg) { console.log("We " + msg); }

// Add namespaced custom events
ourObject.on("dance:tap", dancing);
ourObject.on("dance:break", dancing);

// Trigger the custom events. Each will be caught and acted upon.
ourObject.trigger("dance:tap", "started tap dancing. Yeah!");
ourObject.trigger("dance:break", "started break dancing. Yeah!");

// Removes event bound to the object
ourObject.off("dance:tap");

// Trigger the custom events again, but one is logged.
ourObject.trigger("dance:tap", "stopped tap dancing."); // won't be logged as it's not listened for
ourObject.trigger("dance:break", "break dancing. Yeah!");
```

移除指定事件的所有回调函数时，我们可以通过传递了一个事件名（如'move'）给`off()`方法，在已经绑定了这个事件的对象上。如果我们想删除一个指定的回调函数时，我们可以传递callback作为第二个参数。

```javascript
var ourObject = {};

// Mixin
_.extend(ourObject, Backbone.Events);

function dancing (msg) { console.log("We are dancing. " + msg); }
function jumping (msg) { console.log("We are jumping. " + msg); }

// Add two listeners to the same event
ourObject.on("move", dancing);
ourObject.on("move", jumping);

// Trigger the events. Both listeners are called.
ourObject.trigger("move", "Yeah!");

// Removes specified listener
ourObject.off("move", dancing);

// Trigger the events again. One listener left.
ourObject.trigger("move", "Yeah, jump, jump!");
```

最后，正如我们在之前的例子中看到的，`trigger`为指定的事件触发一个回调（也可以是用空格分隔的事件的列表），例如：

```javascript
var ourObject = {};

// Mixin
_.extend(ourObject, Backbone.Events);

function doAction (msg) { console.log("We are " + msg); }

// Add event listeners
ourObject.on("dance", doAction);
ourObject.on("jump", doAction);
ourObject.on("skip", doAction);

// Single event
ourObject.trigger("dance", 'just dancing.');

// Multiple events
ourObject.trigger("dance jump skip", 'very tired from so much action.');
```

`trigger`可以传递多个参数给回调函数

```javascript
var ourObject = {};

// Mixin
_.extend(ourObject, Backbone.Events);

function doAction (action, duration) {
  console.log("We are " + action + ' for ' + duration ); 
}

// Add event listeners
ourObject.on("dance", doAction);
ourObject.on("jump", doAction);
ourObject.on("skip", doAction);

// Passing multiple arguments to single event
ourObject.trigger("dance", 'dancing', "5 minutes");

// Passing multiple arguments to multiple events
ourObject.trigger("dance jump skip", 'on fire', "15 minutes");
```

