import React, { useContext } from 'react';
import PostItem from './PostItemComponent';
import PostContext from '../context/post-context';

function PostList() {
    const {state, dispatch} = useContext(PostContext);
    return(
        state.posts.map((post: any)=>(
            <PostItem
                key={post.id}
                post={post}
                user={state.user}
                dispatch={dispatch}
            />
        ))
    );
};

export default PostList;