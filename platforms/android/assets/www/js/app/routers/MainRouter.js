define([
    'backbone',
    'app/views/DealsListView',
    'app/views/DealDetailsView',
    'app/views/HeaderView',
    'app/views/HomeHeaderView',
    'app/views/FooterView',
    'app/views/JqmPageView',
    'app/models/Deal'
], function (Backbone, DealsListView, DealDetailsView, HeaderView,
             HomeHeaderView, FooterView, jqMPageView, Deal) {
    var Router = Backbone.Router.extend({
        initialize: function() {

            // Handle back button throughout the application
            $(document).on('click', '[data-rel="back"]', function(event) {
                window.history.back();
                return false;
            });
        },

        routes: {
            'deals(/q=:q)(/p=:p)(/)': 'getDeals',
            'deals/:id': 'getDeal',
            '': 'main'
        },

        main: function () {
            this.navigate('deals', { trigger: true });
        },

        getDeal: function(id) {
            $.mobile.loading( 'show' );
            var rModel = new Deal.model({
                id: id
            });

            rModel.fetch({
                success: function(model, response, options) {
                    var dealPage = new jqMPageView();
                    dealPage.setHeaderView(new HeaderView({
                        model: model
                    }), true);
                    dealPage.setContentView(new DealDetailsView({
                        model: model
                    }));
                    dealPage.setFooterView();
                    dealPage.navigate('slide');
                    $(document).scrollTop();
                }
            });
        },

        getDeals: function (q, p) {
            console.log('q: ' + q + ' p: ' + p);
            
            $.mobile.loading( 'show' );
            var rCollection = new Deal.collection({
                q: q,
                p: p
            });
			console.log("Collection");
			console.log(rCollection);

            var dealsPage = new jqMPageView();
            dealsPage.setHeaderView(new HomeHeaderView());
            dealsPage.setContentView(new DealsListView({
                collection: rCollection
            }));
            dealsPage.setFooterView(new FooterView());
            rCollection.fetch({
                reset: true,
                success: function(collection, response, options) {
                    collection.sort();
                    dealsPage.navigate();
                }
            });
        }
    });

    return Router;
});