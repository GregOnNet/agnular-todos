(function() {
  "use strict";

  angular
    .module('board')
    .controller('BoardController', BoardController);

    BoardController.$inject = ['$scope'];
    function BoardController($scope) {
      var vm = this;

      vm.newItem = {};
      vm.isInEditMode = false;

      vm.lists = {
        new : {
          items : [],
          selected : null
        },
        processing : {
          items : [],
          selected : null
        }
      };

      vm.categories = [];

      vm.create = create;
      vm.toggleEditMode = toggleEditMode;

      initItems();

      $scope.$watchCollection(function() { return vm.lists.new.items; }, updateItemPosition);
      $scope.$watchCollection(function() { return vm.lists.processing.items; }, updateItemPosition);

      function updateItemPosition(changedList) {

        for(var i = 0; i < changedList.length; i++) {
          changedList[i].position = i;
        }
      }

      function initItems() {
        for( var i = 1; i <= 5; i++) {
          vm.lists.new.items.push({ 'id' : getRandomInt(), 'room' : 'B43' + i, 'problem' : i + '. Monitor broken!'});
          vm.lists.processing.items.push({ 'id': getRandomInt(), 'room' : 'A43' + i, 'problem' : i + '. Monitor broken!'});

          vm.categories.push({ 'id': getRandomInt(), 'name': 'Kategorie ' + i});
        }
      }

      function create(item) {
        vm.lists.new.items.unshift(item);
        vm.newItem = {};

        vm.isInEditMode = false;
      }

      function toggleEditMode() {
        vm.isInEditMode = !vm.isInEditMode;
      }

      // Returns a random integer between min (included) and max (excluded)
      // Using Math.round() will give you a non-uniform distribution!
      function getRandomInt() {
        return Math.floor(Math.random() * (9999 - 1)) + 1;
      }
    }
}());
