### Backbone’s Sync API

我们之前讨论过Backbone通过Collections的`fetch()`和`create()`方法；Models的`save()`和`destroy()`方法来支持RESTful的。现在让我们仔细看下Backbone的sync方法。

Backbone.sync方法是构成Backbone.js一个必要的部分。假设它是一个类似jQuery的`$.ajax()`方法，所以HTTP参数是基于jQuery API被组织到一起的。由于一些传统的服务器是不支持JSON格式的请求，也不支持HTTP PUT和DELETE操作，Backbone可以通过配置来模拟这个能力，下面是它带有默认值的两个配置变量：

```javascript
Backbone.emulateHTTP = false; // 如果服务端不支持处理HTTP PUT或HTTP DELETE请求，设置为true
Backbone.emulateJSON = false; // 如果服务端不支持application/json请求，设置为true
```

如果扩展的HTTP方法不被服务端，可以设置Backbone.emulateHTTP为true。如果服务端不支持JSON请求，设置Backbone.emulateJSON为true。

```javascript
// 创建一个library集合
var Library = Backbone.Collection.extend({
    url : function() { return '/library'; }
});

// 给模块定义属性
var attrs = {
    title  : "The Tempest",
    author : "Bill Shakespeare",
    length : 123
};

// 创建一个Library实例
var library = new Library;

// 在我们的集合中创建一个新的model实例
library.create(attrs, {wait: false});

// 使用HTTP POST请求更新model。如果不设置emulateHTTP，则使用HTTP PUT请求
library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'}, {
  emulateHTTP: true
});

// Check the ajaxSettings being used for our request
console.log(this.ajaxSettings.url === '/library/2-the-tempest'); // true
console.log(this.ajaxSettings.type === 'POST'); // true
console.log(this.ajaxSettings.contentType === 'application/json'); // true

// Parse the data for the request to confirm it is as expected
var data = JSON.parse(this.ajaxSettings.data);
console.log(data.id === '2-the-tempest');  // true
console.log(data.author === 'Tim Shakespeare'); // true
console.log(data.length === 123); // true
```

类似的，我们可以通过设置emulateJSON来更新model

```javascript
// 如果不设置emulateJSON，默认使用JSON格式传输，设置了emulateJSON则使用x-www-form-urlencoded格式
library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'}, {
  emulateJSON: true
});

console.log(this.ajaxSettings.url === '/library/2-the-tempest'); // true
console.log(this.ajaxSettings.type === 'PUT'); // true
console.log(this.ajaxSettings.contentType ==='application/x-www-form-urlencoded'); // true

var data = JSON.parse(this.ajaxSettings.data.model);
console.log(data.id === '2-the-tempest');
console.log(data.author ==='Tim Shakespeare');
console.log(data.length === 123);
```

每当Backbone试图读取，保存，删除models时`Backbone.sync`都会被调用。它使用jQuery或Zepto的`$.ajax()`方法去处理这些RESTful请求。然而它也可以根据你的需要被重写。

#### Overriding Backbone.sync

`sync`方法作为`Backbone.sync`可以被全局重写，或者以更细粒度的方式，通过给Backbone的集合或单独的model添加sync方法。

由于所有的会话都是通过Backbone.sync处理的。也可以通过简单的覆盖Backbone.sync方法，并带有相同的签名，来创建一个自己的会话层。

```javascript
Backbone.sync = function(method, model, options) {
};
```

下面的methodMap通过标准的sync行为来映射一个方法参数到一个HTTP操作，并说明了每个方法所需要执行的动作类型。

```javascript
var methodMap = {
  'create': 'POST',
  'update': 'PUT',
  'patch':  'PATCH',
  'delete': 'DELETE',
  'read':   'GET'
};
```

如果我们想用添加了日志的sync方法来替代标准的`sync`行为，我们可以这么做：

```javascript
var id_counter = 1;
Backbone.sync = function(method, model) {
  console.log("I've been passed " + method + " with " + JSON.stringify(model));
  if(method === 'create'){ model.set('id', id_counter++); }
};
```

注意我们为每一个创建的models添加了唯一的id

通过覆盖Backbone.sync方法也可以支持其它的后端会话。内置的方法是为RESTful JSON APIs量身定制的，是因为Backbone最初来至于Ruby on Rails的应用。以相同的方式使用HTTP方法（例如PUT）
