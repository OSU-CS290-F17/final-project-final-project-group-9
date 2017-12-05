'use strict';
var app = angular.module("fitness2Uapp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
      .when("/", {
          templateUrl : "./app/views/home.html"
      })
      .when("/browse", {
          templateUrl : "./app/views/browse.html"
      })
      .when("/add", {
          templateUrl : "./add.html"
      })
      .when("/workout", {
          templateUrl : "./app/views/workout.html"
      });
});
