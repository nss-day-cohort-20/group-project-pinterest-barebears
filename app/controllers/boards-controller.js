'use strict';

pinApp.controller("BoardsController", function($scope, $window, BoardFactory, UserFactory) {

  let currentUser = null;

  UserFactory.isAuthenticated()
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchBoards();
  });

 $scope.newBoardItem = {
    title: "",
    url: "",
    uid: ""
  };

  $scope.saveBoardItem = () => {
    $scope.newBoardItem.uid = UserFactory.getUser();
    BoardFactory.postNewBoard($scope.newBoardItem)
    .then( (data) => {
      fetchBoards();
    });
  };

  function fetchBoards() {
    let boardArr = [];
    BoardFactory.getBoards(currentUser)
    .then( (boardList) => {
      let boardData = boardList;
      Object.keys(boardData).forEach( (key) => {
        boardData[key].id = key;
        boardArr.push(boardData[key]);
      });
      $scope.boards = boardArr;
    })
    .catch( (err) => {
      console.log("error!", err);
    });
  }

  $scope.loadPins = (boardId) => {
  $window.location.href = `/#!/pins/${boardId}`;
  };

  $scope.deleteBoard = (boardId) => {
    BoardFactory.deleteBoard(boardId)
    .then( (data) => {
      fetchBoards(currentUser);
    });
  };
});
