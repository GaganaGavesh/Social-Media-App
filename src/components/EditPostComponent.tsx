import React from 'react';
import AddPostForm from './AddPostFormComponent';

const EditPost = (props: any)=> {
    //console.log(props.match.params.id)
    return(
        <div>
            <AddPostForm 
                postIdForEdit={props.match.params.id}
                formType='edit' 
            />
        </div>
    );
};

export default EditPost;