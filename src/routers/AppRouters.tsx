import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreatePost from '../components/CreatePostComponent';
import EditPost from '../components/EditPostComponent';
import Header from '../components/HeaderComponent';
import LoginPage from '../components/LoginPageComponent';
import PostDashboard from '../components/PostDashboardComponent';
import SearchList from '../components/SearchListComponent';


function AppRouter() {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    {/* <Route path="/" component={LoginPage} exact={true} /> */}
                    {/* <Route path="/dashboard" component={PostDashboard}/> */}
                    <Route path="/dashboard" component={PostDashboard} exact={true}/>
                    <Route path="/create" component={CreatePost} />
                    <Route path="/follow" component={SearchList}/>
                    <Route path="/edit/:id" component={EditPost} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;