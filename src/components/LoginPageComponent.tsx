import React, { useContext } from 'react';
import PostContext from '../context/post-context'
import { addUser, removeUser } from '../actions/postActions'
import database, { firebase, googleAuthProvider, refChildUsers } from '../firebase/firebase';

export const LoginPage = () => {
    const { state, dispatch } = useContext(PostContext);

    const startLogin = () => {
        firebase.auth().signInWithPopup(googleAuthProvider).then((user: any) => {
            //console.log(user.user.uid);
            refChildUsers.orderByChild("userId").limitToFirst(1).equalTo(user.user.uid).once("value").then((snapshot : any) => {
                if (!snapshot.exists()) {
                    const followsArray = [user.user.uid];
                    const userForDatabase = {
                        userId: user.user.uid,
                        displayName: user.user.displayName,
                        userProfileImageUrl: user.user.photoURL,
                        follows: followsArray
                    }
                    database.ref('users').push(userForDatabase).then((ref: any) => {
                        console.log('User added');
                    });
                }
            });

            dispatch(addUser(state.posts, user.user));
        });
    };

    const startLogout = () => {
        firebase.auth().signOut().then(() => {
            const defaultUser = {} as any;
            dispatch(removeUser(state.posts, defaultUser));
        });
    }
    return (
        <div>
            {Object.keys(state.user).length !== 0 ?
                <button className="btn btn-info login_logout_button" onClick={startLogout}>Logout</button> :
                <button className="btn btn-success login_logout_button" onClick={startLogin}>Login</button>
            }
        </div>
    );
};

export default LoginPage;