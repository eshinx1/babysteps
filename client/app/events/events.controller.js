(function () {
  'use strict';

  angular
    .module('baby.events',[])
    .controller('EventsCtrl', EventsCtrl);

  function EventsCtrl(events,moment,$uibModal,$modal) {

        var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    vm.calendarTitle = 'Baby Events!';
    vm.events = [
      {
        title: 'My event title', // The title of the event
        type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
        startsAt: new Date(2013,5,1,1), // A javascript date object for when the event starts
        endsAt: new Date(2014,8,26,15), // Optional - a javascript date object for when the event ends
        editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
        deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
        draggable: true, //Allow an event to be dragged and dropped
        resizable: true, //Allow an event to be resizable
        incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
        recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
        cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
      }
    ];
    vm.show = show;
    vm.isCellOpen = true;

    vm.eventClicked = function() {
      console.log('event is clicked');
      // events.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
      console.log('event is edited');
      events.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      console.log('event is edited');
      events.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      console.log('event time changed');
     events.show('Dropped or resized', event);
    };

    vm.open = function () {

      var modalInstance = $modal.open({
        templateUrl: 'app/events/events.modal.html',
        controller: 'EventsModalCtrl as eventsmodal'
      });

    };
// function show(action, event) {
//         return $uibModal.open({
//           templateUrl: 'events.modal.html',
//           controller: function() {
//             var vm = this;
//             vm.action = action;
//             vm.event = event;
//           },
//           controllerAs: 'vm'
//         });
//       }
// ar app = angular.module('demo', ['ui.bootstrap', 'ngAnimate']);

// app.controller('MainCtrl', ['$scope', '$modal', function($scope, $modal){

//   $scope.open = function () {

//     var modalInstance = $modal.open({
//       templateUrl: 'myModalContent.html',
//       controller: 'ModalInstanceCtrl'
//     });

//   };

// }]);

// app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

//   $scope.open = function($event) {
//     $event.preventDefault();
//     $event.stopPropagation();

//     $scope.opened = true;
//   };

//   $scope.cancel = function () {
//     $modalInstance.dismiss('cancel');
//   };
// }]);

    vm.toggle = function($event, field, event) {
      console.log("Calender needs to pop up")
    };

  }
})();