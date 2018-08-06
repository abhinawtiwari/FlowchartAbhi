'use strict';

angular.module('FCApp', [
  'ngRoute',
  'FCApp.view1',
  'FCApp.view2'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
