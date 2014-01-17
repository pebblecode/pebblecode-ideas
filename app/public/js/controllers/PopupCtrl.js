angular.module('pebbleidea')
  .controller('PopupCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {

    $scope.newIdea = false;

    $scope.$on('insert', function(event, idea) {
      $scope.newIdea = idea;
      $timeout(function() {
        $scope.newIdea = false;
      }, 5000);
    });

  }]);
