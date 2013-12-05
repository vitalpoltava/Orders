define(['underscore', 'backbone', 'jst!../templates/thumbItem.html'],
    function(_, Backbone, template) {

    return Backbone.View.extend({
        template: template,
        templateModel: {},

        initialize: function(options) {
            this.myEvents = options.myEvents;
            this.photo = options.photo;
            this.place = options.place;
            this.itemClass = options.itemClass;
            this.render();
        },

        render: function() {
            this.templateModel = {
                "itemClass": this.itemClass,
                "url": this.photo.getUrl({'maxWidth': 150}),
                "addr" : this.place.get('name'),
                "lat": this.place.get('geometry').location.ob,
                "lng": this.place.get('geometry').location.pb
            };
            this.$el.append(this.template(this.templateModel));
            return this;
        }
    });
});