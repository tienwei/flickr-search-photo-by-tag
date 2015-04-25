

(function(){
	'use strict';	
	angular.module('flickrPhotoSearchByTag').factory('FlickrApiService', FlickrApiService);

	FlickrApiService.$inject = ['$http'];

	function FlickrApiService($http){
		var flickrApiService = {
			flickrAPI:flickrAPI
		};
		return flickrApiService;

		function flickrAPI(tag){
			// config api params
			var apiKey = 'f88e45b3d09c37b1336a8c1561d414b8',
			apiSecret = 'dd7250e777e08691',
			apiUrl = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' + 
				apiKey + '&tags=' + tag;
				return $http.get(apiUrl).then(function (response) {
					console.log(response);
          		return response;
			});
		}
	}
})()

