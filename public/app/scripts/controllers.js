var objects = [{

}];
angular.module('fitness2Uapp')
  .controller('homeController', ['$scope', 'typeFactory', function($scope, typeFactory) {
      $scope.wOD = {};
      $scope.sWO = [];
      $scope.aWO = [];
      $scope.fWO = [];
  }])
  .controller('addController', ['$scope', 'addFactory', function($scope, addFactory) {
      var newWO = {};
      $scope.name = "";
      $scope.description = "";
      $scope.duration = "";
      $scope.intensity = "";
      $scope.longdesc = "";
      $scope.submit = function() {
        newWO = {
          "name": $scope.name,
          "description": $scope.description,
          "duration": $scope.duration,
          "intensity": $scope.intensity,
          "longdesc": $scope.longdesc
        }
        console.log(newWO);
        $scope.name = "";
        $scope.description = "";
        $scope.duration = "";
        $scope.intensity = "";
        $scope.longdesc = "";
      }
  }])
  .controller('browseController', ['$scope', 'typeFactory', function($scope, typeFactory) {
      $scope.wOs = [];
  }])
  .controller('workoutDetailController', ['$scope', 'workoutFactory', function($scope, workoutFactory) {
      $scope.wO = {};
  }]);
