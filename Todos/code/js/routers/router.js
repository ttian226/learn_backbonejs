/**
 * Created by wangxu on 1/5/16.
 */

var app = app || {};

var Workspace = Backbone.Router.extend({
    routes:{
        '*filter': 'setFilter'
    },

    setFilter: function( param ) {

        // 设置当前使用的路由到app.TodoFilter中
        if (param) {
            param = param.trim();
        }
        app.TodoFilter = param || '';

        // 触发filter事件,在app.Todos中监控该事件
        app.Todos.trigger('filter');
    }
});

// 实例化路由(app.TodoRouter其实用不到,只要实例化即可)
app.TodoRouter = new Workspace();

// 必须通过Backbone.history.start()启动路由监控,否则路由变化不会被捕获到
Backbone.history.start();