/**
 * Created by wangxu on 1/5/16.
 */

var app = app || {};

app.TodoView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#item-template').html()),

    events: {
        'dblclick label': 'edit',           // 双击label标签编辑title
        'keypress .edit': 'updateOnEnter',  // 绑定编辑框中的keypress事件
        'blur .edit': 'close',              // 编辑框中blur事件
        'click .toggle': 'togglecompleted', // 鼠标点击切换完成状态
        'click .destroy': 'clear'           // 绑定删除按钮事件
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);           // 监听model的change事件,调用render()方法渲染
        this.listenTo(this.model, 'destroy', this.remove);          // 监听model的destroy事件,调用view.remove方法,它会从DOM中删除el
        this.listenTo(this.model, 'visible', this.toggleVisible);   // 监听model的自定义visible事件
    },

    render: function () {

        // 通过model初始化模板,在把模板内容作为html内容初始化li元素
        this.$el.html(this.template(this.model.attributes));
        this.$input = this.$('.edit');

        // 根据model的completed属性设置class
        this.$el.toggleClass('completed', this.model.get('completed'));
        //this.toggleVisible();

        return this;
    },

    // 根据过滤器决定是否隐藏当前li
    toggleVisible: function () {

        // 根据isHidden()结果决定是否隐藏
        this.$el.toggleClass('hidden', this.isHidden());
    },

    // 根据过滤器和当前completed状态判断是否隐藏当前视图
    isHidden: function () {

        // 获取当前completed状态
        var isCompleted = this.model.get('completed');

        // 路由#completed时,隐藏未完成的项
        // 路由#active,隐藏完成的项
        return (
            (!isCompleted && app.TodoFilter === 'completed')
            || (isCompleted && app.TodoFilter === 'active')
        );
    },

    // 切换状态
    togglecompleted: function () {
        this.model.toggle();
    },

    // 删除
    clear: function () {

        // 销毁collection中的model
        this.model.destroy();
    },

    // 编辑
    edit: function () {
        this.$el.addClass('editing');
        this.$input.focus();
    },

    // 保存model
    close: function () {
        var value = this.$input.val().trim();
        if (value) {

            // 1.model.save 更新localStorage中的model
            // 2.触发'change'事件,使用render()进行重绘
            this.model.save({title: value});
        }
        this.$el.removeClass('editing');
    },

    // 处理编辑框中的keypress事件
    updateOnEnter: function (e) {

        // 当敲回车键时,执行close方法
        if (e.which === ENTER_KEY) {
            this.close();
        }
    }
});