'use strict';

pinApp.controller("AddBoardController", function($scope, $window, BoardFactory, UserFactory) {

  // $scope.formTitle = "Add New Task";
  $scope.boardItem = {
    title: "";
    url: "";
    uid: UserFactory.getUser()
  };

  $scope.saveBoardItem = () => {
    BoardFactory.postNewBoard($scope.boardItem)
    .then( (data) => {
      console.log("new board data", data);
      $window.location.href = '#!/boards/view';
    });
  };
});