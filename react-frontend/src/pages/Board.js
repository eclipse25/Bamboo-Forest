import React, { useState, useEffect, useRef } from 'react';
import '../styles/Board.css';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import PostList from '../components/PostList';

function Board() {
    const { school_code } = useParams();
    const [boardInfo, setBoardInfo] = useState(null);
    const [postContent, setPostContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const isButtonDisabled = postContent.trim() === '';
    const textareaRef = useRef(null);

    useEffect(() => {
        async function fetchBoardInfo() {
            try {
                const response = await fetch(`http://localhost:8000/api/board_info/${school_code}`);
                const data = await response.json();
                setBoardInfo(data);
            } catch (error) {
                console.error('Error fetching board info:', error);
            }
        }

        fetchBoardInfo();
    }, [school_code]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/posts/board/${school_code}`);
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    
    useEffect(() => {
        fetchPosts();
    }, [school_code]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [postContent]);

    const handleInputChange = (e) => {
        setPostContent(e.target.value);
    };

    const handleTagInputChange = (e) => {
        setCurrentTag(e.target.value);
    };

    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const trimmedTag = `#${currentTag.trim()}`;
            if (trimmedTag !== '#' && !hashtags.includes(trimmedTag)) {
                setHashtags([...hashtags, trimmedTag]);
                setCurrentTag('');
            }
        }
    };

    const handleTagClick = (tagToRemove) => {
        setHashtags(hashtags.filter(tag => tag !== tagToRemove));
    };

    const handleDeletePasswordChange = (e) => {
        setDeletePassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (postContent.trim()) {
            console.log('Posting:', postContent);

            const postData = {
                board_id: school_code,
                content: postContent,
                delete_key: deletePassword,
                hashtags: hashtags.map(tag => tag.replace('#', ''))
            };

            try {
                const response = await fetch('http://localhost:8000/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                });

                if (!response.ok) {
                    throw new Error('Failed to post');
                }

                const result = await response.json();
                console.log('Post successful:', result);

                // 초기화
                setPostContent('');
                setHashtags([]);
                setCurrentTag('');
                setDeletePassword('');

                window.location.reload();
            } catch (error) {
                console.error('Error posting:', error);
            }
        }
    };

    return (
        <div>
            <Header />
            <div className='content'>
                <Menu />
                <div className='board noto-sans-kr-400'>
                    <div className='board-header'>
                        <div className='board-info'>
                            <h2 className='board-title'>{boardInfo ? boardInfo.school_name : 'Loading...'}</h2>
                            <div className='board-detail'>
                                <p className='board-address'>{boardInfo ? boardInfo.address : 'Loading...'}</p>
                            </div>
                        </div>
                        <div className='board-state'>
                            <span>{boardInfo ? boardInfo.category : 'Loading...'}</span>
                            <span>정렬기준</span>
                        </div>
                    </div>
                    <div className="post-input-container br">
                        <textarea
                            ref={textareaRef}
                            value={postContent}
                            onChange={handleInputChange}
                            placeholder="하고 싶은 말을 적어주세요."
                            className="post-input noto-sans-kr-400"
                            rows={1}
                        />
                        <div className='post-input-bottom'>
                            <div className='left-bottom-input'>
                                <div className="tag-input-container">
                                    <div className="tags noto-sans-kr-400">
                                        {hashtags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="tag"
                                                onClick={() => handleTagClick(tag)}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="tag-input-wrapper">
                                        <span className="tag-prefix noto-sans-kr-400">#</span>
                                        <input
                                            type="text"
                                            value={currentTag}
                                            onChange={handleTagInputChange}
                                            onKeyPress={handleTagKeyPress}
                                            className="tag-input noto-sans-kr-400"
                                            placeholder="태그"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='right-bottom-input'>
                                <input
                                    className='delete_key noto-sans-kr-400'
                                    placeholder='비밀번호 입력시 삭제 가능'
                                    value={deletePassword}
                                    onChange={handleDeletePasswordChange}
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={isButtonDisabled}
                                    className={`post-submit-button noto-sans-kr-400 ${isButtonDisabled ? 'disabled' : 'active'}`}
                                >
                                    게시하기
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='board-posts'>
                        <PostList posts={posts} fetchPosts={fetchPosts}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board;