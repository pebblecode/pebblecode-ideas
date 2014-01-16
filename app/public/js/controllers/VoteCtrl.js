angular.module('pebbleidea')
  .controller('VoteCtrl',
  ['$scope', '$rootScope', '$Vote', '$Ideas', '$timeout',
  function($scope, $rootScope, $Vote, $Ideas, $timeout) {

    // We always start at the beginning of the available ideas
    $scope.voteItemIndex = $Ideas.getCurrentVoteIndex();

    $scope.voteItem = {};

    $scope.voteCast = false;

    $scope.votedYes = false;
    $scope.votedNo = false;


    $scope.getVoteItem = function() {
      return $scope.voteItem;
    }

    $scope.nextIdea = function() {
      $Ideas.nextVoteIndex();
      $scope.voteItemIndex = $Ideas.getCurrentVoteIndex();
    }

    $scope.previousIdea = function() {
      $Ideas.prevVoteIndex;
      $scope.voteItemIndex = $Ideas.getCurrentVoteIndex();
    }

    $scope.voteYes = function() {
      $rootScope.$emit('castVote', { vote: 'Yes', idea: $scope.voteItem});
      $scope.voteCast = true;
      $scope.votedYes = true;
      $timeout(function() {
        $scope.nextIdea();
        $scope.voteCast = false;
        $scope.votedYes = false;
      }, 2000);
    }

    $scope.voteNo = function() {
      $rootScope.$emit('castVote', { vote: 'No', idea: $scope.voteItem});
      $scope.voteCast = true;
      $scope.votedNo = true;
      $timeout(function() {
        $scope.nextIdea();
        $scope.voteCast = false;
        $scope.votedNo = false;
      }, 2000);
    }


    $scope.$watch('voteItemIndex', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.voteItem = $Ideas.getIdea($scope.voteItemIndex);
      }
    });

    $rootScope.$on('dataLoaded', function() {
      $scope.voteItem = $Ideas.getIdea($scope.voteItemIndex);
    })


  }]);
