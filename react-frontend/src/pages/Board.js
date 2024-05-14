import React from 'react';
import '../styles/Board.css';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

function Board() {
    const { school_code } = useParams();  // URL 파라미터 접근 방식

    return (
        <div>
            <Header />
            <div className='content bdr'>
                <h1>게시판: {school_code}</h1>
                <p>이곳은 {school_code}의 게시판입니다.</p>
                {/* 추가적인 게시판 내용 또는 기능 구현 */}
            </div>
        </div>
    );
}

export default Board;