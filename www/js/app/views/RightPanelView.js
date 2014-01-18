define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/rightPanel.html',
], function($, _, Backbone, RightpanelTemplate) {
    var View = Backbone.View.extend({
        initialize: function() {
        },

        render: function() {
            var template = _.template(RightpanelTemplate);
            if (this.model) {
                template = _.template(RightpanelTemplate, { title: this.model.get('name') });
            }

            this.$el.html(template);

            return this;
        }
    });

    return View;
});