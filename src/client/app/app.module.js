(function() {
  'use strict';

  angular
    .module('todos', [
      'ngMaterial',
      'ngRoute',
      'dndLists',
      'board',
      'todos.api',
      'todos.services']);
}());
