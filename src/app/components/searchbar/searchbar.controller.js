(function(){
	'use strict';

	angular.module('flickrPhotoSearchByTag').controller('SearchCtrl', SearchCtrl);
	SearchCtrl.$inject = ['$scope', '$state'];
	function SearchCtrl ($scope, $state) {
		$scope.gotoTagSearch = gotoTagSearch;
		function gotoTagSearch() {
			var typedTag = $scope.searchTag;

			// pass a message to mainCtrl, check if no tag is entred.
			$scope.$parent.$parent.message = (typeof typedTag === 'undefined')?'Please enter a term!':'';

	      	$state.go('tag', {'tag':typedTag});
	    }
	}
})();

