import * as firebase from "firebase/app";

export const initializeFirebase = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyDx6U84UQpGshsd6g0dQz5tH7RGwTRekYc",
    authDomain: "pushtest-5da91.firebaseapp.com",
    databaseURL: "https://pushtest-5da91.firebaseio.com",
    projectId: "pushtest-5da91",
    storageBucket: "pushtest-5da91.appspot.com",
    messagingSenderId: "685715552622",
    appId: "1:685715552622:web:43258c215a0cda84d8697f",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
};
