angular.module('pebbleidea')
  .controller('IdeasCtrl',
  ['$scope', '$rootScope', '$Primus', '$Ideas', '$modal', 'toaster',
  function($scope, $rootScope, $Primus, $Ideas, $modal, toaster) {
    'use strict';

    $scope.currentIdeaIndex = 0;

    $scope.ideas = $Ideas.get;

    $scope.currentIdea = function() {
      var idea = $scope.ideas()[$scope.currentIdeaIndex];
      if (!idea) {
        idea = $scope.ideas()[0];
      }
      return idea;
    };

    $scope.displayItems = function() {
      var items = $scope.ideas().slice($scope.currentIdeaIndex + 1, $scope.currentIdeaIndex + 4);
      if (items.length < 3) {
        var itemsFromBeginningOfList = $scope.ideas().slice(0, 3 - items.length);
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

    $scope.castVote = function(vote, id) {
      $Primus.send('castVote', {
        vote: vote,
        id: id
      }, function(err, docs) {
        if (err) {
          console.error(err);
          toaster.pop('error', 'Vote Casting Error', err);
          return;
        }

        if (vote === 'Yes') {
          toaster.pop('success', 'Vote Casting', 'Your YES vote has been cast');
        } else if (vote === 'No') {
          toaster.pop('success', 'Vote Casting', 'Your NO vote has been cast');
        } else {
          toaster.pop('error', 'Vote Casting Error', 'The type of vote passed is not valid');
        }

        if ($scope.currentIdeaIndex++ >= $scope.ideas().length - 1) {
          $scope.currentIdeaIndex = 0;
        }
      });
    };

    $scope.$on('insert', function() {
      toaster.pop('note', 'A new idea has been added!', 'You can now vote on this new idea');
    });

  }]);