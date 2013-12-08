define(['underscore', 'backbone', './oneStatItemView', 'jst!../templates/statView.html'],
    function(_, Backbone, OneStatItemView, template) {
    'use strict';

    return Backbone.View.extend({
        template: template,
        templateModel: {},

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));
            this.$list = $('.stat_list');

            // Renewing stat list event
            this.listenTo(this.collection, 'add', this.renewStatView.bind(this));
            return this;
        },

        // create list of most ordered foods
        renewStatView: function() {
            var list = this.collection.countMostOrdered();
            this.$list.empty();

            list.forEach(function(item, index) {
                item.index = index;
                var view = new OneStatItemView({el: '.stat_list'});
                view.render(item);
            });
        }
    });
});