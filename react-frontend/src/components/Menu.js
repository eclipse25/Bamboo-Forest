import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecentBoardsContext } from './RecentBoardsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../styles/Menu.css';

const api = axios.create({
    baseURL: 'http://localhost:8000', // 백엔드의 기본 URL을 설정
});

function Menu() {
    const { recentBoards, removeBoard } = useContext(RecentBoardsContext);
    const [trendingBoards, setTrendingBoards] = useState([]);

    useEffect(() => {
        // 트렌딩 게시판 데이터 불러오기
        async function fetchTrendingBoards() {
            try {
                const response = await api.get('/api/boards/trending');
                console.log("Trending Boards Response:", response.data);

                const boardsWithNames = await Promise.all(response.data.map(async (board) => {
                    const boardResponse = await api.get(`/api/board_info/${board.board_id}`);
                    console.log(`Fetched info for board ${board.board_id}:`, boardResponse.data);
                    return {
                        ...board,
                        board_name: boardResponse.data.school_name
                    };
                }));

                console.log("Boards with names:", boardsWithNames);
                setTrendingBoards(boardsWithNames);
            } catch (error) {
                console.error("Failed to fetch trending boards:", error);
            }
        }

        fetchTrendingBoards();
    }, []);

    return (
        <div className='menu noto-sans-kr-400'>
            <div className='recent-visited'>
                <div className='recent-visited-title'>
                    <h4 className=''>최근 방문한 게시판</h4>
                </div>
                <ul className='section-content'>
                    {recentBoards.map((board, index) => (
                        <li key={index} className="recent-board-item">
                            <Link to={`/board/${board.school_code}`}>
                                {board.school_name}
                            </Link>
                            <span className="remove-button" onClick={() => removeBoard(board.school_code)}>
                                <FontAwesomeIcon icon={faX} className='x-icon'/>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='trending-board'>
                <div className='trending-board-title'>
                    <h4 className=''>주간 트렌드 게시판</h4>
                </div>
                <ul className='section-content'>
                    {trendingBoards.map((board, index) => (
                        <li key={index} className="trending-board-item">
                            <Link to={`/board/${board.board_id}`}>
                                {board.board_name}
                            </Link>
                            <span className='trending-increased'>+ {board.post_count}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Menu;
