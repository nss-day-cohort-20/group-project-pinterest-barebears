'use strict';

pinApp.controller("BoardsController", function($scope, $window, BoardFactory, UserFactory) {

  let currentUser = null;

  UserFactory.isAuthenticated()
  .then( (user) => {
    console.log("user status", user);
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
      console.log("new board data", data);
      fetchBoards();
    });
  };

  function fetchBoards() {
    let boardArr = [];
    console.log("Fetch called");
    BoardFactory.getBoards(currentUser)
    .then( (boardList) => {
      console.log("board Data", boardList);
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

  $scope.deleteBoard = (boardId) => {
    console.log("delete called", boardId);
    BoardFactory.deleteBoard(boardId)
    .then( (data) => {
      console.log("removed board", data);
      fetchBoards(currentUser);
    });
  };
});
