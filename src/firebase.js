import firebase from "firebase";

var firebaseConfig = {
    apiKey: "you can't get it from here",
    authDomain: "mateusz-todo.firebaseapp.com",
    databaseURL: "https://mateusz-todo.firebaseio.com",
    projectId: "mateusz-todo",
    storageBucket: "mateusz-todo.appspot.com",
    messagingSenderId: "290494526054",
    appId: "this is important too?"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;