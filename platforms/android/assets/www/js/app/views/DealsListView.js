define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/DealListItemView',
    'text!templates/paginationButtonsTemplate.html'
], function($, _, Backbone, DealListItemView, paginationButtonsTemplate) {
    var View = Backbone.View.extend({
        tagName: 'ul',

        className: 'dealsList',

        initialize: function() {
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
        },

        addAll: function() {
            // Empty list
            this.$el.empty();
            // Add items
            this.collection.each(this.addOne, this);
            // Add pagination button
            this.$el.append(_.template(paginationButtonsTemplate, {
                prevPageUrl: this.collection.getPageUrl('prev'),
                nextPageUrl: this.collection.getPageUrl('next')
            }));
        },

        addOne: function(deal) {
            var view = new DealListItemView({
                model: deal
            });

            this.$el.prepend(view.render().$el.fadeIn('slow'));

        }
    });

    return View;
});