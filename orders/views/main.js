define(['underscore', 'backbone', 'jst!../templates/main.html', './mapView', './statView', '../collections/places'],
    function(_, Backbone, template, MapView, StatView, Places) {

    var mapView, statView, myEvents, places;

    return Backbone.View.extend({
        template: template,
        el: '#root',
        templateModel: {},
        timer: null,

        initialize: function() {
            myEvents = _.extend({}, Backbone.Events);
            places = new Places();
            this.lookupOrders();
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));

            // loading sub-views
            mapView = new MapView({el: '.main_line .right', myEvents: myEvents, collection: places});
            statView = new StatView({el: '.main_line .left', myEvents: myEvents, collection: places});

            return this;
        },

        // reading orders data to collection
        lookupOrders: function() {
            if(typeof this.timer == "number") clearTimeout(this.timer);
            places.fetch();
            this.timer = setTimeout(this.lookupOrders.bind(this), 1000);
        }
    });
});
