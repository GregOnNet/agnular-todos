'use strict';

angular
 .module('todos.api')
 .config(routes);

routes.$inject = ['$routeProvider'];

function routes($routeProvider) {
  $routeProvider
    .when('/api', {
      templateUrl: '/app/api/api.html',
      controller: 'ApiController',
      controllerAs: 'api'
    });
}
