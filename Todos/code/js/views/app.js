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
        this.allCheckbox = this.$('#toggle-all')[0];    // toggle-all的checkbox,是DOM对象
        this.$input = this.$('.new-todo');              // input输入框,是jQuery对象
        this.$footer = this.$('.footer');               // footer,是jQuery对象
        this.$main = this.$('.main');                   // main,是jQuery对象

        this.listenTo(app.Todos, 'add', this.addOne);   // 监听app.Todos的add事件
        this.listenTo(app.Todos, 'reset', this.addAll);

        this.listenTo(app.Todos, 'change:completed', this.filterOne);
        this.listenTo(app.Todos, 'filter', this.filterAll);
        this.listenTo(app.Todos, 'all', this.render);   // 监听app.Todos的所有事件

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

    // 在列表中插入一条渲染后的todo HTML
    addOne: function (todo) {

        // 创建TodoView的实例view
        var view = new app.TodoView({model: todo});

        // view.render().el返回的是渲染后的HTML,在把它插入到列表中
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

    // footer中的clear按钮click事件的回调函数
    clearCompleted: function () {

        // completed()返回app.Todos中已完成的model组成的数组
        // _.invoke()对集合中的每个元素(model)调用destroy方法
        // 触发model的'destroy'事件,destroy事件是在TodoView中监听
        _.invoke(app.Todos.completed(), 'destroy');
        return false;
    },

    // toggle-all的click事件回调函数
    toggleAllComplete: function () {

        // 获取allCheckbox的选中状态
        var completed = this.allCheckbox.checked;

        // 遍历集合中的model
        app.Todos.each(function (todo) {

            // 设置每个model的completed属性使其与allCheckbox一致.
            // 更新到localStoriage中,并触发model的'change'事件
            todo.save({
                completed: completed
            });
        });
    }
});