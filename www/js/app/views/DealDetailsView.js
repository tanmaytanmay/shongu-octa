define([
    'jquery',
    'underscore',
    'backbone',
	'jquerytags',
    'text!templates/DealDetailsTemplate.html'
], function($, _, Backbone, jqueryTags, dealDetailsTemplate) {
    var View = Backbone.View.extend({

        tagName: 'div',

        className: 'dealDetails',

		initialize:function(){
			
		},
		
		
        render: function() {
            this.$el.html(_.template(dealDetailsTemplate, this.model.toJSON()));
			console.log("inside render");
			console.log(this.model.toJSON().brand.locations[0].latitude);
            this.$('[data-use="rating"]').raty({
                readOnly: true,
                score: this.model.get('rating'),
                width: 150
            });
			$("#categorytype").tagsInput();
			$('#categorytype input').attr('disabled', 'disabled');
			var categories=this.model.toJSON().categories
			console.log(categories);
			_.each(categories, function(category) {
			$("#categorytype").addTag(category);
			});
			this.drawMap(this.model.toJSON());
            return this;
        },
		drawMap:function(model){
					$(document).on('pageshow',function() {
				console.log("inside maps function pleeeej");
				var defaultLatLng = new google.maps.LatLng(model.brand.locations[0].latitude,model.brand.locations[0].longitude);
				var myOptions = {
					zoom: 16,
					center: defaultLatLng,
					mapTypeId: google.maps.MapTypeId.ROADMAP
					};
		
				var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		
				// Add an overlay to the map of current lat/lng
				var marker = new google.maps.Marker({
					position: defaultLatLng,
					map: map,
					title: "MallKhoj!"
					});
			
		
			});
		
		}
		
    });

    return View;
});