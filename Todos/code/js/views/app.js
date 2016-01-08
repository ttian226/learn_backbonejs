/**
 * Created by wangxu on 1/5/16.
 */

var app = app || {};

app.AppView = Backbone.View.extend({

    // 设置关联的元素
    el: '.todoapp',

    // 模板方法,要加在footer中.
    statsTemplate: _.template($('#stats-template').html()),

    events: {
        'keypress .new-todo': 'createOnEnter',          // 给input元素绑定keypress事件
        'click .clear-completed': 'clearCompleted',     // 给footer中的clear按钮绑定click事件
        'click #toggle-all': 'toggleAllComplete'        // 给toggle-all绑定click事件
    },

    initialize: function () {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('.new-todo');
        this.$footer = this.$('.footer');
        this.$main = this.$('.main');

        this.listenTo(app.Todos, 'add', this.addOne);
        this.listenTo(app.Todos, 'reset', this.addAll);

        this.listenTo(app.Todos, 'change:completed', this.filterOne);
        this.listenTo(app.Todos, 'filter', this.filterAll);
        this.listenTo(app.Todos, 'all', this.render);

        app.Todos.fetch();
    },

    render: function () {
        var completed = app.Todos.completed().length;
        var remaining = app.Todos.remaining().length;

        if (app.Todos.length) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html(this.statsTemplate({
                completed: completed,
                remaining: remaining
            }));

            this.$('#filters li a')
                .removeClass('selected')
                .filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
                .addClass('selected');
        } else {
            this.$main.hide();
            this.$footer.hide();
        }

        this.allCheckbox.checked = !remaining;
    },

    filterOne: function (todo) {
        todo.trigger('visible');
    },

    filterAll: function () {
        app.Todos.each(this.filterOne, this);
    },

    addOne: function (todo) {
        var view = new app.TodoView({model: todo});
        $('.todo-list').append(view.render().el);
    },

    addAll: function () {
        //this.$('.todo-list').html('');
        //app.Todos.each(this.addOne, this);
    },

    // 返回新创建model的默认属性
    newAttributes: function () {
        return {
            title: this.$input.val().trim(),    // input中的值作为title
            order: app.Todos.nextOrder(),       // order,第一个为1,以后每次+1
            completed: false                    // completed默认为false(未完成)
        };
    },

    // input元素keypress事件的回调函数
    createOnEnter: function (event) {

        // 如果keypress的键不是回车,或者输入的是空串,则返回
        if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
            return;
        }

        // 输入不为空并且按回车,在app.Todos(Collection)中创建一个新的model
        // 触发'add'事件,调用addOne()方法在列表中添加一个新项
        app.Todos.create(this.newAttributes());

        // 清空input中的值
        this.$input.val('');
    },

    clearCompleted: function () {

        // completed()返回app.Todos中已完成的model组成的数组
        // _.invoke()对集合中的每个元素(model)调用destroy方法
        _.invoke(app.Todos.completed(), 'destroy');
        return false;
    },

    toggleAllComplete: function () {
        var completed = this.allCheckbox.checked;

        app.Todos.each(function (todo) {
            todo.save({
                completed: completed
            });
        });
    }
});