angular.module('pebbleidea')
  .controller('VoteCtrl',
  ['$scope', '$rootScope', '$Vote', '$Ideas', '$timeout',
  function($scope, $rootScope, $Vote, $Ideas, $timeout) {

    $scope.voteItem = {};

    $rootScope.$on('dataLoaded', function() {
      $scope.voteItem = $Ideas.getCurrentVoteItem();
    });

    $scope.voteYes = function() {
      // We need to register the vote cast
      $Vote.castVote({ vote: 'Yes', idea: $scope.voteItem})
      .then(function() {
        $Ideas.nextVoteItem();
        $rootScope.$emit('castVote', { vote: 'Yes', idea: $scope.voteItem});
        $scope.voteItem = $Ideas.getCurrentVoteItem();
      });
    }

    $scope.voteNo = function() {
      // We need to register the vote cast
      $Vote.castVote({ vote: 'No', idea: $scope.voteItem})
      .then(function() {
        $Ideas.nextVoteItem();
        $rootScope.$emit('castVote', { vote: 'No', idea: $scope.voteItem});
        $scope.voteItem = $Ideas.getCurrentVoteItem();
      });
    }

    $scope.skipVoteNext = function() {
      $Ideas.nextVoteItem();
      $rootScope.$emit('castVote');
      $scope.voteItem = $Ideas.getCurrentVoteItem();
    }

    $scope.skipVotePrev = function() {
      $Ideas.prevVoteItem();
      $rootScope.$emit('castVote');
      $scope.voteItem = $Ideas.getCurrentVoteItem();
    }

  }]);
