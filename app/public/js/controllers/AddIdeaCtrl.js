var AddIdeaCtrl = function ($scope, $modalInstance) {

  $scope.form = {
    submittedDisplay: '',
    submittedFrom: '+44',
    text: ''
  };

  $scope.ok = function () {
    $modalInstance.close($scope.form);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};