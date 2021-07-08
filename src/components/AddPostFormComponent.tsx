import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import PostContext from '../context/post-context'
import { addPost, editPost } from '../actions/postActions'
import moment from 'moment';
import { useEffect } from 'react';

const AddPostForm = (props: any) => {
    var defaultDescription = '';
    var defaultUrl = '';

    const { state, dispatch } = useContext(PostContext);
    const history = useHistory();

    let formTitle = '';
    if(props.formType == 'edit'){
        formTitle = 'Edit Post';
    } else if(props.formType == 'create'){
        formTitle = 'Create Post';
    }

    let isLoggedIn = false;
    if(Object.keys(state.user).length == 0){
        isLoggedIn = false;
    }else{
        isLoggedIn = true;
    }

    if (props.postIdForEdit) {
        const postforEdit = state.posts.find((post: any) => {
            return post.id === props.postIdForEdit;
        })
        defaultDescription = postforEdit.description;
        defaultUrl = postforEdit.imageUrl;
    }

    const [description, setDescription] = useState(defaultDescription);
    const [imgUrl, setImageUrl] = useState(defaultUrl);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!imgUrl || !description)
            setError('You can not add post without any content !');
        else
            setError('');
    }, [description, imgUrl]);

    const addpost = (e: any) => {
        e.preventDefault();

        const post = {
            name: state.user.displayName,
            userId: state.user.uid,
            userProfileImageUrl: state.user.photoURL,
            createdAt: moment().valueOf(),
            description: description,
            imageUrl: imgUrl
        }

        if (!imgUrl || !description) {

        } else {
            if (!props.postIdForEdit || false) {
                dispatch(addPost(post, state.user));
            } else {
                dispatch(editPost(
                    props.postIdForEdit,
                    {
                        description: description,
                        imageUrl: imgUrl
                    },
                    state.user
                ));
            }
            setDescription('');
            setImageUrl('');
            history.push('/dashboard')
        }
    }

    return (
        <div>
            {!isLoggedIn && <p className="Error_text">Please log in !</p>}
            {isLoggedIn && <div className="Post_form">
                <h3 className="Post_form Post_form_title">{formTitle}</h3>
                <form onSubmit={addpost}>
                    {error && <p className="Error_text">{error}</p>}
                    <div className="form-group">
                        <label className="Post_form_subtitles">Post description</label>
                        <textarea
                            className="form-control"
                            placeholder="Add post deccription here!"
                            rows={7}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        {imgUrl && <img src={imgUrl} className="Post_form_image" />}
                    </div>
                    <div className="form-group">
                        <label className="Post_form_subtitles">Image URL</label>
                        <input
                            className="form-control"
                            placeholder="Add image URL !"
                            value={imgUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>

                    <button disabled={error ? true : false} className="btn btn-success">Add Post</button>
                </form>
            </div>}
        </div>
    );
}

export default AddPostForm;