angular.module('pebbleidea')
  .factory('$Ideas',
  ['$Primus', '$rootScope', '$q',
  function($Primus, $rootScope, $q) {
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

    IdeasService.delete = function(index, idea) {
      var deferred = $q.defer();

      $Primus.send('deleteIdea', idea, function(err) {
        if (err) {
          deferred.reject(err);
          return;
        }

        IdeasService.ideas.splice(index, 1);

        deferred.resolve();
      });

      return deferred.promise;
    }

    return IdeasService;

  }]);
