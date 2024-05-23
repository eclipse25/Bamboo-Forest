import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecentBoardsContext } from './RecentBoardsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import '../styles/Menu.css';

function Menu() {
    const { recentBoards, removeBoard } = useContext(RecentBoardsContext);

    return (
        <div className='menu noto-sans-kr-400'>
            <div className='recent-visited'>
                <div className='recent-visited-title'>
                    <h4 className=''>최근 방문한 게시판</h4>
                </div>
                <ul>
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
        </div>
    );
}

export default Menu;