angular.module('pebbleidea')
  .controller('VoteCtrl',
  ['$scope', '$rootScope', '$Vote', '$Ideas', '$timeout',
  function($scope, $rootScope, $Vote, $Ideas, $timeout) {

    $scope.voteItem = {};

    $scope.voteType = true;

    $rootScope.$on('dataLoaded', function() {
      $scope.voteItem = $Ideas.getCurrentVoteItem();
    });

    $scope.voteYes = function() {
      // We need to register the vote cast
      $scope.voteType = 'yes-vote';
      $Vote.castVote({ vote: 'Yes', idea: $scope.voteItem})
      .then(function() {
        $Ideas.nextVoteItem();
        $rootScope.$emit('castVote', { vote: 'Yes', idea: $scope.voteItem});
        $scope.voteItem = $Ideas.getCurrentVoteItem();
        $timeout(function() {
          $scope.voteType = '';
        }, 2000);

      });
    }

    $scope.voteNo = function() {
      // We need to register the vote cast
      $scope.voteType = 'no-vote';
      $Vote.castVote({ vote: 'No', idea: $scope.voteItem})
      .then(function() {
        $Ideas.nextVoteItem();
        $rootScope.$emit('castVote', { vote: 'No', idea: $scope.voteItem});
        $scope.voteItem = $Ideas.getCurrentVoteItem();
        $timeout(function() {
          $scope.voteType = '';
        }, 2000);
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
