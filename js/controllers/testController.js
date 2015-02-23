
mcqApp.controller('testController', function($scope,service,mcqConst,$window) {
    
 $scope.testData = null;
 $scope.baseUrl = mcqConst.baseUrl;
 $scope.resourceUrl = mcqConst.resourceUrl;
 $scope.currentQuesIndex = 0;
 $scope.navStatus = [];
 $scope.userResponse = {};
 $scope.remainingTime = "";
 $scope.showReviewBtn = false;
 
  $scope.$on('$viewContentLoaded',function(event){
              $scope.getData("data/orig_q_data.json");
         });
  
   $scope.getData = function(url){
     /*  var successCallback = function(data){
             console.log("success :: ", data);        
            $scope.testData = data;
            $scope.init(data);
            $scope.showQuestion($scope.currentQuesIndex);
            setTimeout(function() {
                $scope.rendered();
            }, 100);
           
       };
       
       var errorCallback = function(){
            console.log("Error in fetching json data. ");
           
       };
       var options = {
           url:url,
           successCallback:successCallback,
           errorCallback:errorCallback
       };
     
       service.getJSON(options)
       
     */
	 
	 
	  alert("questionData :::::  ",questionData)
	 $scope.testData = questionData;
            $scope.init(questionData);
            $scope.showQuestion($scope.currentQuesIndex);
            setTimeout(function() {
                $scope.rendered();
            }, 100);

	};

$scope.init = function(data) {
       
 
          $scope.userResponse = {
                "title":  data.title,
                "Services":  data.Services,
                "testType": data.testType,
                 "timeDuration": data.timeDuration,
                 "timeTaken": "",
                 "level":  data.level,
                 "userData" : []
         };
       /* if(localStorage.getItem("em_mcq_"+mcqConst.userId)){
            $scope.userResponse=JSON.parse(localStorage.getItem("em_mcq_"+mcqConst.userId));
        }
        
       /* if(localStorage.getItem("em_mcq_"+mcqConst.userId)){
            $scope.userResponse = JSON.parse(localStorage.getItem("em_mcq_"+mcqConst.userId));
        }else{
           localStorage.setItem("em_mcq_"+mcqConst.userId, JSON.stringify($scope.userResponse));
         
        }*/
        localStorage.setItem("em_mcq_"+mcqConst.userId, JSON.stringify($scope.userResponse));
        
        $scope.remainingTime = (data.timeDuration).toString();
        angular.forEach(data.data, function(item, index) {
            $scope.navStatus[index] = {
                "skipped": false,
                "attempted": false,
                "active": false,
                "disabled": true

            };
            
             $scope.userResponse.userData.push({  
                 "questionid": item.questiondata.questionid,
                 "answerIds": []
             });
        });

    };
    
    
    $scope.rendered = function() {

        $scope.navStatus[$scope.currentQuesIndex].disabled = false;
        $scope.navStatus[$scope.currentQuesIndex].active = true;

        $scope.Timer($scope.remainingTime);
    };

    $scope.showQuestion = function(index, e) {
        if (index != 0 && index == $scope.currentQuesIndex) {
            return;
        }
        var enabled = false;
        if (typeof e == "object") {
            if (e.target.classList.contains("disabled")) {
                return;
            }
            enabled = true;

        } else {
            enabled = true;
        }
        if (!enabled) {
            return;
        }
        $scope.prevBtnDisabled = (index == 0) ? true : false;
        $scope.nextBtnDisabled = (index == $scope.testData.data.length - 1) ? true : false;

     if(index == $scope.testData.data.length){
         
          $scope.showResult();
     }

        if (index >= 0 && index < $scope.testData.data.length) {

            console.log("showQuestion :: " + index);

            angular.forEach($scope.navStatus, function(nav) {
                nav.active = false;
            });

            $scope.navStatus[index].disabled = false;
            $scope.navStatus[index].active = true;
           
            
            $scope.SaveResponse($scope.currentQuesIndex);
            $scope.handleNavItem($scope.currentQuesIndex);
            $scope.currentQues = $scope.testData.data[index];
            $scope.currentQuesIndex = index;

            if ($scope.userResponse.userData[index].answerIds.length != 0) {
                var answerIds = $scope.userResponse.userData[index].answerIds;
                setTimeout(function() {
                    angular.forEach(answerIds, function(id) {
                        $('#option_' + id).attr("checked", "checked");
                    });
                }, 100);

            }

        }

    };
    $scope.selectOption = function(e){
        var node = e.target;
        var elem;
       if(node.tagName == "LI"){
           elem = $(node).find("input");
       }
       else if (node.tagName == "INPUT"){
         elem = $(node);
        } else {
           node = node.parentNode;
            if(node.tagName != "LI"){
              node = node.parentNode;
              
            } 
            elem = $(node).find("input");
        }
        
        $(elem).prop( "checked", true );
    };
    $scope.SaveResponse = function(index) {
        

        var selectedAns = $('input[name=options]:checked');
        if (selectedAns.length != 0) {
       
        var ansArray = [];
         angular.forEach(selectedAns, function(elem) {
            var id = parseInt($(elem).attr("id").split("option_")[1]);        
            this.push(id);         
        }, ansArray);
      
        $scope.userResponse.userData[index].answerIds = ansArray;           
        $scope.showReviewBtn = true;
            
        }
        localStorage.setItem("em_mcq_"+mcqConst.userId, JSON.stringify($scope.userResponse));
        
    };

    $scope.showPrevQ = function() {
        $scope.showQuestion($scope.currentQuesIndex - 1, true);

    };
    $scope.showNextQ = function() {

        $scope.handleNavItem($scope.currentQuesIndex);
        $scope.showQuestion($scope.currentQuesIndex + 1, true);

    };
    $scope.handleNavItem = function(index) {

         if ($scope.userResponse.userData[index].answerIds.length != 0){

            $scope.navStatus[index].skipped = false;
            $scope.navStatus[index].attempted = true;

        } else {
            $scope.navStatus[index].skipped = true;
            $scope.navStatus[index].attempted = false;
        }
        $scope.navStatus[index].disabled = false;



    }
  ;
    $scope.Timer = function(minutes) {
        var remainingTime = parseInt(minutes) * 60 * 1000;
        var timerId = setInterval(function() {
            remainingTime -= 1000;
            var min = Math.floor(remainingTime / (60 * 1000));
            var sec = Math.floor((remainingTime - (min * 60 * 1000)) / 1000);

            if (remainingTime < 0) {
                alert("Time Up");
                clearInterval(timerId);
                $scope.showResult();
            } else {
                $scope.remainingTime = min + ":" + sec;
                 $scope.$apply();
            }

        }, 1000);

    };
    
     $scope.showReview = function() {
       
       
        var reviewData = [];
   
      
            angular.forEach($scope.userResponse.userData, function(item,index) {
                var ques = $scope.testData.data[index].questiondata.question;
                if(!$scope.navStatus[index].disabled){
                    
                
                if(item.answerIds.length == 0 ){
                    var ans = "skipped"; 
                }
                else{
                
                var ans = "";
                angular.forEach(item.answerIds, function(id) {
                     ans  += _.findWhere($scope.testData.data[index].optiondata.options, {optionid: parseInt(id)}).optiontext + " <br />";
                    
                    
                });
                }
                
              
                  reviewData.push({
                     "ques" : ques,
                     "ans" :ans
                  });
                  
                }
      
            },reviewData);
            
         service.setReviewData(reviewData);
         
         //$window.open(mcqConst.baseUrl+"#/review",'_blank',"height=600,width=1000");
         window.open(mcqConst.baseUrl+"#/review");
     // location.hash  = "review";

    } ;
    
     $scope.showResult = function() {
        $scope.SaveResponse($scope.currentQuesIndex);
        $scope.userResponse.timeTaken = $scope.remainingTime;
        localStorage.setItem("em_mcq_"+mcqConst.userId, JSON.stringify($scope.userResponse));
		
		 
		 service.setReportData(reportData); 
window.open(mcqConst.baseUrl+"#/report");
          //  location.hash  = "report";
            //localStorage.removeItem("em_mcq_"+mcqConst.userId);
        
        /* var successCallback = function(data){
            service.setReportData(data); 
            location.hash  = "report";
            localStorage.removeItem("em_mcq_"+mcqConst.userId);
           
       };
       
       var errorCallback = function(){
             alert("Error in saving and fetching data");
           
       };
       var options = {
           url: mcqConst.baseUrl+"/data/reportData.json",
           data: $scope.userResponse,
           successCallback:successCallback,
           errorCallback:errorCallback
       };
     
       service.getJSON(options)
       
   */
        

    };
        
});
