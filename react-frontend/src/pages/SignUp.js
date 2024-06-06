import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/SignUp.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailAvailable, setEmailAvailable] = useState(false);
    const [emailCheckMessage, setEmailCheckMessage] = useState('이메일 확인');
    const [emailCheckError, setEmailCheckError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [submitMessage, setSubmitMessage] = useState('');

    const isEmailValid = (email) => {
        // 이메일 형식 확인을 위한 정규 표현식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        // 비밀번호 형식 확인을 위한 정규 표현식 (6자 이상, 영어와 숫자 포함, 특수문자 허용)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;
        return passwordRegex.test(password);
    };

    const handleEmailCheck = async () => {
        if (!isEmailValid(email)) {
            setEmailCheckError('유효한 이메일 주소를 입력하세요.');
            setEmailCheckMessage('이메일 확인');
            return;
        }
        try {
            // 이메일 중복 확인을 위한 임시 API 호출
            // 현재는 항상 이메일 중복이 아닌 것으로 처리
            setEmailAvailable(true);
            setEmailError('');
            setEmailCheckMessage('사용할 수 있는 이메일입니다');
            setEmailCheckError('');
        } catch (error) {
            setEmailAvailable(false);
            setEmailError('이미 사용중인 이메일입니다');
            setEmailCheckMessage('이미 사용중인 이메일입니다');
            setEmailCheckError('');
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (!isPasswordValid(newPassword)) {
            setPasswordError('비밀번호 형식을 지켜주세요');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/user/register', { email, password });
            setSubmitMessage(`${email}으로 회원가입 완료!`);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setEmailAvailable(false);
            setEmailCheckMessage('이메일 확인');
        } catch (error) {
            setSubmitMessage('회원가입 실패');
        }
    };

    const isFormValid = emailAvailable && password && confirmPassword && password === confirmPassword && isPasswordValid(password);

    return (
        <div>
            <Header />
            <div className='signup-content noto-sans-kr-400'>
                <div className='signup-container'>
                    <h3 className='signup-title'>회원가입</h3>
                    <form className='signup-form' onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            name="email" 
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailAvailable(false);
                                setEmailError('');
                                setEmailCheckMessage('이메일 확인');
                                setEmailCheckError('');
                                setSubmitMessage('');
                            }}
                            className={`noto-sans-kr-400 signup-input ${emailAvailable ? 'email-available' : ''}`}
                            placeholder="이메일 주소"
                            required
                        />
                        <button type="button" 
                            className={`check-button sign-up-button noto-sans-kr-400 ${emailCheckError ? 'error' : emailAvailable ? 'email-checked' : ''}`} 
                            onClick={handleEmailCheck}
                            disabled={emailAvailable}>{emailCheckError || emailCheckMessage}</button>
                        {emailError && <p className="error">{emailError}</p>}
                        <input 
                            className='noto-sans-kr-400 signup-input'
                            type="password" 
                            name="password" 
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="비밀번호 (영문·숫자 포함 6자 이상)"
                            required
                        />
                        <input 
                            className='noto-sans-kr-400 signup-input'
                            type="password" 
                            name="confirmPassword" 
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setSubmitMessage('');
                            }}
                            placeholder="비밀번호 확인"
                            required
                        />
                        <div className='check-phrase'>
                            {passwordError && <p className="mismatch">{passwordError}</p>}
                            {!passwordError && password && confirmPassword && (
                                <p className={password === confirmPassword ? 'match' : 'mismatch'}>
                                    {password === confirmPassword ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                                </p>
                            )}
                        </div>
                        <button type="submit" 
                            className={`sign-up-button noto-sans-kr-400 ${isFormValid ? 'submit-enabled' : 'submit-disabled'}`}
                            disabled={!isFormValid}>회원가입</button>
                        {submitMessage && (
                            <div className='signup-result'>
                                <p className={`noto-sans-kr-400 ${submitMessage.includes('완료') ? 'success-message' : 'error-message'}`}>
                                    {submitMessage}
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
