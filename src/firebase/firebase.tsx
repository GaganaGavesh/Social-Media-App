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

//ref.child("users").orderByChild("displayName").limitToFirst(1).equalTo("gagana").once("value", snapshot => {
// const res = ref.child("users").orderByChild("displayName").startAt('gam').once("value", snapshot => {
//   console.log(snapshot.val());
//   if (snapshot.exists()) {
//     const fetchUser: any = [];

//     snapshot.forEach((childSnapshot: any) => {
//       fetchUser.push({
//         id: childSnapshot.key,
//         value: childSnapshot.val().userId,
//         name: childSnapshot.val().displayName
//       });
//     });
//     console.log('User', fetchUser)
//     return fetchUser;
//   }
// });
// console.log('res : ', res);
// ref.child("users").orderByChild("userId").limitToFirst(1).equalTo("uQ6BdmkOFIOSNiOErkpebJJIkB227575757").once("value", snapshot => {
//   const snapshotVal = snapshot.val();
//   if (snapshot.exists()) {
//     const fetchUser: any = [];

//       snapshot.forEach((childSnapshot: any) => {
//         fetchUser.push({
//           id: childSnapshot.key,
//           ...childSnapshot.val()
//         });
//       });
//     console.log('Exists', snapshotVal)


//     console.log('User', fetchUser[0].follows)
//     fetchUser[0].follows.forEach((followId: any)=>{

//     })

//     //folower kenek add unamaa
//     const path = `users/${fetchUser[0].id}/follows`;
//     const followsArray = [...fetchUser[0].follows,'uQ6BdmkOFIOSNiOErkpebJJIkB22jsjsjsjjsjsjjjj', 'uQ6BdmkOFIOSNiOErkpebJJIkB22'];
//     database.ref(path).update({
//         ...followsArray
//     }).then(()=> console.log('Updated Successfully !'))
//     .catch((e: any)=>{
//         console.log(e);
//     });
//     }
//     else {
//       const followsArray = ['uQ6BdmkOFIOSNiOErkpebJJIkB227575757'];
//       const user = {
//         userId: 'uQ6BdmkOFIOSNiOErkpebJJIkB227575757',
//         displayName: 'gamage',
//         userProfileImageUrl: 'gahsljljljjl',
//         follows: followsArray
//       }
//       database.ref('users').push(user).then((ref: any) => {
//         console.log('User added');
//         });
//     }
//   });

// ref.child("users").orderByChild("userId").limitToFirst(1).equalTo("uQ6BdmkOFIOSNiOErkpebJJIkB22").once("value").then((snapshot: any) => {
//   const fetchedPosts01: any = [];
//   if (snapshot.exists()) {
//     const fetchUser: any = [];

//     snapshot.forEach((childSnapshot: any) => {
//       fetchUser.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     //console.log('userFetched')
//     let followsCountInArray = 0;
//     const getFollowsCount = () => {
//       fetchUser[0].follows.forEach((follows: any) => {
//         followsCountInArray = followsCountInArray + 1;
//       });
//       return followsCountInArray;
//     }
//     const followsCount = getFollowsCount();

//     //fetch the posts with the follows uids
//     var iterationCount = 0;
//     fetchUser[0].follows.forEach((followId: any) => {
//       database.ref().child("posts").orderByChild("userId").equalTo(followId).once('value').then((snapshot: any) => {
//         iterationCount = iterationCount + 1;
//         console.log('fetching posts for the usser')
//         if (snapshot.exists()) {
//           snapshot.forEach((childSnapshot: any) => {
//             fetchedPosts01.push({
//               id: childSnapshot.key,
//               ...childSnapshot.val()
//             });
//           });
//         }
//         // console.log('fetching posts for user complete');
//         // console.log('iCount',iCount);
//         console.log('icount : ', iterationCount, 'follows count : ', followsCount)
//         if (iterationCount === followsCount) {
//           //console.log(iterationCount, '  ', followsCount);
//           console.log('Fetched Postsdakadhkdahdakhk: ', fetchedPosts01);
//         }
//       })
//     })
//   }
// })

export { firebase, googleAuthProvider, refChildUsers, refChildPosts, database as default };


