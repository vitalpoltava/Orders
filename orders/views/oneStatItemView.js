define(['underscore', 'backbone', 'jst!../templates/statItem.html'],
    function(_, Backbone, template) {
    'use strict';

    return Backbone.View.extend({
        template: template,

        initialize: function() {},

        render: function(model) {
            this.$el.append(this.template(model));
            return this;
        }
    });
});