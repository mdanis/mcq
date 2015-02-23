
mcqApp.controller('mainController', function($scope,mcqConst) {
        mcqConst.userId = "ankita";
	    mcqConst.baseUrl  = location.href.split("#")[0];
	 if(mcqConst.touchDevice)
	 {
	 	mcqConst.resourceUrl = ".";
	 }else{
	 	//mcqConst.resourceUrl = location.href.split("#")[0];
	 	mcqConst.resourceUrl = ".";
	 }
	});
