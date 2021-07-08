import React, { useState, useContext } from 'react';
import database, { refChildUsers } from '../firebase/firebase';
import PostContext from '../context/post-context'
import { useEffect } from 'react';

const SearchListItem = (props: any) => {
    const { state, dispatch } = useContext(PostContext);
    //const [followed, setFollowd] = useState(false)
    const correntUserId: string =  'AJv5bZn6aEeIL3SDutVeoBVrR8F3';
    console.log("idFollows",props.isFollows);

    let followed: boolean = props.isFollows;


    useEffect(()=>{

    },[followed]);

    const onFollowButtonClick = () => {
        refChildUsers.orderByChild("userId").limitToFirst(1).equalTo(correntUserId).once("value").then((snapshot: any) => {
            const snapshotVal = snapshot.val();
            if (snapshot.exists()) {
                const fetchUser: any = [];

                snapshot.forEach((childSnapshot: any) => {
                    fetchUser.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });

                //folower kenek add karana path eka
                const path = `users/${fetchUser[0].id}/follows`;


                const followIdArray: any = [];
                fetchUser[0].follows.forEach((followId: string) => {
                    followIdArray.push(followId);
                });

                const followsArray = [...followIdArray, props.userId];
                database.ref(path).update({
                    ...followsArray
                }).then(() => {
                    console.log('Updated Successfully !');
                    //setFollowd(true);
                    followed = true;
                }).catch((e: any) => {
                    console.log(e);
                });
            }
        });
    }

    const onUnFollowButtonClick = () => {
        refChildUsers.orderByChild("userId").limitToFirst(1).equalTo(correntUserId).once("value").then((snapshot: any) => {
            if (snapshot.exists()) {
                const fetchUser: any = [];

                snapshot.forEach((childSnapshot: any) => {
                    fetchUser.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });

                const path = `users/${fetchUser[0].id}/follows`;
                console.log('Path to ref', path);

                const followIdArray: any = [];
                fetchUser[0].follows.forEach((followId: string) => {
                    followIdArray.push(followId);
                });

                var unfollowedArray: any = followIdArray.filter((followId: string) => {
                    return followId !== props.userId;
                });

                console.log('unfollowedArray', unfollowedArray);
                const UNFOLLOWED: any = [...unfollowedArray];

                database.ref(path).remove().then(() => {
                    console.log('Followed array removed')
                    updateFollows(path, UNFOLLOWED);
                    //setFollowd(false)
                    followed = false;
                }).catch((e: any) => {
                    console.log('Failed to remove followed array !', e);
                });
            }
        });
    }

    const updateFollows = (path: string, followsArray: any) => {
        database.ref(path).update({
            ...followsArray
        }).then(() => console.log('Updated')
        ).catch((e: any) => {
            console.log('Update Failed', e)
        });
    };

    return (
        <div>
            <div className="User_container">
                <div className="Selected_User_Data_Flex">
                    <div>
                        <img className="Selected_User_profile_image rounded-circle" src={props.photoURL} alt="" />
                        {props.name}
                    </div>
                    <p>{followed}</p>
                    {!followed ? <button
                        onClick={onFollowButtonClick}
                        className="btn btn-success Follow_Button">
                        Follow
                    </button> : <button
                        disabled={props.isCurrentUser}
                        onClick={onUnFollowButtonClick}
                        className="btn btn-danger Follow_Button">
                        Unfollow
                    </button>}
                    {/* {!props.isfollows && <button
                        onClick={onUnFollowButtonClick}
                        className="btn btn-danger Follow_Button">
                        Unfollow
                    </button>} */}
                </div>
            </div>
        </div>
    );
}

export default SearchListItem;