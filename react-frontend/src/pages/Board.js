import React from 'react';
import { useParams } from 'react-router-dom';

function Board() {
    const { school_code } = useParams();  // URL 파라미터 접근 방식

    return (
        <div>
            <h1>게시판: {school_code}</h1>
            <p>이곳은 {school_code}의 게시판입니다.</p>
            {/* 추가적인 게시판 내용 또는 기능 구현 */}
        </div>
    );
}

export default Board;