

mcqApp.service('service', function($http,mcqConst) {
    
  var reportData = [];

  var setReviewData = function(data) {
      //reviewData = data;
      localStorage.setItem("em_mcq_reviewData_"+mcqConst.userId, JSON.stringify(data));
  };
  var getReviewData = function() {
    // return reviewData;
    return JSON.parse(localStorage.getItem("em_mcq_reviewData_"+mcqConst.userId));
  };
  var setReportData = function(data) {
   //  reportData = data;
     localStorage.setItem("em_mcq_reportData_"+mcqConst.userId, JSON.stringify(data));
  };
  var getReportData = function() {
    //  return reportData;
   return JSON.parse(localStorage.getItem("em_mcq_reportData_"+mcqConst.userId));
  };
   var setAttemptDetails = function(data) {
    localStorage.setItem("em_mcq_attemptData_"+mcqConst.userId, JSON.stringify(data));
  };
   var getAttemptDetails = function() {
   return JSON.parse(localStorage.getItem("em_mcq_attemptData_"+mcqConst.userId));
  };
  
 

 var getJSON = function(options){
     console.log("inside getJson");
     if(mcqConst.touchDevice)
	 {
         console.log("inside getJson 2");
       var data = mcqInterface.initJson(options);
       if(data){
         options.successCallback(data);
       }else{
           options.errorCallback();
       }
     
 }else{
    
        $http({
        method: "post",
        url: options.url,
        data:options.data,
        headers: {
            'Content-Type': 'application/json'
        }
        }).success(function(data) {
          options.successCallback(data);


        }).error(function() {
          options.errorCallback();
        });
         
     }
 };
 
  return {
    setReviewData: setReviewData,
    getReviewData: getReviewData,
    setReportData:setReportData,
    getReportData:getReportData,
    setAttemptDetails:setAttemptDetails,
    getAttemptDetails:getAttemptDetails,
    getJSON:getJSON
  };



});