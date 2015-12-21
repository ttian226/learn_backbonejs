### Views

View在Backbone中是不包含任何Html标记的。它包含数据模型表现层的用户业务逻辑。这里通常使用的是javascript模板（例如underscore迷你模板，Mustache，jQuery-tmpl等）。View的`render()`方法可以绑定到Model的`change()`事件上，使View立刻响应模型的变化而不需要整个页面进行刷新。

#### 创建新的视图

和创建Model比，创建一个View更直接简单。创建一个View只是简单的继承`Backbone.View`。我们在之前的章节中介绍过TodoView的例子，下面我们近距离观看下它是如何工作的。

```javascript
var TodoView = Backbone.View.extend({
    tagName: 'li',

    // Cache the template function for a single item.
    todoTpl: _.template('An example template'),

    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit':   'close'
    },

    initialize: function (options) {
        this.options = options || {};
    },

    // Re-render the title of the todo item.
    render: function () {
        this.$el.html(this.todoTpl(this.model.attributes));
        this.input = this.$('.edit');
        return this;
    },

    edit: function () {
        // executed when todo label is double clicked
    },

    close: function () {
        // executed when todo loses focus
    },

    updateOnEnter: function () {
        // executed on each keypress when in todo edit mode,
        // but we'll wait for enter to get in action
    }
});

var todoView = new TodoView();
console.log(todoView.el);   // <li></li>
```

#### el是什么

视图核心的属性是`el`。什么是`el`，它是如何定义的？

从根本上说`el`是DOM元素的引用，所有的视图都必须拥有一个`el`属性。视图可以使用`el`来组成它们元素的内容，然后立即插入到DOM中去。这样可以使页面进行更快的渲染，因为浏览器执行了最少的重绘。

有两种方法可以使视图与DOM元素关联起来：通过视图创建了一个新的元素随后把这个元素加入到DOM中；使用视图关联一个已经在页面上存在的元素。

如果你想通过视图创建一个新的元素，在视图上设置以下属性的任意组合：`tagName`,`id`,`className`。一个新的元素将被创建。你可以通过`el`属性来引用这个元素。如果未指定`tagName`则默认创建`div`元素。

在上面的例子，`tagName`被设置了`li`，创建一个li元素。下面的例子创建了一个ul元素并带有id和class属性：

```javascript
var TodoView = Backbone.View.extend({
    tagName: 'ul',  // 必须，如果不设置默认div
    className: 'container', // 可选，也可以设置多个class比如'container homepage''
    id: 'todos' // 可选
});

var todosView = new TodoView();
console.log(todosView.el);  // <ul id="todos" class="container"></ul>
```



