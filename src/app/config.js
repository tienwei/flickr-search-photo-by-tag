(function(){
	'use strict';
	// create my app config for constant variables
	angular.module('myApp.config', [])
	    .constant('APP_NAME','Flickr Search By Tag App')
	    .constant('APP_VERSION','0.1')
	    .constant('API_BASEURL', 'https://api.flickr.com/services/rest/?&method=')
	    .constant('API_KEY','f88e45b3d09c37b1336a8c1561d414b8')
	    .constant('PER_PAGE','6');
})();
