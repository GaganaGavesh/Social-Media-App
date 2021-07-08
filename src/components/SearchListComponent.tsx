import React, { useState, useEffect, useContext } from 'react';
import AsyncSearchBar from './SearchBarSelectComponent';
import { refChildUsers } from '../firebase/firebase';
import PostContext from '../context/post-context'
import SearchListItem from './SearchListItemComponent';

const SearchList = () => {
    const { state, dispatch } = useContext(PostContext);
    const [collabs, setCollabs] = useState([]);
    const [mappedCollabs, setMappedCollabs] = useState([]);
    const [currentUserFollowIds, SetCurrentUserFollowIds] = useState([]);
    const correntUserId: string =  'AJv5bZn6aEeIL3SDutVeoBVrR8F3';

    // let isLoggedIn = false;
    // if (Object.keys(state.user).length == 0) {
    //     isLoggedIn = false;
    // } else {
    //     isLoggedIn = true;
    // }

    useEffect(() => {
        refChildUsers.orderByChild("userId").limitToFirst(1).equalTo(correntUserId).once("value").then((snapshot: any) => {
            if (snapshot.exists()) {
                const fetchUser: any = [];

                snapshot.forEach((childSnapshot: any) => {
                    fetchUser.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                SetCurrentUserFollowIds(fetchUser[0].follows);
                console.log(currentUserFollowIds);
                const mappedCollabs: any = collabs.map((user: any) => {
                    let isFollows = false;
                    let isCurrentUser = false;
                    currentUserFollowIds.forEach((followsId: string) => {
                        if (followsId === user.userId) {
                            isFollows = true;
                        }
                        //state.user.uid
                        if (correntUserId === user.userId) {
                            isCurrentUser = true;
                        }
                    });
                    return {
                        isFollows: isFollows,
                        isCurrentUser: isCurrentUser,
                        ...user
                    }
                })
                console.log(mappedCollabs);
                setMappedCollabs(mappedCollabs);
            }
        });
    }, [collabs]);
    return (
        <div>
            {!correntUserId && <p className="Error_text">Please log in !</p>}
            {correntUserId && <div>
                <div className="Search_container">
                    <AsyncSearchBar setCollabs={setCollabs} />
                    {collabs.length !== 0 && <h3>Selected Users!</h3>}
                </div>
                <div>
                    {mappedCollabs.map((user: any) => {
                        return <SearchListItem
                            key={user.id}
                            name={user.displayName}
                            photoURL={user.userProfileImageUrl}
                            userId={user.userId}
                            isFollows={user.isFollows}
                            firebaseId={user.id}
                            isCurrentUser={user.isCurrentUser}
                        />
                    })}
                </div>
            </div>}
        </div>
    );
}

export default SearchList;