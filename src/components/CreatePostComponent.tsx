import React from 'react';
import AddPostForm from './AddPostFormComponent';

function CreatePost() {
    return(
        <div>
            <AddPostForm
                formType='create'
            />
        </div>
    );
};

export default CreatePost;