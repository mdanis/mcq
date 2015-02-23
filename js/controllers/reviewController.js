
mcqApp.controller('reviewController', function($scope,$window,service,mcqConst) {
       $scope.baseUrl = mcqConst.baseUrl;
     $scope.resourceUrl = mcqConst.resourceUrl;
      $scope.$on('$viewContentLoaded',function(event){
            $scope.reviewData =  service.getReviewData();
      });
      $scope.closeReview = function() {
       $window.close();

    };
	});
