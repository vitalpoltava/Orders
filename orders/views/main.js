define(['underscore', 'backbone', 'jst!../templates/main.html', './mapView', './statView', '../collections/orders'],
    function(_, Backbone, template, MapView, StatView, Orders) {

    var mapView, statView, orders;

    return Backbone.View.extend({
        template: template,
        el: '#root',
        templateModel: {},
        timer: null,

        initialize: function() {
            orders = new Orders();
            this.lookupOrders();
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));

            // applying sub-views
            mapView = new MapView({el: '.main_line .right', collection: orders});
            statView = new StatView({el: '.main_line .left', collection: orders});

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
