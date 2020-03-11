import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
// import "react-firebaseui/StyledFirebaseAuth";

var firebaseConfig = {
    apiKey: "AIzaSyDGYPPG2YszCtb2tTnUswRCX13TaeLKPLw",
    authDomain: "shoppingapp-67fda.firebaseapp.com",
    databaseURL: "https://shoppingapp-67fda.firebaseio.com",
    projectId: "shoppingapp-67fda",
    storageBucket: "shoppingapp-67fda.appspot.com",
    messagingSenderId: "930290833072",
    appId: "1:930290833072:web:1565fd7c269690a85d0d75"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const storageRef =firebase.storage().ref();
export default firebase;
