
mcqApp.controller('reportController', function($scope,$window,service,mcqConst) {
	$scope.baseUrl = mcqConst.baseUrl;	
	$scope.resourceUrl = mcqConst.resourceUrl;
      $scope.$on('$viewContentLoaded',function(event){
          $scope.reportData =  service.getReportData();
          $scope.createReportChart();
      });            
      
          $scope.createReportChart = function() {
          var pieData = [
            {
                value: $scope.reportData.testResultData.correct,
                color:"#2C6085"
                
            },
            {
                value :$scope.reportData.testResultData.incorrect,
                color : "#D01F3C"
                
            },
            {
                value : $scope.reportData.testResultData.skipped,
                color : "#FB9EA6"
                
            }
        
        ];
                  
    var options={
        segmentShowStroke : true,
        animation : true,
        scaleShowLabels : true
        };
      var myPie = new Chart(document.getElementsByClassName("report-canvas")[0].getContext("2d")).Pie(pieData,options);


    };
   
      $scope.showAttemptedQuestion = function(index){
          var data = {
           "title": $scope.reportData.title,
           "testType": $scope.reportData.testType,
           "level":$scope.reportData.level,
           "questionDetails" : $scope.reportData.testdata[index]
          };
          
     
        service.setAttemptDetails(data);
       //$window.open(mcqConst.baseUrl+"#/userAttemptedQues",'_blank',"height=600,width=1000");
        window.open(mcqConst.baseUrl+"#/userAttemptedQues");
    };
    $scope.getUserAnswer = function(index){
       var orderIds =   $scope.reportData.testdata[index].resultdata.orderIds;
       if(orderIds.length == 0){
           return "N/A";
       }
       var str = "";
       angular.forEach(orderIds,function(id,indx){
           str += String.fromCharCode(97+id);
           if(indx< (orderIds.length - 1)){
               str += ",";
           }
       });
       
       return str;
    };
                
     $scope.closeResult = function() {
       $window.close();

    };
	});
	

