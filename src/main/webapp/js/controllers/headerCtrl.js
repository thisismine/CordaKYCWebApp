angular.module('bcloyalty').controller('headerCtrl',function($scope,  $rootScope, $state,loginService){
	
	
	 var logout = function (){
	    
		 	//alert('in logout!');
			loginService.logout();
			
	        $state.go('login');
	    };
	 logout();

});