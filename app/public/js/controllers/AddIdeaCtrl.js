var AddIdeaCtrl = function ($scope, $modalInstance) {

  $scope.form = {
    newIdeaName: '',
    newIdeaText: ''
  };

  $scope.ok = function () {
    $modalInstance.close($scope.form);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};