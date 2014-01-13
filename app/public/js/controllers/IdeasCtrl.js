angular.module('pebbleidea')
  .controller('IdeasCtrl', [
    '$scope', '$rootScope', '$Primus', '$Ideas', '$modal', 'toaster',
    function($scope, $rootScope, $Primus, $Ideas, $modal, toaster) {

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

      // Open a modal instance to add an new idea from the front end
      var modalInstance = $modal.open({
        templateUrl: 'add-new-idea-form.html',
        controller: AddIdeaCtrl
      });

      // Get the result form and pass to the ideas service
      modalInstance.result.then(function(form) {
        $Ideas.add(form);
      });
    };

    $scope.castVote = function(vote, id) {
      $Primus.send('castVote', {
        vote: vote,
        id: id
      }, function(docs) {

        //if (vote === 'Yes') {
          toaster.pop('success', "Vote Cast", "Your vote has been cast");
        //}

        if ($scope.currentIdeaIndex++ >= $scope.ideas().length - 1) {
         $scope.currentIdeaIndex = 0;
        }  
      });
    }

    $scope.$on('insert', function() {
      toaster.pop('note', "A new idea has been added", "You can now vote on this new idea");
    })


  }]);