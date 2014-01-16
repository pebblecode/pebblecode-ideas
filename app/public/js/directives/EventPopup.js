angular.module('pebbleidea')
  .directive('eventPopup', ['$rootScope', '$animate', '$timeout', function($rootScope, $animate, $timeout) {
    return {
      require: ['ngModel'],
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/event-popup.html',
      scope: {
        trigger: '='
      },
      controller: function($scope, $element, $attrs) {

        console.log($attrs);

        $scope.img = $attrs.img;
        $scope.display = $attrs.display;

        $scope.$watch('trigger', function(newValue, oldValue) {

          if (newValue !== oldValue) {
            $animate.addClass($element, 'hide', function() {
              $scope.img = newValue.img;
              $scope.display = newValue.display;

              $animate.removeClass($element, 'hide', function() {
                $timeout(function() {

                  $animate.addClass($element, 'hide', function() {
                    $scope.img = $attrs.img;
                    $scope.display = $attrs.display;

                    $animate.removeClass($element, 'hide');
                  });

                }, 3000);
              });
            });
          }

        });
      }
    };
  }]);