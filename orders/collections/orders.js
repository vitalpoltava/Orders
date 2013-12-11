define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Order = require('../models/order');

    // useful for functional coding approach
    var truthy = function(item) {
        return item;
    };

    return Backbone.Collection.extend({
        model: Order,
        url: 'http://localhost:3000/api/list.json',

        countMostOrdered: function() {
            return this.countOrders(this.toJSON());
        },

        // sort orders by food type
        countOrders: function(orders) {
            var res = [];
            var stat = _.chain(orders)
                .pluck('name')
                .countBy(truthy)
                .value();

            for (var key in stat) {
                if (stat.hasOwnProperty(key) && key !== 'undefined') {
                    res.push({name:key, total: stat[key] >> 0});
                }
            }

            return res.sort(function(a, b) {
                return b.total - a.total;
            });
        }
    });
});