import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3lCm0jvwDjazgKHA9l7GFBYs3tgqaTDg",
  authDomain: "socialmediaapp-21ddb.firebaseapp.com",
  projectId: "socialmediaapp-21ddb",
  storageBucket: "socialmediaapp-21ddb.appspot.com",
  messagingSenderId: "442524693843",
  appId: "1:442524693843:web:6df6adad0125b2cd3c5da6",
  measurementId: "G-BXG87FN5D1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database: any = firebase.database();

const refChildUsers: any = firebase.database().ref().child("users");
const refChildPosts: any = firebase.database().ref().child("posts");

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

var ref = firebase.database().ref();
console.log(ref);

export { firebase, googleAuthProvider, refChildUsers, refChildPosts, database as default };


