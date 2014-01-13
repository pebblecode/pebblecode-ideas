angular.module('pebbleidea')
  .factory('$Ideas', ['$Primus', '$rootScope', function($Primus, $rootScope) {

    var Ideas = {};

    Ideas.data = [];

    Ideas.set = function(data) {
      Ideas.data = data;
    }

    Ideas.get = function() {
      return Ideas.data;
    }

    // When adding ideas from the front end
    Ideas.add = function(idea) {
      $Primus.send('newIdea', idea);
    }

    Ideas.del = function(index) {
      Ideas.data.slice(index, 1);
    }

    $Primus.on('findAll', function(data) {
      Ideas.set(data);
      $rootScope.$apply(function() { return; });
    })

    // Event when a new idea is added via the frontend or via SMS
    $Primus.on('insert', function(data) {
      Ideas.data.push(data[0]);
      $rootScope.$broadcast('insert');
      $rootScope.$apply(function() { return; });
    })
    
    return Ideas;

  }])