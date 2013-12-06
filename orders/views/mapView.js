define(['underscore', 'backbone', 'jst!../templates/mapView.html', 'jst!../templates/bubble.html'],
    function(_, Backbone, template, bubble) {

    var map;

    return Backbone.View.extend({
        template: template,
        templateModel: {},
        markers: [],
        mapCenter: {lat: 51.179343, lng: 19.681091},
        bubble: bubble,

        initialize: function(options) {
            this.myEvents = options.myEvents;
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));
            this.showGMap(this.mapCenter);
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
            if (!order.name) return;
            var myLatlng = new google.maps.LatLng(order.geo_lat, order.geo_long);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                animation: google.maps.Animation.DROP,
                title:"Order! Click to see more...",
                clickable: true,
                info: new google.maps.InfoWindow({
                    content: this.bubble(order)
                })
            });

            google.maps.event.addListener(marker, 'click', function() {
                // this = marker
                this.info.open(map, this);
            });

            this.markers.push(order.markerItem);
        },

        filterMarkers: function(item) {
            var markerItem = item.geo_lat + ',' + item.geo_long;
            item.markerItem = markerItem;
            return !_.contains(this.markers, markerItem);
        }
    });
});