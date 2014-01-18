define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/homePage.html',
    'app/helpers/config'
], function($, _, Backbone, homeTemplate, config) {
    var View = Backbone.View.extend({
        initialize: function() {
        },
			
        render: function() {
            var template = _.template(homeTemplate, { title: config.appName });
            if (this.model) {
                template = _.template(homeTemplate, { title: this.model.get('name') });
            }
			console.log(template);
            this.$el.html(template);

            return this;
        }
    });

    return View;
});