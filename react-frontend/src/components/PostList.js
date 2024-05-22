import React from 'react';
import Post from './Post';
import '../styles/Post.css';

const PostList = ({ posts }) => (
    <div className="post-list">
        {posts.map((post, index) => (
            <div className="post-item" key={index}>
                <Post post={post} />
            </div>
        ))}
    </div>
);

export default PostList;
