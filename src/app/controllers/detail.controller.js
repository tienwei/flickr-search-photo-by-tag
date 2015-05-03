(function(){
	'use strict';

	/* @ngInject */
	function DetailCtrl($stateParams, $location, APP_NAME, FlickrApiService) {
		//variables
		var vm = this,
		photoID = parseInt($stateParams.photoID);
		vm.currentTag = $stateParams.tag;
		vm.title = 'Photo ID: ' + photoID;
		vm.APP_NAME = APP_NAME;

		// methods
		vm.goBack = goBack;

		getPhotoDetails(photoID);

		/**
	    * @name getPhotoDetails
	    * @desc gets the photo details including id, server, secret, camera, exif, etc.
	    * @param {integer} photoID
	    */
		function getPhotoDetails(photoID) {
			FlickrApiService.getPhotoDetails(photoID).then(function(){
				vm.permission = FlickrApiService.photoPermission;
				vm.url = FlickrApiService.photoUrlParser(FlickrApiService.photoDetails).url;
				// check the photo permission first
				if(vm.permission) {
					var camera = (FlickrApiService.photoDetails.camera.length)?FlickrApiService.photoDetails.camera:'Unknown';
					vm.info = 'Camera: ' + camera;
					vm.exif = FlickrApiService.photoDetails.exif;	
				} else {
					vm.info = 'No permission to view the Exif data';
				}
			});
		}

		/**
	    * @name goBack
	    * @desc gets back to the term photo page.
	    */
		function goBack() {
			// change the path
			$location.path('/tags/'+ vm.currentTag);
		}
	}

	angular.module('flickrPhotoSearchByTag').controller('DetailCtrl', DetailCtrl);
	DetailCtrl.$inject = ['$stateParams', '$location','APP_NAME', 'FlickrApiService'];	
})();