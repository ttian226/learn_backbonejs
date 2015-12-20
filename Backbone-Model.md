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

#### Model.get()

`Model.get()`提供了一个简单的访问Model属性的方法。

```javascript
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

var todo1 = new Todo();
console.log(todo1.get('title'));    // 空字符串
console.log(todo1.get('completed'));// false

var todo2 = new Todo({
    title: "Retrieved with model's get() method.",
    completed: true
});

console.log(todo2.get('title'));    // Retrieved with model's get() method.
console.log(todo2.get('completed'));// true
```

如果你需要读取或克隆一个模型的所有属性，使用它的`toJSON()`方法。这个方法返回了一个对象(它不是一个JSON字符串)，这个对象包含了所有的属性。然而`JSON.stringify()`则是把toJSON()方法所生成的对象转换成相应的字符串形式。上面的例子正是利用了这个特性来使用`JSON.stringify()`方法打印Model实例。

```javascript
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

var todo1 = new Todo();
var todo1Attributes = todo1.toJSON();
// {title: "", completed: false}
console.log(todo1Attributes);

var todo2 = new Todo({
    title: "Try these examples and check results in console.",
    completed: true
});
// {title: "Try these examples and check results in console.", completed: true}
console.log(todo2.toJSON());
```
