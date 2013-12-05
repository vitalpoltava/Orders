define(['underscore', 'backbone', 'jst!../templates/statView.html'],
    function(_, Backbone, template) {

    return Backbone.View.extend({
        template: template,
        templateModel: {},

        initialize: function(options) {
            this.myEvents = options.myEvents;
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));
            return this;
        }
    });
});