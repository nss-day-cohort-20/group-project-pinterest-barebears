'use strict';

pinApp.factory('UserFactory', function($q, $http, FirebaseUrl, FBCreds) {

	var config = {
	  apiKey: FBCreds.apiKey,
	  authDomain: FBCreds.authDomain
	};

	firebase.initializeApp(config);

	let currentUser = null;

	let isAuthenticated = function() {
	  return new Promise( (resolve, reject) => {
	    firebase.auth().onAuthStateChanged(function(user) {
	      if (user) {
	        currentUser = user.uid;
	        resolve(true);
	      } else {
	        resolve(false);
	      }
	    });
	  });
	};

	let getUser = () => {
    return currentUser;
  };

	let loginUser = () => {
		return $q( (resolve, reject) => {
			let provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider)
			.then( (user) => {
				currentUser = user.uid;
				resolve(user);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

	let logoutUser = () => {
	  return firebase.auth().signOut()
	  .catch( (err) => {
	    console.log("error logging out", err.message);
	  });
	};

	return {isAuthenticated, getUser, loginUser, logoutUser};

});