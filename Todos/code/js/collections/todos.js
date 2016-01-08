/**
 * Created by wangxu on 1/5/16.
 */

var app = app || {};

var TodoList = Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // 返回已完成的todo组成的数组
    completed: function () {

        // 使用filter方法进行过滤
        return this.filter(function (todo) {
            return todo.get('completed');
        });
    },

    // 返回正在进行中的todo组成的数组
    remaining: function () {

        // 或者可以this.difference(this.completed())
        return this.without.apply(this, this.completed());
    },

    // 在给Collection中添加model时添加order属性
    // 如果集合中没有model时order=1,以后order依次+1
    nextOrder: function () {
        if (!this.length) {
            return 1;
        } else {
            return this.last().get('order') + 1;
        }
    },

    comparator: function (todo) {
        return todo.get('order');
    }
});

// 实例化Collection对象
app.Todos = new TodoList();