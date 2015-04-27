(function(){
	'use strict';

	angular.module('flickrPhotoSearchByTag').controller('SearchCtrl', SearchCtrl);
	SearchCtrl.$inject = ['$scope', '$state'];
	function SearchCtrl ($scope, $state) {
		$scope.gotoTagSearch = gotoTagSearch;
		function gotoTagSearch() {
			var typedTag = $scope.searchTag;
	      	$state.go('tag', {'tag':typedTag});
	    }
	}
})();

