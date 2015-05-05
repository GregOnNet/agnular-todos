angular
  .module('todos.api')
  .controller('ApiController', ApiController);

function ApiController() {
  var vm = this;

  vm.entries = [
    { 'type' : 'GET',
      'route': '/',
      'description': 'My cool get description'},
    { 'type' : 'POST',
      'route': '/post',
      'description': 'My cool post description'},
    { 'type' : 'UPDATE',
      'route': '/update',
      'description': 'My cool update description'},
    { 'type' : 'DELETE',
      'route': '/delete',
      'description': 'My cool delete description'}
  ];
}
