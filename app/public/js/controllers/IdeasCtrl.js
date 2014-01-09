angular.module('pebbleidea')
  .controller('IdeasCtrl', ['$scope', '$rootScope', '$Primus', '$Ideas', '$modal', function($scope, $rootScope, $Primus, $Ideas, $modal) {


    $scope.ideas = $Ideas.get;

    $scope.addNewIdea = function() {
      var modalInstance = $modal.open({
        templateUrl: 'add-new-idea-form.html',
        controller: AddIdeaCtrl
      });

      modalInstance.result.then(function(form) {
        console.log(form);
        
        var newIdea = {
          submittedBy: form.newIdeaName,
          text: form.newIdeaText,
          votesYes: 0,
          votesNo: 0
        };

        $Ideas.add(newIdea);

      });
    }


  }]);