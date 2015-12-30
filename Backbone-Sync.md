### Backbone’s Sync API

我们之前讨论过Backbone通过Collections的`fetch()`和`create()`方法；Models的`save()`和`destroy()`方法来支持RESTful的。现在让我们仔细看下Backbone的sync方法。

Backbone.sync方法是构成Backbone.js一个必要的部分。假设它是一个类似jQuery的`$.ajax()`方法，所以HTTP参数是基于jQuery API被组织到一起的。由于一些传统的服务器是不支持JSON格式的请求，也不支持HTTP PUT和DELETE操作，Backbone可以通过配置来模拟这个能力，下面是它带有默认值的两个配置变量：

```javascript
Backbone.emulateHTTP = false; // 如果服务端不支持处理HTTP PUT或HTTP DELETE请求，设置为true
Backbone.emulateJSON = false; // 如果服务端不支持application/json请求，设置为true
```

如果扩展的HTTP方法不被服务端，可以设置Backbone.emulateHTTP为true。如果服务端不支持JSON请求，设置Backbone.emulateJSON为true。

