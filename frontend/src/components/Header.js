import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce';
import Cookies from 'js-cookie';
import LoginModal from './LoginModal';
import '../styles/Header.css';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const navigate = useNavigate();

    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (query.length >= 2) {
                try {
                    const response = await fetch(`http://localhost:8000/api/schools/?school_name=${query}`);
                    if (!response.ok) {
                        throw new Error('Search failed');
                    }
                    const data = await response.json();
                    setSearchResults(data);
                } catch (error) {
                    console.error(error);
                    setSearchResults([]);
                }
            } else {
                setSearchResults([]);
            }
        }, 300),
        []
    );

    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm, debouncedSearch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search')) {
                setIsFocused(false);
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    const handleSchoolClick = async (school_code, school_name, address, category) => {
        try {
            const response = await fetch('http://localhost:8000/api/check_or_create_board', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ school_code, school_name, address, category })
            });
            if (!response.ok) {
                throw new Error('Failed to check or create board');
            }

            // 방문한 게시판 정보를 쿠키에 저장
            const visitedBoards = Cookies.get('visitedBoards') ? JSON.parse(Cookies.get('visitedBoards')) : [];
            const newVisitedBoard = { school_code, school_name, address, category };
            
            // 중복 방지를 위해 기존에 존재하는지 확인 후 추가
            const boardExists = visitedBoards.some(board => board.school_code === school_code);
            if (!boardExists) {
                visitedBoards.push(newVisitedBoard);
                Cookies.set('visitedBoards', JSON.stringify(visitedBoards), { expires: 7 });
            }

            // 쿠키에 저장 (JSON 문자열로 변환)
            Cookies.set('visitedBoards', JSON.stringify(visitedBoards), { expires: 7 });

            setIsFocused(false);
            setSearchResults([]);
            navigate(`/board/${school_code}`);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    return (
        <div id="header" role="banner">
            <nav>
                <div className="container">
                    <div className="nav-header">
                        <h1 className="">
                            <Link to="/" className="title-text gugi-regular">대나무숲</Link>
                        </h1>
                    </div>
                    <label className="search">
                        {!isFocused && <span className="search-icon"><FontAwesomeIcon icon={faSearch} size="1x" /></span>}
                        <input
                            className="search-bar noto-sans-kr-400"
                            value={searchTerm}
                            onChange={handleSearch}
                            onFocus={() => setIsFocused(true)}
                            placeholder="학교 이름으로 게시판 검색"
                            aria-label="Search input"
                        />
                        {isFocused && (
                            <span className="clear-icon" onClick={clearSearch} role="button" tabIndex="0" style={{ cursor: 'pointer' }}
                                  aria-label="Clear search">
                                <FontAwesomeIcon icon={faTimes} size="1x" />
                            </span>
                        )}
                        {searchResults.length > 0 && (
                            <ul className="dropdown">
                                {searchResults.map((result, index) => (
                                    <li key={index} onMouseDown={() => handleSchoolClick(
                                            result.school_code, 
                                            result.school_name, 
                                            result.address,
                                            result.category)}>
                                        <div className="result-title">{result.school_name}</div>
                                        <div className="result-address">{result.address}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </label>
                    <div className='header-right'>
                        <ul className="nav-menu">
                            <div></div>
                            <button onClick={openLoginModal} className="login noto-sans-kr-400">로그인</button>
                        </ul>
                    </div>
                </div>
            </nav>
            <LoginModal show={isLoginModalOpen} onClose={closeLoginModal} />
        </div>
    );
}

export default Header;
