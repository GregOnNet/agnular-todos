angular
  .module('todos.services', [])
  .factory('todoApi', todoApi);

todoApi.$inject = ['$http', '$mdToast'];

function todoApi($http, $mdToast) {

  return {
    create : create
  };

  function create(todo) {
    return $http.post('/api/create', todo)
      .success(postSucceeded)
      .catch(postFailed);

    function postSucceeded(data) {
      $mdToast.show(
        $mdToast.simple()
          .content(data)
          .position('top right'));
    }

    function postFailed(err) {
      console.log(err);
    }
  }
}
