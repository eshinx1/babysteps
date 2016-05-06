(function () {
  'use strict';

  angular
    .module('baby')
    .factory('events', events);

    function events($http, $uibModal) {
      var service = {
        show: show
      };
      return service;

      function show(action, event) {
        return $uibModal.open({
          templateUrl: 'modalContent.html',
          controller: function() {
            var vm = this;
            vm.action = action;
            vm.event = event;
          },
          controllerAs: 'vm'
        });
      }



    }
})();