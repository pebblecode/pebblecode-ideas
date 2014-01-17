angular.module('pebbleidea')
  .factory('$Ideas',
  ['$Primus', '$rootScope',
  function($Primus, $rootScope) {
    'use strict';

    var IdeasService = {};

    IdeasService.ideas = [];

    IdeasService.currentVoteIndex = 0;

    IdeasService.setAllIdeas = function(ideas) {
      IdeasService.ideas = ideas;
      $rootScope.$broadcast('dataLoaded');
    };

    $Primus.on('initData', function(ideas) {
      IdeasService.setAllIdeas(ideas);
    });

    $Primus.on('insert', function(idea) {
      IdeasService.ideas.push(idea[0]);
      $rootScope.$broadcast('insert', idea[0]);
    });

    IdeasService.getDisplayIdeas = function(count) {
      var ideas = IdeasService.ideas.slice(IdeasService.currentVoteIndex + 1, IdeasService.currentVoteIndex + 1 + count);
      if (ideas.length < count) {
        ideas = ideas.concat(IdeasService.ideas.slice(0, count - ideas.length))
      }

      return ideas.reverse();
    };

    IdeasService.getNextDisplayIdea = function(count) {
      var idea = IdeasService.ideas[IdeasService.currentVoteIndex + 1 + count];
      if (!idea) {
        idea = IdeasService.ideas[0];
      }
      return idea;
    }

    // This is the item currently in the vote section
    IdeasService.getCurrentVoteItem = function() {
      var idea = IdeasService.ideas[IdeasService.currentVoteIndex];
      if (!idea) {
        IdeasService.currentVoteIndex = 0;
        idea = IdeasService.ideas[IdeasService.currentVoteIndex];
      }
      return idea;
    };

    IdeasService.nextVoteItem = function() {
      if (IdeasService.currentVoteIndex++ > IdeasService.ideas.length) {
        IdeasService.currentVoteIndex = 0;
      }
    };

    IdeasService.prevVoteItem = function() {
      IdeasService.currentVoteIndex = IdeasService.currentVoteIndex - 1;
      if (IdeasService.currentVoteIndex < 0) {
        IdeasService.currentVoteIndex = IdeasService.ideas.length - 1;
      }
    };

    return IdeasService;

  }]);
