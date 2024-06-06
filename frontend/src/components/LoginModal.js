import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/LoginModal.css';

const LoginModal = ({ show, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ email, password, rememberMe });
        onClose();
    };

    return (
        <>
            {show && (
                <div className="modal-overlay">
                    <div className="modal-content noto-sans-kr-400">
                        <div className="modal-header">
                            <h2><FontAwesomeIcon icon={faLock} size="sm"/> 로그인</h2>
                            <button className="close-button" onClick={onClose}>
                                <FontAwesomeIcon icon={faTimes} size="2x"/>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <input 
                                    className='noto-sans-kr-400'
                                    type="email" 
                                    name="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="이메일 주소"
                                    required
                                />
                                <input 
                                    className='noto-sans-kr-400'
                                    type="password" 
                                    name="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호"
                                    required
                                />
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="rememberMe" 
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    로그인 상태 유지
                                </label>
                                <button type="submit">로그인</button>
                            </form>
                            <div className="modal-footer">
                                <a href="#" className="footer-link">비밀번호 찾기</a>
                                <a href="/signup" className="footer-link">회원가입</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginModal;
