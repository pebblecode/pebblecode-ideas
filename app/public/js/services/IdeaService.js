angular.module('pebbleidea')
  .factory('$Ideas',
  ['$Primus', '$rootScope',
  function($Primus, $rootScope) {
    'use strict';

    var IdeasService = {};

    IdeasService.ideas = [];

    IdeasService.totalToDisplay = 5;

    IdeasService.displayIndex = 0;

    IdeasService.newIdea = {};


    IdeasService.set = function(ideas) {
      IdeasService.ideas = ideas;
    };

    IdeasService.getAll = function() {
      return IdeasService.ideas;
    };

    IdeasService.getNext = function() {
      if (IdeasService.displayIndex++ >= IdeasService.ideas.length - 1) {
        IdeasService.displayIndex = 0;
      }

      return Idea.ideas[IdeasService.displayIndex];
    }

    IdeasService.getPrev = function() {
      if (IdeasService.displayIndex-- < 0) {
        IdeasService.displayIndex = IdeasService.ideas().length - 1;
      }

      return Idea.ideas[IdeasService.displayIndex];
    }

    IdeasService.add = function(idea) {
      IdeasService.ideas.push(idea);
    };

    IdeasService.del = function(index) {
      IdeasService.ideas.slice(index, 1);
    };

    IdeasService.addNewIdeaFromForm = function(form) {
      $Primus.send('newIdea', form);
    };

    $Primus.on('findAll', function(ideas) {
      IdeasService.set(ideas);
    });

    // Event when a new idea is added via the frontend or via SMS
    $Primus.on('insert', function(idea) {
      IdeasService.add(idea[0]);
      $rootScope.$broadcast('insert', idea[0]);
    });

    return IdeasService;

  }]);
