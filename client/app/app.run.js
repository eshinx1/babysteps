(function () {
  'use strict';

  angular
    .module('baby')
    .run(run);

  function run($http, $state, auth) {
    if (auth.current().token) {
      // Append authentication information to each http request
      $http.defaults.headers.common.username = auth.current().username;
      $http.defaults.headers.common.token = auth.current().token;

      $state.go('dashboard');
    } else {
        $state.go('landing');
      }
  }
})();

