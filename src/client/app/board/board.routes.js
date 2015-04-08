(function() {
  'use strict';

  angular
   .module('board')
   .config(routes);

  routes.$inject = ['$routeProvider'];

  function routes($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/board/board.html',
        controller: 'BoardController',
        controllerAs: 'board'
      });
  }
}());
