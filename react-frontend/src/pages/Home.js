import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

function Home() {
    // 검색어 상태와 검색 결과 상태를 관리하는 useState 훅 사용
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
    const [isFocused, setIsFocused] = useState(false); // 입력 필드의 포커스 상태
    const navigate = useNavigate();

    // Debounced handleSearch 함수
    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (query.length >= 2) {
                try {
                    const response = await fetch(`http://localhost:8000/api/schools/?school_name=${query}`);
                    if (!response.ok) {
                        throw new Error('Search failed');
                    }
                    const data = await response.json();
                    setSearchResults(data); // 직접 data 사용
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
            debouncedSearch.cancel();  // 컴포넌트 언마운트 시 디바운싱 취소
        }
    }, [searchTerm, debouncedSearch]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    const handleSchoolClick = (school_code) => {
        navigate(`/board/${school_code}`);
    };

    return (
        <div>
            <header className="bdr">
                <nav>
                    <div className="container bdr">
                        <div className="nav-header bdr">
                            <h1 className="title bdr">Bada</h1>
                        </div>
                        <label className="search">
                            {!isFocused && <span className="search-icon"><FontAwesomeIcon icon={faSearch} size="1x" /></span>}
                            <input
                                className="search-bar"
                                value={searchTerm}
                                onChange={handleSearch}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
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
                                        <li key={index} onClick={() => handleSchoolClick(result.school_code)}>
                                            <div className="result-title">{result.school_name}</div>
                                            <div className="result-address">{result.address}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </label>
                        <ul className="nav-menu bdr">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main className='bdr'>
                <p className="description">Welcome to the home page!</p>
            </main>
        </div>
    );
    }

export default Home;
