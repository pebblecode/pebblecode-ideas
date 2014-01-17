angular.module('pebbleidea')
  .controller('IdeasCtrl',
  ['$scope', '$rootScope', '$Ideas',
  function($scope, $rootScope, $Ideas) {
    'use strict';

    $scope.totalIdeasToDisplay = 4;

    $scope.displayIdeas = [];

    $rootScope.$on('dataLoaded', function() {
      $scope.displayIdeas = $Ideas.getDisplayIdeas($scope.totalIdeasToDisplay);
    });

    $rootScope.$on('castVote', function() {
      $scope.displayIdeas = $Ideas.getDisplayIdeas($scope.totalIdeasToDisplay);
    });

  }]);
