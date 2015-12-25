### Underscore utility functions

Backbone利用Underscore来给Collection提供一些直接的实用方法。

#### forEach() 遍历集合

```javascript
var todos = new Backbone.Collection();

todos.add([
    { title: 'go to Belgium.', completed: false },
    { title: 'go to China.', completed: false },
    { title: 'go to Austria.', completed: true }
]);

todos.forEach(function (model) {
    console.log(model.get('title'));
});

// Above logs:
// go to Belgium.
// go to China.
// go to Austria.
```

#### sortBy() 根据指定的属性排序集合

```javascript
var todos = new Backbone.Collection();

todos.add([
    { title: 'go to Belgium.', completed: false },
    { title: 'go to China.', completed: false },
    { title: 'go to Austria.', completed: true }
]);

var sortedByAlphabet = todos.sortBy(function (todo) {
    return todo.get('title').toLowerCase();
});

sortedByAlphabet.forEach(function (model) {
    console.log(model.get('title'));
});

// Above logs:
// - Now sorted:
// go to Austria.
// go to Belgium.
// go to China.
```

#### map() 遍历集合，通过转换函数映射每一个值。

```javascript
var todos = new Backbone.Collection();

todos.add([
    { title: 'go to Belgium.', completed: false },
    { title: 'go to China.', completed: false },
    { title: 'go to Austria.', completed: true }
]);

var count = 1;

var list = todos.map(function (model) {
    return count++ + '. ' + model.get('title');
});

_.each(list, function (value) {
    console.log(value);
});

// Above logs:
//1. go to Belgium.
//2. go to China.
//3. go to Austria.
```

#### max()/min() 检索指定属性的最大或最小值

```javascript
var todos = new Backbone.Collection();

todos.add([
    { id: 1, title: 'go to Belgium.', completed: false },
    { id: 2, title: 'go to China.', completed: false },
    { id: 3, title: 'go to Austria.', completed: true }
]);

var maxModel = todos.max(function (model) {
    return model.id;
});

console.log(maxModel.id);   // 3

var minModel = todos.min(function (model) {
    return model.id;
});

console.log(minModel.id);   // 1
```

#### pluck() 提取指定的属性

```javascript
var todos = new Backbone.Collection();

todos.add([
    { title: 'go to Belgium.', completed: false },
    { title: 'go to China.', completed: false },
    { title: 'go to Austria.', completed: true }
]);

var titles = todos.pluck('title');
console.log(titles);

// ["go to Belgium.", "go to China.", "go to Austria."]
```

#### filter() 过滤集合

```javascript
var todos = new Backbone.Collection();

todos.add([
    { title: 'go to Belgium.', completed: false },
    { title: 'go to China.', completed: false },
    { title: 'go to Austria.', completed: true }
]);

var list = todos.filter(function (model) {
    return model.get('completed') === false;
});

list.forEach(function (model) {
   console.log(model.toJSON());
});

// Object {title: "go to Belgium.", completed: false}
// Object {title: "go to China.", completed: false}
```

#### indexOf() 返回指定项在在集合中的索引

```javascript
var people = new Backbone.Collection();

var tom = new Backbone.Model({name: 'Tom'});
var rob = new Backbone.Model({name: 'Rob'});
var tim = new Backbone.Model({name: 'Tim'});

people.add([tom, rob, tim]);

console.log(people.indexOf(tom));   // 0
console.log(people.indexOf(rob));   // 1
console.log(people.indexOf(tim));   // 2
```

#### some()/any() 检查集合中是否有一个值通过为真的检测

```javascript
var people = new Backbone.Collection();

var tom = new Backbone.Model({name: 'Tom'});
var rob = new Backbone.Model({name: 'Rob'});
var tim = new Backbone.Model({name: 'Tim'});

people.add([tom, rob, tim]);

var r = people.some(function (model) {
   return model.get('name') === 'Tom';
});
console.log(r); // true
```
