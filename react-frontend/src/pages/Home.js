import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import PostList from '../components/PostList';
import '../styles/Home.css';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`http://localhost:8000/api/posts/all`);
                const data = await response.json();
                setPosts(data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, []);

    return (
        <div>
            <Header />
            <div className='content'>
                <Menu />
                <div className='board noto-sans-kr-400'>
                    <div className='board-header'>
                            <div className='board-info'>
                                <h2 className='board-title'>모든 포스트</h2>
                                <div className='board-detail'></div>
                            </div>
                            <div className='board-state'>
                                <span className='posttip'>게시글 작성은 각 게시판에서!</span>
                                <span>정렬기준</span>
                            </div>
                    </div>
                    <div className='board-posts'>
                        <PostList posts={posts} />
                    </div>
                </div>
            </div>
        </div>
    );
    }

export default Home;
