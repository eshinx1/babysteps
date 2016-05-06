(function () {
  'use strict';

  angular
    .module('baby', [
      /* Shared Modules */
      'ui.router',
      'ngStorage',
      'mwl.calendar',
      'ui.bootstrap',

      'ngAnimate',

      /* Feature areas */
      'baby.landing',
      'baby.signup',
      'baby.login',
      'baby.dashboard',
      'baby.milestone',
      'baby.about',
      'baby.tech',
      'baby.events'
    ]);
})();

