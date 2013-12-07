define(['underscore', 'backbone', '../models/order'], function(_, Backbone, Order) {
    'use strict';

    return Backbone.Collection.extend({
        model: Order,
        url: 'http://localhost:3000/orders'
    });
});