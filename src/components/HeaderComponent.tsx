import React, { useContext } from 'react';
import { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import LoginPage from '../components/LoginPageComponent';
import PostContext from '../context/post-context'

function Header() {
    const { state, dispatch } = useContext(PostContext);

    useEffect(()=>{

    },[state.user]);
    return (
        <header className="App-header">
            <h2 className="header_title">ABCD Media</h2>
            {Object.keys(state.user).length !== 0 &&
                <div>
                    <NavLink to="/dashboard" activeClassName="is-active" exact={true} className="nav-links">Go to posts</NavLink>
                    <NavLink to="/create" activeClassName="is-active" className="nav-links">Create Post</NavLink>
                    <NavLink to="/follow" activeClassName="is-active" className="nav-links">Follow Users</NavLink>
                    <img className="PostItem_profile_image rounded-circle" src={state.user.photoURL} alt="" />
                    {state.user.displayName}
                </div>
            }
            <LoginPage/>
        </header>
    );
};

export default Header;