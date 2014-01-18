define([
	'backbone',
	'app/helpers/config'
], function(Backbone, config) {
	var Model = Backbone.Model.extend({
        urlRoot: 'http://localhost:3000/deals'
    });

	var Collection = Backbone.Collection.extend({
		models: Model,

		initialize: function(attrs) {
			this.options = attrs;
		},

		comparator: function(deal) {
			return deal.get('rating');
		},

		url: function() {
			var url = 'http://localhost:3000/deals';

			if (this.options.q) {
				url += '/q=' + this.options.q;
			}
			if (this.options.p) {
				url += '/s=' + (this.options.p - 1) * config.pageSize;
			} else {
				url += '/s=' + 0;
			}

			url += '/t=' + config.pageSize;

			return url;
		},

		getPageUrl: function(direction) {
			var page, url = 'http://localhost:3000/deals';

			if (direction === 'next') {
				page = this.pageNumber + 1;
			} else if (direction === 'prev') {
				page = this.pageNumber > 1 ? this.pageNumber - 1 : 1;
			}

			if (this.options.q) {
				url += '/q=' + this.options.q;
			}

			return url + '/p=' + page;
		},

		parse: function(response) {
				//this.total = response.totalMatchCount;
			this.total = 10;
			//this.skipped = response.criteria.resultsToSkip;
			this.skipped = 2;
			this.pageNumber = Math.round(this.skipped / config.pageSize) + 1;

			return response.matches;
		}
	});

	return {
		model: Model,
		collection: Collection
	};
});