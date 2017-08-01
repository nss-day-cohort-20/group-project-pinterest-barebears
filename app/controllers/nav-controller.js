'use strict';

pinApp.controller("NavController", function($scope, $window, FilterFactory, UserFactory) {

  $scope.searchText = FilterFactory;
  $scope.isLoggedIn = false;

  // Listen for changes to auth state; If logged in, change isLoggedIn to true so
  // the search input, add btn, and "logout" shows
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.isLoggedIn = true;
      console.log("currentUser logged in?", user.uid);
      console.log("logged in t-f", $scope.isLoggedIn );
      $scope.$apply();
    } else {
      $scope.isLoggedIn = false;
      $scope.$apply();
      console.log("user logged in?", $scope.isLoggedIn);
      $window.location.href = "#!/login";
    }
  });

  $scope.logout = () => {
    console.log("logout clicked");
    UserFactory.logoutUser();
  };

});
