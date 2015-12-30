### Routers

在Backbone中，routers提供了一种方法，让你使用URLs（也可以是哈希片段）关联应用的某个部分。你应用的任何一个片段，如标签，分享，或者是回退按钮，都需要一个URL。

一些使用哈希值标记作为路由的例子如下：

```javascript
http://example.com/#about
http://example.com/#search/seasonal-horns/page2
```

一个应用通常至少有一个路由映射，映射了一个URL路由到一个函数，这个函数决定了用户访问了这个URL后将要发生什么事。这种关系像下面这样定义：

```javascript
'route' : 'mappedFunction'
```

通过扩展`Backbone.Router`来定义我们的第一个Router。出于向导的目的，我们继续假设创建了一个大型的todo应用，它需要一个复杂的TodoRouter。

```javascript
var TodoRouter = Backbone.Router.extend({
    /* 定义route和function的映射 */
    routes: {
        "about" : "showAbout",
        /* Sample usage: http://example.com/#about */

        "todo/:id" : "getTodo",
        /* 这是一个使用":param"变量的例子，它允许我们在两个斜线之间匹配任何一个值 */ 
        /* Sample usage: http://example.com/#todo/5 */

        "search/:query" : "searchTodos",
        /* 我们也可以定义多个路由去映射同一个函数，在这个例子中是searchTodos()，注意下面当page存在的时候
         我们是如何传递一个page值的 */ 
        /* Sample usage: http://example.com/#search/job */

        "search/:query/p:page" : "searchTodos",
        /* 正像我们看到的一样，如果有需要，URLs可以包含多个":param" */
        /* Sample usage: http://example.com/#search/job/p1 */

        "todos/:id/download/*documentPath" : "downloadDocument",
        /* 这是一个使用'*通配符'的例子，它能够匹配url多个部分，并且能够与":param"进行合并 */ 
        /* Sample usage: http://example.com/#todos/5/download/files/Meeting_schedule.doc */

        "*other"    : "defaultRoute",
        /* 这是一个同样使用'*通配符'默认的路由，它匹配的是之前没有匹配任何一个路由的url或者是用户手动输入了一个错误的url*/
        /* Sample usage: http://example.com/# <anything> */

        "optional(/:item)": "optionalItem",
        "named/optional/(y:z)": "namedOptionalItem"
        /* 路由URLs也支持通过圆括号来配置，而不需要使用正则表达式 */
    },

    showAbout: function(){
    },

    getTodo: function(id){
        // 匹配到上面路由的id将会被传入到这个函数中
        console.log("You are trying to reach todo " + id);
    },

    searchTodos: function(query, page){
        var page_number = page || 1;
        console.log("Page number: " + page_number + " of the results for todos containing the word: " + query);
    },

    downloadDocument: function(id, path){
    },

    defaultRoute: function(other){
        console.log('Invalid. You attempted to reach:' + other);
    }
});

/* 现在我们已经有一个路由的设置，我们需要实例化它 */
var myTodoRouter = new TodoRouter();
```

Backbone基于`window.history.pushState`提供了对HTML5 pushState的支持。这允许你像这个例子[http://backbonejs.org/just/an/example](http://backbonejs.org/just/an/example)一样去定义路由。当用户的浏览器不支持pushState时它会通过自动降级来支持。注意，如果你有能力在服务端也支持pushState的话那是最好的，尽管实现起来有点困难。


