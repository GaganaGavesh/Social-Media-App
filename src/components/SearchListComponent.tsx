import React, { useState, useEffect, useContext } from 'react';
import AsyncSearchBar from './SearchBarSelectComponent';
import PostContext from '../context/post-context'
import SearchListItem from './SearchListItemComponent';

const SearchList = () => {
    //const { state, dispatch } = useContext(PostContext);
    const [collabs, setCollabs] = useState([]);

    // let isLoggedIn = false;
    // if (Object.keys(state.user).length == 0) {
    //     isLoggedIn = false;
    // } else {
    //     isLoggedIn = true;
    // }

    useEffect(() => {
        console.log('from app.tsx: ', collabs);
        console.log('type of collabs', collabs.length);
        collabs.map((user: any) => {
            console.log(user.displayName);
        });
    }, [collabs]);
    return (
        <div>
            {false && <p className="Error_text">Please log in !</p>}
            {true && <div>
                <div className="Search_container">
                    <AsyncSearchBar setCollabs={setCollabs} />
                    {collabs.length !== 0 && <h3>Selected Users!</h3>}
                </div>
                <div>
                    {collabs.map((user: any) => {
                        return <SearchListItem
                            key={user.id}
                            name={user.displayName}
                            photoURL={user.userProfileImageUrl}
                            userId={user.userId}
                            isFollows={user.isFollows}
                            firebaseId={user.id}
                        />
                    })}
                </div>
            </div>}
        </div>
    );
}

export default SearchList;