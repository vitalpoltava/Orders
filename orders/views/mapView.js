define(function(require) {
    'use strict';

    var map;
    var _ = require('underscore');
    var Backbone = require('backbone');
    var template = require('jst!../templates/mapView.html');
    var bubble = require('jst!../templates/bubble.html');

    return Backbone.View.extend({
        template: template,
        templateModel: {},
        markers: [],
        mapCenter: {lat: 51.179343, lng: 19.681091},
        bubble: bubble,

        initialize: function() {
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
            this.listenTo(this.collection, 'add', this.createMarkers.bind(this));
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

            // show order details
            google.maps.event.addListener(marker, 'click', function() {
                // this = marker
                this.info.open(map, this);
            });

            this.markers.push(order.markerItem);
        },

        // filter out records which already used to create a map marker
        filterMarkers: function(item) {
            var markerItem = item.geo_lat + ',' + item.geo_long;
            item.markerItem = markerItem;
            return !_.contains(this.markers, markerItem);
        }
    });
});