

(function(){
	'use strict';	
	angular.module('flickrPhotoSearchByTag').factory('FlickrApiService', FlickrApiService);

	FlickrApiService.$inject = ['$http', 'API_BASEURL', 'API_KEY', 'PER_PAGE'];

	function FlickrApiService($http, API_BASEURL, API_KEY, PER_PAGE){
		var flickrApiService = {
			// isolate the controller by passing data
			photoData:photoData,
			flickrPhotoSearchApi:flickrPhotoSearchApi,
			getFlickrPhotoData:getFlickrPhotoData
		};

		return flickrApiService;
		var photoData = {};
		function flickrPhotoSearchApi(tag, pageNo){
			// config api params
			var apiUrl = API_BASEURL + 'flickr.photos.search&api_key=' + 
				API_KEY + '&tags=' + tag + '&per_page=' + PER_PAGE + '&page=' + pageNo +
				'&format=json&nojsoncallback=1';
				// return the promise
				return $http.get(apiUrl).then(function (response) {
					// return json data
          			return response.data;
			});
		}

		function getFlickrPhotoData(tag, pageNo) {
			return flickrPhotoSearchApi(tag, pageNo).then(function(response){
				if(response.stat === 'ok') {
						// convert response data from xml format to json
					var localPhotoData = {},
					photoArr = response.photos.photo.map(function (photo) {
						// parse photo urls with corresponding parameters
			            return {'title':photo.title,'url':'http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg'
			                .replace('{farm-id}', photo.farm)
			                .replace('{server-id}', photo.server)
			                .replace('{id}', photo.id)
			                .replace('{secret}', photo.secret)};
		            });
		            // assign the first page to photoData object
		            localPhotoData.currentPage = response.photos.page;
		            localPhotoData.photoArr = photoArr;
		            flickrApiService.photoData = localPhotoData;
		        	// return photoData;
				} else {
					return false;
				}
			});
		}
	}
})();

