define(['underscore', 'backbone', 'jst!../templates/mapView.html'],
    function(_, Backbone, template) {

    var map;

    return Backbone.View.extend({
        template: template,
        templateModel: {},
        markers: [],

        initialize: function(options) {
            this.myEvents = options.myEvents;
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));
            this.showGMap({lat: 51.179343, lng: 19.681091});
            return this;
        },

        showGMap: function(position, zoom) {
            var myLatlng = new google.maps.LatLng(position.lat, position.lng);
            var mapOptions = {
                center: myLatlng,
                zoom: zoom || 5
            };
            map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);

            // adding markers when collection added
            this.collection.on('add', this.createMarkers.bind(this))
        },

        createMarkers: function() {
            var list = this.collection.toJSON();
            list.filter(this.filterMarkers.bind(this)).forEach(this.createMarker.bind(this));
        },

        createMarker: function(order) {
            var myLatlng = new google.maps.LatLng(order.geo_lat, order.geo_long);
            this.markers.push(order.markerItem);
            new google.maps.Marker({
                position: myLatlng,
                map: map,
                animation: google.maps.Animation.DROP,
                title:"Place of search..."
            });
        },

        filterMarkers: function(item) {
            var markerItem = item.geo_lat + ',' + item.geo_long;
            item.markerItem = markerItem;
            return !_.contains(this.markers, markerItem);
        }
    });
});