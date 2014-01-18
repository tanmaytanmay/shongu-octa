require.config({
  baseUrl: 'js',
  paths: {
    'jquery': '../libs/jquery/jquery.min',
    'underscore': '../libs/underscore/underscore-min',
    'backbone': '../libs/backbone/backbone-min',
    'jquerymobile': '../libs/jquery-mobile-bower/js/jquery.mobile-1.3.2.min',
    'jquery-raty': '../libs/jquery-raty/lib/jquery.raty.min',
    'app': './app',
    'templates': '../templates',
	'jquerytags': '../libs/jquery.tagsinput/jquery.tagsinput'
  },
  
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
	jquerytags:{
		deps: ['jquery'],
		exports: 'jquerytags'
	}
  }
});

require(["backbone",
        "app/routers/MainRouter",
        "app/helpers/jQmInit"
        ], function (Backbone, MainRouter) {

          require([ "jquerymobile" ], function () {
              // Instantiates a new Backbone.js Mobile Router
              this.router = new MainRouter();

              Backbone.history.start();
            });

        });