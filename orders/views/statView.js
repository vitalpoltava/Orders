define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var template = require('jst!../templates/statView.html');
    var OneStatItemView = require('./oneStatItemView');

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
            this.$list.empty();
            this.collection.countMostOrdered().forEach(this.renderOneStatLine);
        },

        renderOneStatLine: function(item, index) {
            var view = new OneStatItemView({el: '.stat_list'});
            item.index = index;
            view.render(item);
        }
    });
});