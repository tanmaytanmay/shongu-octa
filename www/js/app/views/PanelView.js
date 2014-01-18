define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/leftPanel.html',
], function($, _, Backbone, panelTemplate) {
    var View = Backbone.View.extend({
        initialize: function() {
        },

        render: function() {
            var template = _.template(panelTemplate);
            if (this.model) {
                template = _.template(panelTemplate, { title: this.model.get('name') });
            }

            this.$el.html(template);

            return this;
        }
    });

    return View;
});