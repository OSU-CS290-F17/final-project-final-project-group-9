'use strict';
var app = angular.module("fitness2Uapp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
    $routeProvider
      .when("/", {
          templateUrl : './app/views/home.html'
      })
      .when("/browse/:id", {
          templateUrl : './app/views/browse.html'
      })
      .when("/add", {
          templateUrl : './app/views/add.html'
      })
      .when("/workout/:id", {
          templateUrl : './app/views/workout.html'
      })
      .otherwise({
          templateUrl : './app/views/home.html'
      });
});
