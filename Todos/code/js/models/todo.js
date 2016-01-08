/**
 * Created by wangxu on 1/5/16.
 */

var app = app || {};

app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },

    // 当切换单个Item的完成状态时调用这个函数(todos.js中)
    toggle: function () {

        // 1.model.save 更新localStorage中的model
        // 2.触发'change'事件,使用render()进行重绘
        this.save({
            completed: !this.get('completed')
        });
    }
});

