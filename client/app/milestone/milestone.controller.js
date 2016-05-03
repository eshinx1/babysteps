(function () {
  'use strict';

  angular
    .module('baby.milestone',[])
    .controller('MilestoneCtrl', MilestoneCtrl);

  function MilestoneCtrl ($state, milestone, $scope) {


    var vm = this;
    // Functions
    vm.displayCondition = displayCondition;

    vm.number =  60;

    function displayCondition () {


      milestone.getCondition(vm.condition)
        .then(function(data) {
          var conditionData = data.data[0];
          vm.conditionGrossMotorFirst = ((conditionData.grossMotor.crawls[0])/24)*100;
          vm.conditionGrossMotorLast = ((conditionData.grossMotor.crawls[1])/24)*100;
          vm.conditionGrossMotorMiddle = vm.conditionGrossMotorLast - vm.conditionGrossMotorFirst;


          vm.conditionPersonalSocial = conditionData.personalSocial;
          vm.conditionLanguage = conditionData.language;
          // console.log('This is data object',vm.conditionData);
          // console.log('This is grossMotor',vm.conditionGrossMotor);
          // console.log('This is personalSocial',vm.conditionPersonalSocial);
          // console.log('This is grossMotor crawls at start',vm.conditionGrossMotorFirst);
          console.log('This is personalSocial',vm.conditionPersonalSocial);
          // console.log('This is language',vm.conditionLanguage);
        });
    }

  //   $scope.max = 200;

  // $scope.random = function() {
  //   var value = Math.floor(Math.random() * 100 + 1);
  //   var type;

  //   if (value < 25) {
  //     type = 'success';
  //   } else if (value < 50) {
  //     type = 'info';
  //   } else if (value < 75) {
  //     type = 'warning';
  //   } else {
  //     type = 'danger';
  //   }

  //   $scope.showWarning = type === 'danger' || type === 'warning';

  //   $scope.dynamic = value;
  //   $scope.type = type;
  // };

  // $scope.random();

  // $scope.randomStacked = function() {
  //   $scope.stacked = [];
  //   var types = ['success', 'info', 'warning', 'danger'];

  //   for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
  //       var index = Math.floor(Math.random() * 4);
  //       $scope.stacked.push({
  //         value: Math.floor(Math.random() * 30 + 1),
  //         type: types[index]
  //       });
  //   }
  // };

  // $scope.randomStacked();





  }
})();

