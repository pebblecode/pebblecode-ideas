angular.module('pebbleidea')
  .directive('ideaVote', ['$animate', '$timeout', function($animate, $timeout) {
    return {
      require: ['ngModel'],
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/idea-vote.html',
      scope: {
        idea: '='
      },
      controller: function($scope, $element) {

        $element.addClass('slide-vote');

        $scope.castVote = function(vote, id) {
          

          if (vote === 'Yes') {
            $animate.addClass($element, 'yes-vote', function() {

              $scope.$emit('castVote', { vote: vote, idea: $scope.idea});

              $animate.removeClass($element, 'yes-vote');
            });

          } else {
            $animate.addClass($element, 'no-vote', function() {
              $scope.$emit('castVote', { vote: vote, idea: $scope.idea});

              $animate.removeClass($element, 'no-vote');
            });
          }
        };

      }
    }
  }]);