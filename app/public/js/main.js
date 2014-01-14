angular.module('pebbleidea',
  ['angular-leap', 'ngRoute', 'ui.bootstrap', 'toaster', 'ngAnimate'])
  .config(function() {
    'use strict';
    
  })
  .run(['$rootScope', function($rootScope) {
    'use strict';

    // Attach a 'raw' Primus object to the rootScope
    $rootScope.socket = new Primus({
      host: window.location.hostname,
      port: window.location.port
    });

  }]);