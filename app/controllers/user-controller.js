'use strict';

pinApp.controller('UserController', function($scope, $window, UserFactory){

	$scope.login = () => {
		UserFactory.loginUser()
		.then( (userData) => {
		  $window.location.href = '#!/boards';
		});
	};

	$scope.logout = () => {
		UserFactory.logoutUser();
		$window.location.href = '#!/';
	};

});