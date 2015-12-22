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
