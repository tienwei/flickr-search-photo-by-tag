

(function(){
	'use strict';	
	angular.module('flickrPhotoSearchByTag').factory('FlickrApiService', FlickrApiService);

	FlickrApiService.$inject = ['$http', 'API_BASEURL', 'API_KEY', 'PER_PAGE'];

	function FlickrApiService($http, API_BASEURL, API_KEY, PER_PAGE){
		var flickrApiService = {
			// isolate the controller by resolving data in the factory
			photoData:photoData,
			photoDetails:photoDetails,
			photoPermission:photoPermission,
			flickrPhotoSearchApi:flickrPhotoSearchApi,
			getFlickrPhotoData:getFlickrPhotoData,
			photoUrlParser:photoUrlParser,
			getPhotoDetails:getPhotoDetails
		};

		return flickrApiService;

		var photoData = {},
		photoDetails = {},
		photoPermission;

		function flickrPhotoSearchApi(tag, pageNo){
			// config api params
			var apiUrl = API_BASEURL + 'flickr.photos.search&api_key=' + 
				API_KEY + '&tags=' + tag + '&per_page=' + PER_PAGE + '&page=' + pageNo +
				'&format=json&nojsoncallback=1';
			// return the promise
			return $http.get(apiUrl).then(function (response) {
				// return json data
      			return response.data;
			}).catch(function(error){
				console.log('Search photo API error');
			});
		}

		function getFlickrPhotoData(tag, pageNo) {
			return flickrPhotoSearchApi(tag, pageNo).then(function(response){
				if(response.stat === 'ok') {
						// convert response data from xml format to json
					var localPhotoData = {},
					photoArr = response.photos.photo.map(photoUrlParser);
		            // assign the first page to photoData object
		            localPhotoData.currentPage = response.photos.page;
		            localPhotoData.photoArr = photoArr;
		            flickrApiService.photoData = localPhotoData;
				} else {
					flickrApiService.photoData = false;
				}
			});
		}

		function photoUrlParser(photo) {
			// parse photo urls with corresponding parameters
            return {'id':photo.id, 'title':photo.title,'url':'http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg'
                .replace('{farm-id}', photo.farm)
                .replace('{server-id}', photo.server)
                .replace('{id}', photo.id)
                .replace('{secret}', photo.secret)};
        }

		function getPhotoDetails(photoID) {
			// config api params
			var apiUrlForExif = API_BASEURL + 'flickr.photos.getExif&api_key=' + 
				API_KEY + '&photo_id=' + photoID +'&format=json&nojsoncallback=1',
				apiUrlForInfo = API_BASEURL + 'flickr.photos.getInfo&api_key=' + 
				API_KEY + '&photo_id=' + photoID +'&format=json&nojsoncallback=1',
				callGetExifApi = function(){
					return $http.get(apiUrlForExif).then(function(response){
						return response.data;
					});
				},
				checkPermission = function(data){
					if(data.stat === 'ok') {
						flickrApiService.photoPermission = true;
						// if with permission, return the photo details
						flickrApiService.photoDetails = data.photo;
					} else {
						// otherwise, call getInfo instead
						return $http.get(apiUrlForInfo).then(function(response){
							// set permission to false
							flickrApiService.photoPermission = false;
							// return photo info from the getInfo API
							flickrApiService.photoDetails = response.data.photo;
						});
					}
				},
				reportError = function(error) {
					console.log('Get photoExif API error');
				};

				// chain the methods
				return callGetExifApi().then(checkPermission).catch(reportError);
		}
	}
})();

