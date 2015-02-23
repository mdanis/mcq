

var mcqApp = angular.module('mcqApp',['ngRoute']);


	mcqApp.config(function($routeProvider) {
		
		/*testTemplate = $("#testTemplate").html();
		reviewTemplate = $("#reviewTemplate").html();
		reportTemplate = $("#reportTemplate").html();
		userAttemptTemplate = $("#userAttemptTemplate").html();
		
		$("#testTemplate").remove();
		$("#reviewTemplate").remove();
		 $("#reportTemplate").remove();
		 $("#userAttemptTemplate").remove();*/
		
		
		$routeProvider
		      .when('/', {
				template : testTemplate,
				controller  : 'testController'
			})
			 .when('/test', {
				template : testTemplate,
				controller  : 'reviewController'
			})

			.when('/review', {
				template : reviewTemplate,
				controller  : 'reviewController'
			})

			
			.when('/report', {
				template : reportTemplate,
				controller  : 'reportController'
			})
                        
                        .when('/userAttemptedQues', {
				template : userAttemptTemplate,
				controller  : 'userAttemptedQuesController'
			});
	});
	


//var mcqServices = angular.module('mcqServices', ['ngResource']).value('version', '0.1');


	
	
        
      
