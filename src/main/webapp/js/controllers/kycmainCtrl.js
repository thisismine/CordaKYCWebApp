
angular.module('bcloyalty').controller('kycmainCtrl', function($scope,  $state, $http, $location,sessionService) {    

	var user = $state.params.userDetails;
	var string; 
	$scope.itemDetail ={};
	$scope.items = [];
	//$scope.itemDetail.kycBankName = user.bankName;
	$scope.itemDetail.kycBankName = sessionService.get('bankName');
	var bankTemp = sessionService.get('bankName');
	var ipVal = sessionService.get('ip');
	var portVal = sessionService.get('port');




	//$scope.itemDetail.kycCreateDate = new Date(); 

	alert(sessionService.get('ip')+"="+sessionService.get('port')+"="+sessionService.get('bankName')+"="+sessionService.get('uid'));

	$scope.addRow = function(itemDetail){

		var newFile= $(":file")[0].files[0];
		var size =newFile.size;
		if(newFile.size < 50000){

			// To check whether a file is selected or not and the file is pdf
			if(newFile &&(newFile.type=='application/x-zip-compressed')){
				console.log(newFile)
				alert("Successful");

				getBase64(newFile,itemDetail);   

			}else{
				alert("Select a zip file");
				return false;
			}


		}
		else
		{
			alert("Please select a zip file below 50KB")
		}
	};

	function getBase64(file,itemDetail) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			base64file=reader.result;
			alert(base64file);
			string = base64file.substring(41);
			console.log(itemDetail);
			//alert("userId = "+$scope.itemDetail.userId+"userName = "+$scope.itemDetail.userName+"kycBankName = "+$scope.itemDetail.kycBankName+"kycDocBlob = "+string);
			$scope.itemDetail.kycDocBlob = string;
			console.log($scope.itemDetail.kycDocBlob);
			//const apiBaseURL = 'http://localhost:8080/api/createKycDoc';
			const apiBaseURL = 'http://localhost:8080/api/'+ipVal+'/'+portVal+'/createKycDoc';
			$http.put(apiBaseURL,itemDetail).then(function(response){
				$state.go('kycmain');
				if(response!=null){
					$scope.succ = "KYC Details Added Successfully !";

				}else{
					$scope.err = "KYC Details Not Added Successfully !";

				}
				console.log('brought back', response);


				alert("userId = "+$scope.itemDetail.userId+"userName = "+$scope.itemDetail.userName+"kycBankName = "+$scope.itemDetail.kycBankName+"kycDocBlob = "+string);
				//alert(response);
				//window.alert(response);	
				/*var temp =  $scope.itemDetail.kycBankName;
				console.log("temp....."+temp);
				document.getElementsByName('myForm')[0].reset();
				console.log( $scope.itemDetail.kycBankName );
			    $scope.itemDetail.kycBankName =bankTemp;
			    console.log("after..."+ $scope.itemDetail.kycBankName );*/




			});
		};
		reader.onerror = function (error) {

		};
	}
}).directive('validFile',function(){
	return {
		require:'ngModel',
		link:function(scope,el,attrs,ngModel){
			//change event is fired when file is selected
			el.bind('change',function(){
				scope.$apply(function(){
					ngModel.$setViewValue(el.val());
					ngModel.$render();
				});
			});
		}
	}
});

/* $scope.items=[];
    const nodePort = $location.port();
    const apiBaseURL = 'http://localhost:10003/api/example/';
    $http.get(apiBaseURL + "me").then(function(response){ $scope.thisNode = response.data.me});
    $http.get('http://localhost:10003/api/example/abc').then(function(response){$scope.items=response.data});
 */



