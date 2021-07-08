import React from 'react';
import { Link } from 'react-router-dom';
import { removePost } from '../actions/postActions'
import moment from 'moment';

function PostItem(props: any) {
    return (
        <div className="Post_container">
            <div className="PostItem_header_container">
                <img className="PostItem_profile_image rounded-circle" src={props.post.userProfileImageUrl} alt="" />
                <div className="PostItem_header_container_name_date">
                    <p><strong>{props.post.name}</strong></p>
                    <p>{moment(props.post.createdAt).format("MMM Do YYYY")}</p>
                </div>         
            </div>
            <p className="PostItem_description">{props.post.description}</p>
            <img src={props.post.imageUrl} className="Post_Image img-thumbnail"></img>
            <div className="PostItem_buttons">
                <Link to={`/edit/${props.post.id}`}>
                    <button 
                        disabled={props.post.userId !== props.user.uid ? true: false}
                        className="btn btn-secondary">Edit Post
                    </button>
                </Link>
                <button
                    disabled={props.post.userId !== props.user.uid ? true: false}
                    onClick={() =>
                        props.dispatch(removePost(props.post.id, props.user))}
                    className="btn btn-info">
                    Remove Post
                </button>
            </div>
        </div>
    );
};

export default PostItem;