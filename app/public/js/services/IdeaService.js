angular.module('pebbleidea')
  .factory('$Ideas',
  ['$Primus', '$rootScope',
  function($Primus, $rootScope) {
    'use strict';

    var IdeasService = {};

    IdeasService.ideas = [];

    IdeasService.currentVoteIndex = 0;


    // Increment the currentVote Index or reset to 0
    IdeasService.nextVoteIndex = function() {
      IdeasService.currentVoteIndex++;
      if (IdeasService.currentVoteIndex > IdeasService.ideas.length) {
        IdeasService.currentVoteIndex = 0;
      }
    }

    IdeasService.prevVoteIndex = function() {
      IdeasService.currentVoteIndex--;
      if (IdeasService.currentVoteIndex < 0) {
        IdeasService.currentVoteIndex = IdeasService.ideas.length - 1;
      }
    }

    IdeasService.getCurrentVoteIndex = function() {
      return IdeasService.currentVoteIndex;
    }

    IdeasService.setAllIdeas = function(ideas) {
      IdeasService.ideas = ideas;
      $rootScope.$broadcast('dataLoaded');
    }

    IdeasService.getAllIdeas = function() {
      return IdeasService.ideas;
    }

    IdeasService.getIdea = function(index) {
      var idea = IdeasService.ideas[index];
      console.log(idea)
      return idea;
    }

    IdeasService.getIdeas = function(start, count, reverse) {
      var ideas = IdeasService.ideas.slice(start, count + 1);
      if (ideas.length < count) {
        ideas = ideas.concat(IdeasService.ideas.slice(0, count - ideas.length))
      }

      if (reverse) {
        ideas = ideas.reverse();
      }

      return ideas;
    }

    IdeasService.addIdea = function(idea) {
      IdeasService.ideas.push(idea);
    }

    IdeasService.getNextIdea = function(index) {
      var idea = IdeasService.ideas.slice(index, 1)[0];

      // No idea because we're at the end of the list
      if (!idea) {
        idea = IdeasService.ideas[0];
      }

      return idea;
    }

    IdeasService.getPrevIdea = function(index) {
      var idea = IdeasService.ideas.slice(index - 2, 1)[0];

      // At beginning of the list, so go to the end
      if (!idea) {
        idea = IdeasService.ideas[IdeasService.ideas.length - 1];
      }

      return idea;
    }


    // Listener to initialise service with data
    $Primus.on('initData', function(ideas) {
      IdeasService.setAllIdeas(ideas);
    });

    $Primus.on('insert', function(idea) {
      IdeasService.addIdea(idea[0]);
      $rootScope.$broadcast('insert', idea[0]);
    });


    // IdeasService.totalToDisplay = 5;

    // IdeasService.displayIndex = 0;

    // IdeasService.newIdea = {};


    // IdeasService.set = function(ideas) {
    //   IdeasService.ideas = ideas;
    // };

    // IdeasService.getAll = function() {
    //   return IdeasService.ideas;
    // };

    // IdeasService.getNext = function() {
    //   if (IdeasService.displayIndex++ >= IdeasService.ideas.length - 1) {
    //     IdeasService.displayIndex = 0;
    //   }

    //   return Idea.ideas[IdeasService.displayIndex];
    // }

    // IdeasService.getPrev = function() {
    //   if (IdeasService.displayIndex-- < 0) {
    //     IdeasService.displayIndex = IdeasService.ideas().length - 1;
    //   }

    //   return Idea.ideas[IdeasService.displayIndex];
    // }

    // IdeasService.add = function(idea) {
    //   IdeasService.ideas.push(idea);
    // };

    // IdeasService.del = function(index) {
    //   IdeasService.ideas.slice(index, 1);
    // };

    // IdeasService.addNewIdeaFromForm = function(form) {
    //   $Primus.send('newIdea', form);
    // };

    // $Primus.on('findAll', function(ideas) {
    //   IdeasService.set(ideas);
    // });

    // // Event when a new idea is added via the frontend or via SMS
    // $Primus.on('insert', function(idea) {
    //   IdeasService.add(idea[0]);
    //   $rootScope.$broadcast('insert', idea[0]);
    // });

    return IdeasService;

  }]);
