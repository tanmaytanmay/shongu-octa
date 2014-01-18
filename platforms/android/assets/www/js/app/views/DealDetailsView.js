define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/DealDetailsTemplate.html'
], function($, _, Backbone, dealDetailsTemplate) {
    var View = Backbone.View.extend({

        tagName: 'div',

        className: 'dealDetails',

        render: function() {
            this.$el.html(_.template(dealDetailsTemplate, this.model.toJSON()));
            this.$('[data-use="rating"]').raty({
                readOnly: true,
                score: this.model.get('rating'),
                width: 150
            });
            return this;
        }
    });

    return View;
});