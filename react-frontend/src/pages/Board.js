import React from 'react';
import '../styles/Board.css';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';

function Board() {
    const { school_code } = useParams();  // URL 파라미터 접근 방식

    return (
        <div>
            <Header />
            <div className='content bdr'>
                <Menu />
                <div className='board noto-sans-kr-400'>
                    <div className='board-header'>
                        <div className='board-info'>
                            <h2 className='board-title'>{school_code}</h2>
                            <p className='board-address'>{school_code}의 주소</p>
                        </div>
                        <div className='board-state'>
                            <span>기관 종류, 정렬 기준</span>
                        </div>
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