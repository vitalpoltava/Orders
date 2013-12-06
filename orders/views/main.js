define(['underscore', 'backbone', 'jst!../templates/main.html', './mapView', './statView', '../collections/orders'],
    function(_, Backbone, template, MapView, StatView, Orders) {

    var mapView, statView, myEvents, orders;

    return Backbone.View.extend({
        template: template,
        el: '#root',
        templateModel: {},
        timer: null,

        initialize: function() {
            myEvents = _.extend({}, Backbone.Events);
            orders = new Orders();
            this.lookupOrders();
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));

            // loading sub-views
            mapView = new MapView({el: '.main_line .right', myEvents: myEvents, collection: orders});
            statView = new StatView({el: '.main_line .left', myEvents: myEvents, collection: orders});

            return this;
        },

        // reading orders data to collection
        lookupOrders: function() {
            if(typeof this.timer == "number") clearTimeout(this.timer);
            orders.fetch();
            this.timer = setTimeout(this.lookupOrders.bind(this), 1000);
        }
    });
});
