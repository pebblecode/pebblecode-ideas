angular.module('pebbleidea')
  .factory('$Ideas',
  ['$Primus', '$rootScope',
  function($Primus, $rootScope) {
    'use strict';

    var Ideas = {};

    Ideas.data = [];

    Ideas.set = function(data) {
      Ideas.data = data;
    };

    Ideas.get = function() {
      return Ideas.data;
    };

    Ideas.add = function(idea) {
      Ideas.data.push(idea);
    };

    Ideas.del = function(index) {
      Ideas.data.slice(index, 1);
    };

    Ideas.addNewIdeaFromForm = function(form) {
      $Primus.send('newIdea', form);
    };

    $Primus.on('findAll', function(data) {
      Ideas.set(data);
    });

    // Event when a new idea is added via the frontend or via SMS
    $Primus.on('insert', function(data) {
      Ideas.add(data[0]);
      $rootScope.$broadcast('insert');
    });
    
    return Ideas;

  }]);