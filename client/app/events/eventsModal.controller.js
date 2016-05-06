(function () {
  'use strict';

  angular
    .module('baby.events',[])
    .controller('EventsModalCtrl', EventsModalCtrl);

  function EventsModalCtrl(events,moment,$uibModal,$modal) {

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }



}();