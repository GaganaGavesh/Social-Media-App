// import database from '../firebase/firebase';

// // export const addPost = (post: any) =>({
// //     type: 'ADD_POST',
// //     post
// // });

// export const addPost = (post: any) => {
//     database.ref('posts').push(post).then((ref: any) => {
//         const postWithId = {
//             id: ref.key,
//             ...post
//         };
//     }).catch((e: any) => {
//         console.log(e);
//         alert('Unable to add the post !');
//         return e;
//     });
//     return {
//         type: 'ADD_POST',
//         post
//     }
// };

// export const removePost = (id: any) => {
//     const path = `posts/${id}`;
//     database.ref(path).remove().then(()=>{
//         console.log('Item removed');
//     }).catch((e: any)=>{
//         console.log(e);
//         //alert('Unable to remove post !');
//     });

//     return {
//         type: 'REMOVE_POST',
//         id: id
//     }
// };

// export const editPost = (id: any, updates: any) => {
//     const path = `posts/${id}`;
//     database.ref(path).update({
//         ...updates
//     }).then(()=> console.log('Updated Successfully !'))
//     .catch((e: any)=>{
//         console.log(e);
//     });
//     return {
//         type: 'EDIT_POST',
//         id: id,
//         updates: updates
//     }
// };

// export const populatePosts = (posts: any) => ({
//     type: 'POPULATE_POSTS',
//     posts: posts
// });
import database from '../firebase/firebase';

// export const addPost = (post: any) =>({
//     type: 'ADD_POST',
//     post
// });

export const addPost = (post: any, user: any) => {
    database.ref('posts').push(post).then((ref: any) => {
        const postWithId = {
            id: ref.key,
            ...post
        };
    }).catch((e: any) => {
        console.log(e);
        alert('Unable to add the post !');
        return e;
    });
    return {
        type: 'ADD_POST',
        post: post,
        user: user
    }
};

export const removePost = (id: any, user: any) => {
    const path = `posts/${id}`;
    database.ref(path).remove().then(()=>{
        console.log('Item removed');
    }).catch((e: any)=>{
        console.log(e);
        //alert('Unable to remove post !');
    });

    return {
        type: 'REMOVE_POST',
        id: id,
        user: user
    }
};

export const editPost = (id: any, updates: any, user: any) => {
    const path = `posts/${id}`;
    database.ref(path).update({
        ...updates
    }).then(()=> console.log('Updated Successfully !'))
    .catch((e: any)=>{
        console.log(e);
    });
    return {
        type: 'EDIT_POST',
        id: id,
        updates: updates,
        user: user
    }
};

export const populatePosts = (posts: any, user: any) => ({
    type: 'POPULATE_POSTS',
    posts: posts,
    user: user
});

export const addUser = (posts: any, user: any) => ({
    type: 'ADD_USER',
    posts: posts,
    user: user
});

export const removeUser = (posts: any, user: any) => ({
    type: 'REMOVE_USER',
    posts: {},
    user: user
});