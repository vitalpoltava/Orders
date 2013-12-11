define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var template = require('jst!../templates/statItem.html');

    return Backbone.View.extend({
        template: template,

        initialize: function() {},

        render: function(model) {
            this.$el.append(this.template(model));
            return this;
        }
    });
});