var app = angular.module('fitness2Uapp', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./home.html"
    })
    .when("/browse/:id", {
        templateUrl : "./browse.html"
    })
    .when("/workout/:id", {
        templateUrl : "./workout.html"
    })
    .when("/add", {
        templateUrl : "./add.html"
    })
    .otherwise({
        templateUrl : "./home.html"
    });
});
