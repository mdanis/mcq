
  mcqApp.controller('userAttemptedQuesController', function($scope,$window,service,mcqConst) {
  $scope.baseUrl = mcqConst.baseUrl;
  $scope.resourceUrl = mcqConst.resourceUrl;
    $scope.$on('$viewContentLoaded',function(event){
          $scope.data =  service.getAttemptDetails();         
    }); 
      
$scope.getYourAns = function(){
    var ques =$scope.data.questionDetails;
    var ansIds = ques.resultdata.answerIds;
     var ansStr = "<b>Your Answer : </b>";
    if(ansIds.length == 0) {
        ansStr = "skipped";
    }
   else{
     angular.forEach(ansIds, function(id,index) {
       ansStr += (index+1) + ". ";
       ansStr  += _.findWhere(ques.optiondata.options, {optionid: parseInt(id)}).optiontext + " <br />";
                    
       
        },ansStr);$scope.resourceUrl = mcqConst.resourceUrl;
        
      }
        return ansStr;
        
};

$scope.getCorrectAns = function(){
 var ques = $scope.data.questionDetails;
   var ansStr  = "<b>Right Answer : </b>";
   
     angular.forEach(ques.rightanswerdata.rightanswer, function(item,index) {
       ansStr += (index+1) + ". ";
       ansStr  += item.answer + " <br />";
                    
       
        },ansStr);
        
      
        return ansStr;
};

$scope.closeWindow = function(){
    $window.close();
};
  
  
  
	});
	

