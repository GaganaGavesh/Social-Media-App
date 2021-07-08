import React, { useState, useEffect } from 'react';
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { refChildUsers } from '../firebase/firebase';


const AsyncSearchBar = (props: any) => {

  const [query, setQuery] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [collabs, setCollabs] = useState("");
  const animatedComponents = makeAnimated();

  const fetchCurrentUser: any = [];
  // useEffect(()=>{
  //       refChildUsers.orderByChild("userId").limitToFirst(1).equalTo("AJv5bZn6aEeIL3SDutVeoBVrR8F3").once("value").then((snapshot: any) => {
  //         if (snapshot.exists()) {
  //           snapshot.forEach((childSnapshot: any) => {
  //             fetchCurrentUser.push({
  //               id: childSnapshot.key,
  //               ...childSnapshot.val()
  //             });
  //           });
  //           setCurrentUser(fetchCurrentUser);
  //           console.log('currentUser',currentUser);
  //         }
  //       });
  // },[fetchCurrentUser]);
  
  const loadOptions = () => {
    return refChildUsers.orderByChild("displayName").startAt(query).endAt(`${query}\uf8ff`).once("value").then((snapshot: any) => {
      if (snapshot.exists()) {
        
        const fetchUser: any = [];

        snapshot.forEach((childSnapshot: any) => {
          console.log('Child Snapshot', childSnapshot.val().follows)
          let isFollows = false;
          childSnapshot.val().follows.forEach((followsId: string) => {
            if (followsId === 'AJv5bZn6aEeIL3SDutVeoBVrR8F3') {
              isFollows = true;
            }
          });
          console.log('Is follows', isFollows);

          fetchUser.push({
            id: childSnapshot.key,
            isFollows: isFollows,
            ...childSnapshot.val()
          });
        });
        console.log('User', fetchUser)
        return fetchUser;
      }
    });

  };

  return (
    <div>
      <AsyncSelect
        isMulti={true}
        onInputChange={(value) => setQuery(value)}
        loadOptions={loadOptions}
        onChange={(value) => props.setCollabs(value)}
        getOptionLabel={(e) => e.displayName}
        getOptionValue={(e) => e.userId}
      />
    </div>
  );
}


export default AsyncSearchBar;