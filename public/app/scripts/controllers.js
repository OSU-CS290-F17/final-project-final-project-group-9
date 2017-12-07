var objects = [{

}];
angular.module('fitness2Uapp')
  .controller('homeController', ['$scope', '$http', function($scope, $http) {
      $http.get('/data/type/0')
        .success(function (data, status, headers, config) {
            $scope.sWOs = data;
            $scope.wOD = data[0];
            $scope.sWOs = $scope.sWOs.slice(0,3);
        })
        .error(function (data, status, header, config) {});
      $http.get('/data/type/1')
        .success(function (data, status, headers, config) {
            $scope.aWOs = data;
            $scope.aWOs = $scope.aWOs.slice(0,3);
      })
        .error(function (data, status, header, config) {});
      $http.get('/data/type/2')
        .success(function (data, status, headers, config) {
          $scope.fWOs = data;
          $scope.fWOs = $scope.fWOs.slice(0,3);
        })
        .error(function (data, status, header, config) {});
  }])
  .controller('addController', ['$scope', '$http', function($scope, $http) {
      var newWO = {};
      $scope.name = "";
      $scope.description = "";
      $scope.duration = "";
      $scope.intensity = "";
      $scope.longdesc = "";
      $scope.id = "";
      $scope.img = "";
      $scope.submit = function() {
        newWO = {
          "img": $scope.img,
          "type": $scope.id,
          "name": $scope.name,
          "description": $scope.description,
          "duration": $scope.duration,
          "intensity": $scope.intensity,
          "longdesc": $scope.longdesc
        }
        $http.post('/data/new', newWO)
          .success(function (data, status, headers, config) {
            $scope.name = "";
            $scope.description = "";
            $scope.duration = "";
            $scope.intensity = "";
            $scope.longdesc = "";
            $scope.id = "";
            $scope.img = "";
          })
          .error(function (data, status, header, config) {});
      }
  }])
  .controller('browseController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
      var id = parseInt($routeParams.id,10);
      $scope.type = ''
      if (id == 0) {
        $scope.type = 'Strength';
      }else if (id == 1) {
        $scope.type = 'Aerobic';
      }else {
        $scope.type = 'Flexibility';
      }
      $http.get('../data/type/' + id)
        .success(function (data, status, headers, config) {
            $scope.wOs = data;
        })
        .error(function (data, status, header, config) {});
  }])
  .controller('workoutDetailController', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http) {
      var id = parseInt($routeParams.id,10);
      $http.get('/data/' + id)
        .success(function (data, status, headers, config) {
          $scope.wO = data
        })
        .error(function (data, status, header, config) {});
  }]);
