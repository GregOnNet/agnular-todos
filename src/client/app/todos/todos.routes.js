(function() {
  'use strict';

  angular
   .module('todo')
   .config(routes);

  routes.$inject = ['$routeProvider'];

  function routes($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'todos.html',
        controller: 'TodosController',
        controllerAs: 'todos'
      });
  }
}());
