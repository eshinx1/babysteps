(function(){
  'use strict';

  angular
    .module('baby')
    .factory('dashboard', dashboard);

    function dashboard($http,$state){
      var service = {
        getUser: getUser,
        addChild: addChild,
        removeThisChild: removeThisChild,
        goMilestone: goMilestone
      };
      return service;

      function getUser(){
        return $http.get('/dashboard');
      }

      function removeThisChild(childName, userName){
        return $http.post('/dashboard', {firstName: childName, userName: userName});
      }

      function addChild(params){
        return $http.post('/dashboard/addChild', params)
          .success(function(resp){
            console.log('resp', resp);
            console.log('resp.success', resp.success);
          });
      }

      function goMilestone(condition) {
        console.log(condition);
        var conditionObj = {condition: condition};
        $state.go('milestone', conditionObj);
      }
    }
})();