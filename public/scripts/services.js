angular.module('fitness2Uapp')
    .constant("baseURL","http://localhost:3000/")
    .service('typeFactory', ['$resource', function($http) {
        this.getType = function(id){
          $http({
            method: 'GET',
            url: 'localhost:9000/data/type/' + id
            }).then(function successCallback(response) {
              return response.data
            });
        };
    }])
    .service('workoutFactory', ['$http', function($http) {
        this.getOne = function(id){
          $http({
            method: 'GET',
            url: 'localhost:9000/data/' + id
            }).then(function successCallback(response) {
              return response.data
            });
        };
    }])
    .service('addFactory', ['$http', function ($http) {
        this.addOne = function(object) {
          $http({
              url: 'localhost:9000/data/new',
              method: "POST",
              data: object
          })
          .then(function(response) {
              console.log("Successful Add");
          });
        }
    }]);
