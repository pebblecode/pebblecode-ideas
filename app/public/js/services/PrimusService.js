angular.module('pebbleidea')
  .factory('$Primus', ['$rootScope', '$timeout', function($rootScope, $timeout) {


    var $Primus = {}

    window.primus = $Primus.primus = new Primus({
      host: window.location.hostname,
      port: window.location.port
    });

    $Primus.on = function(name, cb) {
      this.primus.on('data', function(data) {
        if (data.event === name) {
          cb(data.data);
        } else if (data.event === 'error') {
          throw new Error(data);
        }
      });
    }

    $Primus.emit = function(data) {
      this.primus.write(data);
    }


    return $Primus;

  }]);