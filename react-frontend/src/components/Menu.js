import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Menu.css';

function Menu() {
    return (
        <div className='menu noto-sans-kr-400'>
            <div className='recent-visited'>
                <div className='recent-visited-title bdr'>
                    <h4>최근 방문한 게시판</h4>
                </div>
            </div>
        </div>
    );
}

export default Menu;