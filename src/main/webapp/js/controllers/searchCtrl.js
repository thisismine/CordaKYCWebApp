var app = angular.module('bcloyalty');

app.controller('searchCtrl',function($http, $scope,  $state, $location, sessionService){


	var user = $state.params.userDetails;

	var ipVal = sessionService.get('ip');
	var portVal = sessionService.get('port');
	$scope.updateDetail ={};
	var base64Result;

	$scope.update = function(item) {
		$scope.updateDetail.userId = item.userId;
		$scope.updateDetail.userName = item.userName;
		$scope.updateDetail.kycBankName = item.kycBankName;
		this.updateData=true;
		$scope.updateData = !$scope.updateData;
		//this.formHide=false;



	};

	var base64fileString;

	//$scope.updateDetail.kycBankName = sessionService.get('bankName');
	//$scope.updateDetail.kycUpdateDate = new Date();
	//$scope.updateDetail.fileUpload = base64fileString;


	$scope.callUpdate = function(updateDetail){
		$scope.hideTable = true;

		$scope.userId = null;

		this.hideUpdateStatus=true;
		this.updateData=false;
		var newFile= $(":file")[0].files[0]
		if(newFile.size < 50000){
		if(newFile &&(newFile.type=='application/x-zip-compressed')){
			console.log(newFile)
			alert("Successful");
			getBase64(newFile,updateDetail);
		}else{
			alert("Select a zip file");
			return false;
		}
		}
		else{
			alert("Please select a zip file below 50KB");
			
		}
	
	};

	$scope.search = function(){

		this.hideUpdateStatus=false;
		const apiBaseURL = 'http://localhost:8080/api/'+ipVal+'/'+portVal+'/'+$scope.userId+'/get-kycs-by-userid';

		$http.get(apiBaseURL).then(function (response){
			if(response == null){
				$scope.hideTable = true;
				$scope.error = "Record not found!!!";
				$state.go('search', $scope.error);
			}else{

				$scope.error=null;
				$scope.hideTable = false;
				console.log('brought back', response);
				$scope.items = response;
				base64Result = response.data.kycDocBlob;
				
				

			}
		});
	};


	function getBase64(file,updateDetail) {

		
		var reader = new FileReader();
		reader.readAsDataURL(file);
		
		reader.onload = function () {
			base64file=reader.result;
			alert(base64file);
			base64fileString=base64file.substring(41);
			//alert(base64fileString);
			
			$scope.updateDetail.kycDocBlob=base64fileString;
			//alert($scope.updateDetail.kycDocBlob);
			const apiBaseURL = 'http://localhost:8080/api/'+ipVal+'/'+portVal+'/createKycDoc';
			$http.put(apiBaseURL,updateDetail).then(function(response){
				$state.go('search');
				if(response!=null){
					$scope.succ = "KYC Details Modified Successfully !";

					console.log($scope.succ);
				}else{
					
					$scope.err = "KYC Details Modification failed !";
				
					
				}
				console.log('brought back', response);
				//window.alert(response);

			});
		};
		reader.onerror = function (error) {

		};
	}

	window.downloadPDF = function downloadPDF() {

		var dlnk = document.getElementById('dwnldLnk');
		//alert(base64Result);
		base64Blob = "data:application/x-zip-compressed;base64,"+base64Result;
		//alert(base64Blob);
		dlnk.href = base64Blob;

		dlnk.click();



	};
});



