import React, { useState, useEffect, useRef } from 'react';
import '../styles/Board.css';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';

function Board() {
    const { school_code } = useParams();
    const [boardInfo, setBoardInfo] = useState(null);
    const [postContent, setPostContent] = useState('');
    const [hashtags, setHashtags] = useState([]);
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

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [postContent]);

    
    const handleInputChange = (e) => {
        const input = e.target.value;
        setPostContent(input);

        // 해시태그 감지
        const detectedHashtags = input.match(/#[^\s#]+/g);
        setHashtags(detectedHashtags || []);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (postContent.trim()) {
            console.log('Posting:', postContent);
            setPostContent(''); // 제출 후 입력 필드 초기화
            setHashtags([]); // 해시태그 초기화
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
                    <div className="post-input-container">
                        <textarea
                            ref={textareaRef}
                            value={postContent}
                            onChange={handleInputChange}
                            placeholder="전하고 싶은 말을 적어주세요."
                            className="post-input noto-sans-kr-400"
                            rows={1}
                        />
                        
                        <button
                            onClick={handleSubmit}
                            disabled={isButtonDisabled}
                            className={`post-submit-button noto-sans-kr-400 ${isButtonDisabled ? 'disabled' : 'active'}`}
                        >
                            게시하기
                        </button>
                    </div>
                    <div className='board-posts'>
                        <div>
                            <span>포스트</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board;