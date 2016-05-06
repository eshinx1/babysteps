(function () {
  'use strict';

  angular
    .module('baby.events')
    .config(config);

    function config($stateProvider) {
      $stateProvider
        .state('events', {
          url: '/events',
          views: {
            '': {
              templateUrl: 'app/events/events.modal.html',
              controller: 'EventsCtrl as events'
            }
          },
          data: {
          requiredLogin: true
          }
        });
    }
})();