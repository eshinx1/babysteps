(function(){
  'use strict';

  angular
    .module('baby.dashboard')
    .controller('DashboardCtrl', DashboardCtrl);
    function DashboardCtrl($state, $uibModal, dashboard){
      var vm = this;

      vm.displayChildren = displayChildren;
      vm.displayUsers = displayUsers;
      vm.removeChild = removeChild;
      vm.open = open;
      vm.edit = edit;

      function displayChildren() {
        dashboard.getUser()
          .then(function(data){
            var userObj = data.data[0];
            console.log('data', data);
            vm.children = userObj.children;
             console.log('chillun', vm.children);
          });
      }

      function edit() {
        vm.modalInstance = $uibModal.open({
          templateUrl: 'app/editChild/editChild.html',
          controller: 'EditChildCtrl as myChild'
        });
      }

      function open() {
        vm.modalInstance = $uibModal.open({
          templateUrl: 'app/child/child.html',
          controller: 'ChildController as child'
        });
      }

      function displayUsers() {
        dashboard.getUser()
          .then(function(data){
            var userObj = data.data;
            vm.users = userObj;
          });
      }

      function removeChild(childFirstName) {
        console.log('on click this is passed into removeChild', childFirstName);
        dashboard.removeThisChild(childFirstName, 'chend2');
      }


    }

})();
