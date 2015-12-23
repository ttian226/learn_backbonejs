### Collection

Collections是Model的集合，通过扩展`Backbone.Collection`来创建。

通常，当创建一个集合的时候，你需要定义一个属性来指定在你集合中的Model的类型，与此同时还要包含实例属性。

在下面的例子中，我们创建了一个TodoCollection用来包含我们的Todo Model

```javascript
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

var TodosCollection = Backbone.Collection.extend({
    model: Todo
});

var myTodo = new Todo({title:'Read the whole book', id: 2});

// 通过传Model实例的数组来创建Collection的实例
var todos = new TodosCollection([myTodo]);
console.log("Collection size: " + todos.length);    // Collection size: 1
```

#### 添加或删除Models

前面的例子通过Model的数组来创建Collection的实例。集合被创建后，models可以通过`add()`和`remove()`方法来添加或删除。

```javascript
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

var TodosCollection = Backbone.Collection.extend({
    model: Todo
});

var a = new Todo({ title: 'Go to Jamaica.'}),
    b = new Todo({ title: 'Go to China.'}),
    c = new Todo({ title: 'Go to Disneyland.'});

var todos = new TodosCollection([a, b]);
console.log("Collection size: " + todos.length);    // Collection size: 2

todos.add(c);
console.log("Collection size: " + todos.length);    // Collection size: 3

todos.remove([a, b]);
console.log("Collection size: " + todos.length);    // Collection size: 1

todos.remove(c);
console.log("Collection size: " + todos.length);    // Collection size: 0
```

注意`add()`和`remove()`既支持独立的model也支持model数组。

同时注意当使用`add()`时，如果传参数`{merge: true}`,会把model合并到集合中已经存在的model上去（前提是具有相同id），否则会被忽视。

```javascript
var items = new Backbone.Collection;
items.add([{ id : 1, name: "Dog" , age: 3}, { id : 2, name: "cat" , age: 2}]);
items.add([{ id : 1, name: "Bear" }], {merge: true });
items.add([{ id : 2, name: "lion" }]); // merge: false

console.log(JSON.stringify(items.toJSON()));
// [{"id":1,"name":"Bear","age":3},{"id":2,"name":"cat","age":2}]
```

#### 检索Models

有一些方法来检索集合中的model，最直接的方法就是使用`Collection.get()`它接收id作为参数，如下：

```javascript
var myTodo = new Todo({title:'Read the whole book', id: 2});

// 传一个model数组来实例化集合
var todos = new TodosCollection([myTodo]);

// 获取id=2的model
var todo2 = todos.get(2);

console.log(todo2 === myTodo); // true
```

在客户端-服务器的应用中，collection中的model通常由服务器获取。在任何时候你在客户端和服务器之间交互数据时，你需要一个方法来唯一标识model。在Backbone中通常使用`id`,`cid`,`idAttribute`属性。

每个在Backbone中的model都有一个id，它是一个唯一标识符，既可以是整型又可以是字符串（例如UUID）。model也会拥有一个cid属性，这是在model创建的时候Backbone会自动生成一个cid（客户端id）。任何唯一标识都可以在collection中检索model。

它们主要的不同就是cid是由Backbone生成的，如果你还没有设置id属性这是非常有帮助的，例如你的model已经被存储到服务端或者还没有保存到数据库。

`idAttribute`标识的是从服务端返回的model属性名（例如数据库的id），这回告诉Backbone从服务器返回的那个字段名应该作为model的id属性。默认情况下是作为id属性，但也可以自定义。例如，服务器给给model设置了唯一的属性叫`userid`，那么你可以把`idAttribute`设置为`userid`来作为你model的id属性。

在内部，`Backbone.Collection`包含了通过id属性来枚举的model的数组。当`collection.get(id)`被调用时，会通过关联的id去查找model的实例。

```javascript
// extends the previous example

var todoCid = todos.get(todo2.cid);

// As mentioned in previous example, 
// models are passed by reference
console.log(todoCid === myTodo); // true
```

