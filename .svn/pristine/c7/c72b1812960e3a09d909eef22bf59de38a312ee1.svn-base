/*angular.module('bcloyalty').factory('loginService',function($http, $q){
	return{
		getUserDetails: function(){
			var deffered = $q.defer();
			$http.get('/json/user.json').
			success(function(data, status, headers, config){
				deffered.resolve(data);
			}).
			error(function(data, status, headers, config){
				deffered.reject(data);
			});

			return deffered.promise;
		}
	}
});*/
'use strict';
angular.module('bcloyalty').factory('loginService', function($http,$state, $location,sessionService){
	return{
		login:function(userDetails,scope){
			var $promise=$http.get('',userDetails); //send data to user.java
			$promise.then(function(msg){
			    var uid = userDetails.userId;
			    var bankName = userDetails.bankName;
			    var ip = userDetails.ip;
			    var port = userDetails.port;
				if(uid){
					sessionService.set('uid',uid);
					sessionService.set('bankName',bankName);
					sessionService.set('ip',ip);
					sessionService.set('port',port);
					$state.go('kycmain',{'userDetails':userDetails});
				}	       
				else  {
					scope.msgtxt='incorrect information';
					$state.go('login');
				}				   
			});
		},
		logout:function(){
			sessionService.destroy('uid');
			sessionService.destroy('bankName');
			sessionService.destroy('ip');
			sessionService.destroy('port');
			alert(sessionService.get('ip')+"="+sessionService.get('port')+"="+sessionService.get('bankName')+"="+sessionService.get('uid'));
			
			$state.go('login');
		},
		islogged:function(){
			var $checkSessionServer=$http.post(''); //send data to data
			return $checkSessionServer;			
		}
	}

});