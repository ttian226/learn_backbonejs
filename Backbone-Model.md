### Models

Backbone models包含应用的数据和围绕着这些数据的逻辑。例如，我们可以用模型来描述一个todo items。在这个模型中包含了它的一些属性像是`title`(todo的内容),`completed`(当前状态)

通过继承`Backbone.Model`可以创建Model

```javascript
var Todo = Backbone.Model.extend({});

// 创建一个Todo model的实例
// 这个model没有任何的值
var todo1 = new Todo();
// {}
console.log(JSON.stringify(todo1));

// 附加一些数据
var todo2 = new Todo({
    title: 'Check the attributes of both model instances in the console.',
    completed: true
});
// {"title":"Check the attributes of both model instances in the console.","completed":true}
console.log(JSON.stringify(todo2));
```

#### Initialization

当一个新的Model实例被创建时`initialize()`方法会被调用。

```javascript
var Todo = Backbone.Model.extend({
    initialize: function () {
        console.log('This model has been initialized.');
    }
});

var myTodo = new Todo();
// Logs: This model has been initialized.
```

#### Default values

如果你想让你的Model有一组默认值，使用`defaults`属性来设置。

```javascript
var Todo = Backbone.Model.extend({
    // 默认的属性值
    defaults: {
        title: '',
        completed: false
    }
});

// 现在我们创建一个带有默认值的Model的实例
var todo1 = new Todo();

// {"title":"","completed":false}
console.log(JSON.stringify(todo1));

// 我们可以创建一个带有自己属性值的实例
var todo2 = new Todo({
    title: 'Check attributes of the logged models in the console.'
});

// {"title":"Check attributes of the logged models in the console.","completed":false}
console.log(JSON.stringify(todo2));

// 覆盖所有的默认属性
var todo3 = new Todo({
    title: 'This todo is done, so take no action on this one.',
    completed: true
});

// {"title":"This todo is done, so take no action on this one.","completed":true}
console.log(JSON.stringify(todo3));
```
