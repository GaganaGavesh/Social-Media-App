import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/appStyles.css';
import './styles/formStyles.css';
import './styles/headerStyles.css';
import './styles/postItemContainerStyles.css';
import './styles/searchBarStyles.css';
import SocialMediaApp from './components/SocialMediaAppComponent';
import SearchList from './components/SearchListComponent';
import './firebase/firebase';
import {startLogin} from './actions/authAction'
import LoginIn from './components/LoginPageComponent';
import { useEffect } from 'react';

function App() {
  return (
    <div>
      {/* <SocialMediaApp /> */}
      <SearchList/>
    </div>
  );
}

export default App;
