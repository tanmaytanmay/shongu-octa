define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/DealListItemTemplate.html',
    'jquery-raty'
], function($, _, Backbone, dealListItemTemplate) {
	var View = Backbone.View.extend({
		tagName: 'li',

		className: 'dealItem',

		events: {
			'click a': 'goToDetails'
		},

		render: function() {
			this.$el.html(_.template(dealListItemTemplate, this.model.toJSON()));
			this.$('[data-use="rating"]').raty({
				readOnly: true,
				score: this.model.get('rating'),
				width: 150
			});
			return this;
		},

		goToDetails: function() {
			Backbone.history.navigate('deals/' + this.model.id, { trigger: true });
		}
	});

	return View;
});