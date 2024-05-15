import React, { useState, useEffect } from 'react';
import '../styles/Board.css';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';

function Board() {
    const { school_code } = useParams();
    const [boardInfo, setBoardInfo] = useState(null);

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


    return (
        <div>
            <Header />
            <div className='content bdr'>
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