

(function(){
	'use strict';	
	angular.module('flickrPhotoSearchByTag').factory('FlickrApiService', FlickrApiService);

	FlickrApiService.$inject = ['$http', 'x2js', 'API_BASEURL', 'API_KEY', 'PER_PAGE'];

	function FlickrApiService($http, x2js, API_BASEURL, API_KEY, PER_PAGE){
		var flickrApiService = {
			flickrPhotoSearchApi:flickrPhotoSearchApi,
			xmlToJson:xmlToJson,
			getFlickrPhotoData:getFlickrPhotoData
		};

		return flickrApiService;

		function flickrPhotoSearchApi(tag, pageNo){
			// config api params
			var apiUrl = API_BASEURL + 'flickr.photos.search&api_key=' + 
				API_KEY + '&tags=' + tag + '&per_page=' + PER_PAGE + '&page=' + pageNo;
				// return the promise
				return $http.get(apiUrl).then(function (response) {
          			return response;
			});
		}

		function xmlToJson(xmlText){
			// convert xml to json
			return x2js.xml_str2json(xmlText);
		}

		function getFlickrPhotoData(tag, pageNo) {
			return flickrPhotoSearchApi(tag, pageNo).then(function(response){
				// convert response data from xml format to json
				var jsonObj = xmlToJson(response.data),
				photoData = {},
				photoArr = jsonObj.rsp.photos.photo.map(function (photo) {
					// parse photo urls with corresponding parameters
		            return 'http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg'
		                .replace('{farm-id}', photo._farm)
		                .replace('{server-id}', photo._server)
		                .replace('{id}', photo._id)
		                .replace('{secret}', photo._secret);
	            });
	            // assign the first page to photoData object
	            photoData.currentPage = jsonObj.rsp.photos._page;
	            photoData.photoArr = photoArr;
	        	return photoData;
			});
		}
	}
})();

