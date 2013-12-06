define(['underscore', 'backbone', './oneStatItemView', 'jst!../templates/statView.html'],
    function(_, Backbone, OneStatItemView, template) {

    // useful function for functional approach
    var truthy = function(item) {
        return item;
    };

    return Backbone.View.extend({
        template: template,
        templateModel: {},

        initialize: function(options) {
            this.myEvents = options.myEvents;
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));
            this.$list = $('.stat_list');

            // Renewing stat list
            this.collection.on('add', this.renewStat.bind(this))
            return this;
        },

        renewStat: function() {
            var list = this.countOrders(this.collection.toJSON());
            this.$list.empty();

            list.forEach(function(item, index) {
                item.index = index;
                var view = new OneStatItemView({el: '.stat_list'});
                view.render(item);
            });
        },

        countOrders: function(orders) {
            var stat = _.chain(orders)
                .pluck('name')
                .countBy(truthy)
                .value();
            var res = [];

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