import React from 'react';

export interface Post {
    id: number;
    name: string;
    createdAt: number;
    description: string;
    imageUrl: string
  }

const PostContext = React.createContext<any>([]);

export default PostContext;