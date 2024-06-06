import React, { useState, useEffect } from 'react';
import Post from './Post';
import '../styles/Post.css';

const PostList = ({ posts, fetchPosts }) => {
    const [postList, setPostList] = useState(posts);

    useEffect(() => {
        setPostList(posts);
    }, [posts]);

    return (
        <div className="post-list">
            {postList.map((post, index) => (
                <div className="post-item" key={index}>
                    <Post post={post} fetchPosts={fetchPosts} />
                </div>
            ))}
        </div>
    );
};
export default PostList;
