(function () {
  'use strict';

  angular
    .module('baby.events',[])
    .controller('EventsCtrl', EventsCtrl);

  function EventsCtrl($state, events, $uibModal, $scope) {

    // initialize
    var vm = this;

    //functions
    vm.init = init;
    vm.open = open;
    vm.removeEvent = removeEvent;
    vm.editEvent = editEvent;

    $scope.$on('add_event', function(event, data) {

      var events = data.data[0].events;
      console.log('data in add events', events)
          vm.allChildren = data.data[0].children;
      vm.comingEvents = [];
      vm.pastEvents = [];
          for (var i = 0; i < events.length; i++) {
            var today = new Date();
            var eventDates = new Date(events[i].dt);
            if(today < eventDates) {
              vm.comingEvents.push(events[i]);
            } else {
              vm.pastEvents.push(events[i]);
            }
          }
    });

    function init() {
      displayEvents();
    }

    function open(childName, appointment, doctor, dt, location, notes) {
      vm.modalInstance = $uibModal.open({
        templateUrl: 'app/eventAdd/eventAdd.html',
        controller: 'EventsAddCtrl as eventadd',
        resolve: {
            event: function() {
              return [childName, appointment, doctor, dt, location, notes];
            }
          }
      });
    }

    function displayEvents() {
      events.getEvents()
        .then(function(data) {
          console.log("This is display events data",data);
          var events = data.data[0].events;
          vm.allChildren = data.data[0].children;
          vm.comingEvents = [];
          vm.pastEvents = [];
          for (var i = 0; i < events.length; i++) {
            var today = new Date();
            var eventDates = new Date(events[i].dt);
            if(today < eventDates) {
              vm.comingEvents.push(events[i]);
            } else {
              vm.pastEvents.push(events[i]);
            }
          }
        });
    }

    function removeEvent(dt) {
      events.deleteEvent({dt:dt});
      $state.reload('events');
    }

    function editEvent(childName, appointment, doctor, dt, location, notes) {
      vm.modalInstance = $uibModal.open({
        templateUrl: 'app/eventAdd/eventEdit.html',
        controller: 'EventsAddCtrl as eventadd',
        resolve: {
            event: function() {
              return [childName, appointment, doctor, dt, location, notes];
            }
          }
      });
    }

    }
})();