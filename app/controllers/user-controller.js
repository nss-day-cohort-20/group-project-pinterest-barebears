'use strict';

pinApp.controller('UserController', function($scope, $window, UserFactory){

	$scope.login = () => {
		UserFactory.loginUser()
		.then( (userData) => {
		  console.log("userData", userData);
		  $window.location.href = '#!/pins';
		});
	};

	$scope.logout = () => {
		UserFactory.logoutUser();
		$window.location.href = '#!/';
	};

});