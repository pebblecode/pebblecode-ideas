angular.module('pebbleidea')
  .controller('IdeasCtrl', ['$scope', '$rootScope', '$Primus', '$Ideas', '$modal', function($scope, $rootScope, $Primus, $Ideas, $modal) {

    $scope.currentIdeaIndex = 0;

    $scope.ideas = $Ideas.get;

    $scope.currentIdea = function() {
      return $scope.ideas()[$scope.currentIdeaIndex];
    }

    $scope.filterCurrentID = function(item) {
      if ($scope.currentIdeaIndex === $scope.ideas().indexOf(item)) {
        return false;
      }

      return true;
    }

    $scope.reverse = function(array) {
        var copy = [].concat(array);
        return copy.reverse();
    }

    $scope.addNewIdea = function() {
      var modalInstance = $modal.open({
        templateUrl: 'add-new-idea-form.html',
        controller: AddIdeaCtrl
      });

      modalInstance.result.then(function(form) {

        var newIdea = {
          submittedBy: form.newIdeaName,
          text: form.newIdeaText,
          votesYes: 0,
          votesNo: 0
        };

        $Ideas.add(newIdea);

      });
    };

    $scope.castVote = function(vote, id) {
      console.log(vote, id);

      $Primus.send('castVote', {
        vote: vote,
        id: id
      }, function(docs) {
        console.log(arguments);
        if ($scope.currentIdeaIndex++ >= $scope.ideas().length) {
         $scope.currentIdeaIndex = 0;
        }  
      });
    }


  }]);