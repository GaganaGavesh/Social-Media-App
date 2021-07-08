import React, { useContext } from 'react';
import PostList from './PostListComponent';
import PostContext from '../context/post-context'

function PostDashboard() {
    const { state, dispatch } = useContext(PostContext);

    return(
        <div>
            {Object.keys(state.user).length == 0 || state.posts.length == 0 ?
                <p className="PostItem_title">Sorry, No posts available !</p>: 
                <p className="PostItem_title">Scroll for see new posts !</p>
            }
            <PostList/> 
        </div>
    );
};

export default PostDashboard;