'use strict';

angular.module('bcloyalty').controller('loginCtrl', function ($scope,$http,$state,loginService) {	
	
	$scope.jsonUser = "";
	$scope.jsonPwd = "";	
	var userDetails = {};
	userDetails.bankName = "";
	userDetails.port = "";
	userDetails.ip = "";
	
	$scope.login=function(){
		$http.get('/json/user.json').success(function(data) {			
			userDetails.userId = $scope.userId;
			userDetails.password = $scope.password;
			$scope.jsonArrs = data.user;
			for(var i=0; i<data.user.length; i++){
				if(userDetails.userId == $scope.jsonArrs[i].userID){				
					userDetails.bankName = $scope.jsonArrs[i].bankName;
					userDetails.port = $scope.jsonArrs[i].port;
					userDetails.ip = $scope.jsonArrs[i].ip;
					$scope.jsonUser = $scope.jsonArrs[i].userID;
					$scope.jsonPwd = $scope.jsonArrs[i].password;
					break;
				}							
			}
			if((userDetails.userId == $scope.jsonUser) && (userDetails.password == $scope.jsonPwd)){
				loginService.login(userDetails,$scope); //call login service
			}else{
				$scope.userId = "";
				$scope.password = "";
				$scope.error1 = "Login Id or Password is Invalid try login with other Login Id !";
				
				$state.go('login',$scope.error1);
			}			
		});
	};
});



/*angular.module('bcloyalty').controller('loginCtrl',function($scope, $rootScope, $state, loginService){

$rootScope.login = function( ){
	$state.go('index');
	/*
	$scope.error = "";
	$scope.loginDetails = {
		  "enrollId": $scope.userId,
		  "enrollSecret": $scope.password
		  };
	loginService.getUserDetails($scope.loginDetails).then(function(result){
		if(result.Failure){
			$scope.error = result;
			return false;
		}
		else if (result.success){
			$state.go('index');
			}
					
	}, function(error){
		$scope.error = error;
	});
};

});*/
