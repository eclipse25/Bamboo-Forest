import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/Post.css';

const Post = ({ post }) => {
    const [schoolName, setSchoolName] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [likes, setLikes] = useState(post.upvotes || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [postComment, setPostComment] = useState('');
    const [comments, setComments] = useState(post.comments || []);
    const textareaRef = useRef(null);

    useEffect(() => {
        const fetchSchoolName = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/board_info/${post.board_id}`);
                const data = await response.json();
                setSchoolName(data.school_name);
            } catch (error) {
                console.error('Error fetching school name:', error);
            }
        };

        const fetchPostDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/posts/${post.id}`);
                const data = await response.json();
                setLikes(data.upvotes);
                setComments(data.comments);
                const liked = Cookies.get(`like-${post.id}`);
                setIsLiked(Boolean(liked));
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchSchoolName();
        fetchPostDetails();
    }, [post.board_id, post.id]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [postComment]);

    const toggleComments = async () => {
        setShowComments(!showComments);
        if (!showComments) {
            await fetchComments();
        }
    };

    const incrementLikes = async () => {
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);

        if (newIsLiked) {
            try {
                const response = await fetch(`http://localhost:8000/api/posts/${post.id}/upvote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setLikes(data.upvotes);  // 서버에서 반환된 upvotes 값을 설정
                Cookies.set(`like-${post.id}`, 'true', { expires: 7 });
            } catch (error) {
                console.error('Error upvoting post:', error);
            }
        } else {
            try {
                const response = await fetch(`http://localhost:8000/api/posts/${post.id}/downvote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setLikes(data.upvotes);  // 서버에서 반환된 upvotes 값을 설정
                Cookies.remove(`like-${post.id}`);
            } catch (error) {
                console.error('Error downvoting post:', error);
            }
        }
    };

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/posts/${post.id}/comments`);
            const commentsData = await response.json();
            setComments(commentsData.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentChange = (e) => {
        setPostComment(e.target.value);
    };

    const submitComment = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/posts/${post.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: postComment
                })
            });
            await response.json();
            setPostComment('');
            fetchComments(); // 댓글 작성 후 새로운 댓글 목록을 다시 불러옴
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const hasTags = post.hashtags.length > 0;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className={`post ${!hasTags ? 'no-tag' : ''}`}>
            <div className='post-container'>
                <div className="post-index">
                    <div className='post-index-text'>
                        <Link to={`/board/${post.board_id}`}>{schoolName}</Link> #{post.id}
                    </div>
                    <p>{formatDate(post.created_at)}</p>
                </div>
                <div className="post-content">{post.content}</div>
                {hasTags && (
                    <div className="tags post-tag">
                        {post.hashtags.map((tag, index) => (
                            <span key={index} className="tag">#{tag}</span>
                        ))}
                    </div>
                )}
                <div className="post-actions">
                    <div className="post-comments-toggle" onClick={toggleComments}>
                        {showComments ? '댓글 닫기' : `댓글 ${comments.length}개 보기`}
                    </div>
                    <div className="post-like-button" onClick={incrementLikes}>
                        {isLiked ? '❤️' : '🤍'} {likes}
                    </div>
                </div>
            </div>
            {showComments && (
                <div className="post-comments">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <p>{comment.content}</p>
                                <p>{comment.created_at}</p>
                            </div>
                        ))
                    ) : (
                        <p className="comments-no-comments">아직 댓글이 없습니다.</p>
                    )}
                    <div className="comment-form">
                        <textarea
                            ref={textareaRef}
                            value={postComment}
                            placeholder="댓글 달기"
                            className="comment-input noto-sans-kr-400"
                            onChange={handleCommentChange}
                            rows={1} 
                        />
                        <button 
                            className="comment-input-button" 
                            type="button"
                            disabled={!postComment.trim()}
                            onClick={submitComment}
                        >
                            게시
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
