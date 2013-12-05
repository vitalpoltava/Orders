define(['underscore', 'backbone', '../models/place'], function(_, Backbone, Place) {
    return Backbone.Collection.extend({
        model: Place,
        url: 'http://localhost:3000/orders'
    });
});