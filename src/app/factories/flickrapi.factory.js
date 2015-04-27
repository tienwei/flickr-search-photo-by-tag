

(function(){
	'use strict';	
	angular.module('flickrPhotoSearchByTag').factory('FlickrApiService', FlickrApiService);

	FlickrApiService.$inject = ['$http', 'x2js'];

	function FlickrApiService($http, x2js){
		var flickrApiService = {
			flickrPhotoSearchApi:flickrPhotoSearchApi,
			xmlToJson:xmlToJson,
			getFlickrPhotoData:getFlickrPhotoData
		};
		return flickrApiService;

		function flickrPhotoSearchApi(tag, pageNo){
			// config api params
			var apiKey = 'f88e45b3d09c37b1336a8c1561d414b8',
			apiSecret = 'dd7250e777e08691',
			perPage = 6,
			page = pageNo,
			apiUrl = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' + 
				apiKey + '&tags=' + tag + '&per_page=' + perPage + '&page=' + pageNo;
				// return the promise
				return $http.get(apiUrl).then(function (response) {
          			return response;
			});
		}

		function xmlToJson(xmlText){
			// convert xml to json
			return x2js.xml_str2json(xmlText);
		}

		function getFlickrPhotoData(jsonObj) {
			var photoData = {};
			var photoArr = jsonObj.rsp.photos.photo.map(function (photo) {
			// parse photo urls with corresponding parameters
            return "http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"
                .replace("{farm-id}", photo._farm)
                .replace("{server-id}", photo._server)
                .replace("{id}", photo._id)
                .replace("{secret}", photo._secret);
            });
            // assign the first page to photoData object
            photoData.currentPage = jsonObj.rsp.photos._page;
            photoData.photoArr = photoArr;
        	return photoData;
		}
	}
})()

