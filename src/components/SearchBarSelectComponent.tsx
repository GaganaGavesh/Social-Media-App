import React, { useState } from 'react';
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { refChildUsers } from '../firebase/firebase';


const AsyncSearchBar = (props: any) => {

  const [query, setQuery] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [collabs, setCollabs] = useState("");
  const animatedComponents = makeAnimated();

  const loadOptions = () => {
    return refChildUsers.orderByChild("displayName").startAt(query).endAt(`${query}\uf8ff`).once("value").then((snapshot: any) => {
      if (snapshot.exists()) {
        
        const fetchUser: any = [];

        snapshot.forEach((childSnapshot: any) => {
          fetchUser.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
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