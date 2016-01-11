/**
 * Created by wangxu on 1/5/16.
 */

var app = app || {};

app.TodoView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#item-template').html()),

    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close',
        'click .toggle': 'togglecompleted', // 鼠标点击切换完成状态
        'click .destroy': 'clear'
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);           // 监听model的change事件,调用render()方法渲染
        this.listenTo(this.model, 'destroy', this.remove);          // 监听model的destroy事件,调用view.remove方法,它会从DOM中删除el
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        this.$input = this.$('.edit');

        this.$el.toggleClass('completed', this.model.get('completed'));
        this.toggleVisible();

        return this;
    },

    toggleVisible: function () {
        this.$el.toggleClass('hidden', this.isHidden());
    },

    isHidden: function () {
        var isCompleted = this.model.get('completed');

        return (
            (!isCompleted && app.TodoFilter === 'completed')
            || (isCompleted && app.TodoFilter === 'active')
        );
    },

    togglecompleted: function () {
        this.model.toggle();
    },

    clear: function () {
        this.model.destroy();
    },

    edit: function () {
        this.$el.addClass('editing');
        this.$input.focus();
    },

    close: function () {
        var value = this.$input.val().trim();
        if (value) {
            this.model.save({title: value});
        }
        this.$el.removeClass('editing');
    },

    updateOnEnter: function (e) {
        if (e.which === ENTER_KEY) {
            this.close();
        }
    }
});