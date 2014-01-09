angular.module('pebbleidea')
  .factory('$Primus', ['$rootScope', '$timeout', function($rootScope, $timeout) {


    var $Primus = {}

    window.primus = $Primus.primus = new Primus({
      host: window.location.hostname,
      port: window.location.port
    });

    $Primus.on = function(name, cb) {
      this.primus.on(name, cb);
    }

    $Primus.send = function(name, data) {
      this.primus.send(name, data);
    }

    return $Primus;

  }]);