// const postReducer = (state: any, action: any) => {
//     switch (action.type) {
//         case 'POPULATE_POSTS':
//             return {
//                 posts: action.posts,
//             };
//         case 'ADD_POST':
//             return [...state, action.post];
//         case 'REMOVE_POST':
//             return state.filter((post: any)=> post.id !== action.id);
//         case 'EDIT_POST':
//             return state.map((post: any)=> {
//                 if(post.id === action.id){
//                     return{
//                         ...post,
//                         ...action.updates
//                     }
//                 } else {
//                     return post;
//                 }
//             });
//         case 'ADD_USER':
//             return {
//                 user: action.user
//             }
//         default:
//             return state;
//     }
// };

// export { postReducer as default };
const postReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'POPULATE_POSTS':
            return {
                posts: action.posts,
                user: action.user
            };
        case 'ADD_POST':
            return {
                posts: [...state.posts, action.post],
                user: action.user
            };
        case 'REMOVE_POST':
            return {
                posts: state.posts.filter((post: any) => post.id !== action.id),
                user: action.user
            };
        case 'EDIT_POST':
            return {
                posts: state.posts.map((post: any) => {
                    if (post.id === action.id) {
                        return {
                            ...post,
                            ...action.updates
                        }
                    } else {
                        return post;
                    }
                }),
                user: action.user
            };
        case 'ADD_USER':
            return {
                posts: [],
                user: action.user
            }
        case 'REMOVE_USER':
            return {
                posts: [],
                user: {}
            }
        default:
            return state;
    }
};

export { postReducer as default };