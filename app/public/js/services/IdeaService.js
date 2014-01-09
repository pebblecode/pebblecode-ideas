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

    Ideas.add = function(idea) {
      Ideas.data.push(idea);
      Ideas.save(idea);
    }

    Ideas.del = function(index) {
      Ideas.data.slice(index, 1);
    }

    Ideas.load = function() {

    }

    Ideas.save = function(idea) {
      $Primus.emit({
        event: 'newIdea',
        data: idea
      });
    }

    $Primus.on('findAll', function(data) {
      Ideas.set(data);
      $rootScope.$apply(function() { });
    })

    $Primus.on('insert', function(data) {
      Ideas.data.push(data);
      $rootScope.$apply(function() { });
    })
    
    return Ideas;

  }])