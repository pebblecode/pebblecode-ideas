angular.module('pebbleidea')
  .controller('IdeasCtrl',
  ['$scope', '$rootScope', '$Primus', '$Ideas', '$modal', '$timeout', '$Vote',
  function($scope, $rootScope, $Primus, $Ideas, $modal, $timeout, $Vote) {
    'use strict';

    $scope.currentIdeaIndex = 0;

    $scope.totalIdeasToDisplay = 3;

    $scope.ideas = $Ideas.getAll;

    $scope.newIdeaRecieved = false;

    $scope.newIdeaAdded = {};

    $scope.slideDirection = '';

    $scope.currentIdea = function() {
      var idea = $scope.ideas()[$scope.currentIdeaIndex];
      if (!idea) {
        idea = $scope.ideas()[0];
      }
      return idea;
    };

    $scope.recievedNewIdea = function(event, idea) {
      $scope.newIdeaRecieved = true;
      $scope.newIdeaAdded = idea;
      $timeout(function() {
        $scope.newIdeaRecieved = false;
        $scope.newIdeaAdded = {};
      }, 5000);
    };

    $scope.$on('insert', $scope.recievedNewIdea);

    $scope.fullScreen = function() {
      document.getElementById('app').webkitRequestFullScreen();
    }

    $scope.displayItems = function() {
      var items = $scope.ideas().slice($scope.currentIdeaIndex + 1, $scope.currentIdeaIndex + ($scope.totalIdeasToDisplay + 1));
      if (items.length < $scope.totalIdeasToDisplay) {
        var itemsFromBeginningOfList = $scope.ideas().slice(0, $scope.totalIdeasToDisplay - items.length);
        items = items.concat(itemsFromBeginningOfList);
      }
      return items.reverse();
    };

    $scope.addNewIdea = function() {

      // Open a modal instance to add an new idea from the front end
      var modalInstance = $modal.open({
        templateUrl: 'add-new-idea-form.html',
        controller: 'AddIdeaCtrl'
      });

      // Get the result form and pass to the ideas service
      modalInstance.result.then(function(form) {
        $Ideas.addNewIdeaFromForm(form);
      });
    };

    // TODO: Add functionality to skip though ideas without voting

    $scope.nextIdea = function() {
      if ($scope.currentIdeaIndex++ >= $scope.ideas().length - 1) {
        $scope.currentIdeaIndex = 0;
      }
    };

    $scope.prevIdea = function() {
      if ($scope.currentIdeaIndex-- < 0) {
        $scope.currentIdeaIndex = $scope.ideas().length - 1;
      }
    };

    $scope.$on('castVote', function(event, data) {
      $Vote.castVote(data).then(function(updatedVote) {
        $scope.nextIdea();
      });
    });

  }]);
