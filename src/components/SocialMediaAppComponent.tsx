import React, { useEffect, useReducer, useState } from 'react';
import AppRouter from '../routers/AppRouters';
import AuthContext from '../context/auth-context';
import PostContext from '../context/post-context'
import postReducer from '../reducers/post-reducer';
import { populatePosts } from '../actions/postActions'
import database, { firebase, refChildUsers, refChildPosts } from '../firebase/firebase';

const SocialMediaApp = () => {
  const defaultUser = {} as any;
  const defaultState = {
    posts: [],
    user: defaultUser
  };
  const [state, dispatch] = useReducer(postReducer, defaultState);

  const fetchPosts = () => {
    refChildUsers.orderByChild("userId").limitToFirst(1).equalTo(state.user.uid).once("value").then((snapshot: any) => {
      const fetchedPosts01: any = [];
      if (snapshot.exists()) {
        const fetchUser: any = [];

        snapshot.forEach((childSnapshot: any) => {
          fetchUser.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        //console.log('userFetched')
        let followsCountInArray = 0;
        const getFollowsCount = () => {
          fetchUser[0].follows.forEach((follows: any) => {
            followsCountInArray = followsCountInArray + 1;
          });
          return followsCountInArray;
        }
        const followsCount = getFollowsCount();

        //fetch the posts with the follows uids
        var iterationCount = 0;
        fetchUser[0].follows.forEach((followId: any) => {
          refChildPosts.orderByChild("userId").equalTo(followId).once('value').then((snapshot: any) => {
            iterationCount = iterationCount + 1;
            console.log('fetching posts for the usser')
            if (snapshot.exists()) {
              snapshot.forEach((childSnapshot: any) => {
                fetchedPosts01.push({
                  id: childSnapshot.key,
                  ...childSnapshot.val()
                });
              });
            }
            console.log('icount : ', iterationCount, 'follows count : ', followsCount)
            if (iterationCount === followsCount) {
              //console.log(iterationCount, '  ', followsCount);
              console.log('Fetched Postsdakadhkdahdakhk: ', fetchedPosts01);
              firebase.auth().onAuthStateChanged((user: any) => {
                if (user) {
                  dispatch(populatePosts(fetchedPosts01, user));
                }
              });
            }
          })
        })
      }
    })
    // database.ref('posts').once('value').then((snapshot: any) => {

    //   const fetchedPosts: any = [];
    //   console.log("Alll snapshot",snapshot.val());

    //   snapshot.forEach((childSnapshot: any) => {
    //     fetchedPosts.push({
    //       id: childSnapshot.key,
    //       ...childSnapshot.val()
    //     });
    //   });
    //   console.log(state.user);
    //   firebase.auth().onAuthStateChanged((user: any) => {
    //     if (user) {
    //       dispatch(populatePosts(fetchedPosts, user));
    //       console.log(fetchedPosts);
    //     }
    //   });
    // })
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        fetchPosts();
      }
    });
  }, [state.posts]);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      <AppRouter />
    </PostContext.Provider>
  );
}

export default SocialMediaApp;