import React, { useState, useContext } from 'react';
import database, { refChildUsers } from '../firebase/firebase';
import PostContext from '../context/post-context'

const SearchListItem = (props: any) => {
    const { state, dispatch } = useContext(PostContext);
    const [followed, setFollowd] = useState(false)

    const onFollowButtonClick = () => {
        //current user balanawaa
        //state.user.uid
        refChildUsers.orderByChild("userId").limitToFirst(1).equalTo("AJv5bZn6aEeIL3SDutVeoBVrR8F3").once("value").then((snapshot: any) => {
            const snapshotVal = snapshot.val();
            if (snapshot.exists()) {
                const fetchUser: any = [];

                snapshot.forEach((childSnapshot: any) => {
                    fetchUser.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                console.log('Exists', snapshotVal)

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
                    setFollowd(true);
                }).catch((e: any) => {
                        console.log(e);
                });
            }
        });
    }

    const onUnFollowButtonClick = () => {
        refChildUsers.orderByChild("userId").limitToFirst(1).equalTo("AJv5bZn6aEeIL3SDutVeoBVrR8F3").once("value").then((snapshot: any) => {
            const snapshotVal = snapshot.val();
            if (snapshot.exists()) {
                const fetchUser: any = [];

                snapshot.forEach((childSnapshot: any) => {
                    fetchUser.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                console.log('Exists', snapshotVal)

                //folower kenek add karana path eka
                
                const path = `users/${fetchUser[0].id}/follows`;
                console.log('Path to ref',path);


                const followIdArray: any = [];
                fetchUser[0].follows.forEach((followId: string) => {
                    followIdArray.push(followId);
                });
                var unfollowedArray: any = followIdArray.filter((followId: string) => {
                    return followId !== 'uQ6BdmkOFIOSNiOErkpebJJIkB22jsjsjsjjsjsjjjj';
                });

                // const followsArray = [ props.userId];
                // database.ref(path).update({
                //     ...followsArray
                // }).then(() => {
                //     console.log('Updated Successfully !');
                //     setFollowd(true);
                // }).catch((e: any) => {
                //         console.log(e);
                // });
                console.log('unfollowedArray',unfollowedArray);
                const UNFOLLOWED: any = [...unfollowedArray];
                database.ref(path).update({
                    ...UNFOLLOWED
                }).then(() => {
                    console.log('Updated Successfully !');
                    setFollowd(true);
                }).catch((e: any) => {
                        console.log(e);
                });
            }
        });
    }
    return (
        <div>
            <div className="User_container">
                <div className="Selected_User_Data_Flex">
                    <div>
                        <img className="Selected_User_profile_image rounded-circle" src={props.photoURL} alt="" />
                        {props.name}
                    </div>
                    <div>
                        {followed || props.isFollows ? (<button
                            onClick={onUnFollowButtonClick}
                            className="btn btn-danger Follow_Button">
                            Unfollow
                        </button>) : (<button
                            onClick={onFollowButtonClick}
                            className="btn btn-success Follow_Button">
                            Follow
                        </button>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchListItem;