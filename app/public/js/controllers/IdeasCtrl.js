angular.module('pebbleidea')
  .controller('IdeasCtrl',
  ['$scope', '$rootScope', '$Ideas', '$timeout',
  function($scope, $rootScope, $Ideas, $timeout) {
    'use strict';

    $scope.totalIdeasToDisplay = 4;

    $scope.displayIdeas = [];

    $rootScope.$on('dataLoaded', function() {
      $scope.displayIdeas = $Ideas.getDisplayIdeas($scope.totalIdeasToDisplay);
    });

    $rootScope.$on('castVote', function() {
      $timeout(function() {
        $scope.displayIdeas = $Ideas.getDisplayIdeas($scope.totalIdeasToDisplay);
      }, 2000);
    });

    $scope.delete = function(index, idea) {
      $Ideas.delete(index, idea)
      .then(function() {
        $scope.displayIdeas = $Ideas.getDisplayIdeas($scope.totalIdeasToDisplay);
      })
    }

  }]);
