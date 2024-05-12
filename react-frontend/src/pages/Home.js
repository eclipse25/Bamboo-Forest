import React, { useState } from 'react';
import '../styles/Home.css';

function Home() {
    // 검색어 상태와 검색 결과 상태를 관리하는 useState 훅 사용
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // 검색어가 변경될 때마다 호출되는 함수
    const handleSearch = (event) => {
        const { value } = event.target; // 입력된 검색어 가져오기
        setSearchTerm(value); // 검색어 상태 업데이트

        // 두 글자 이상 입력된 경우에만 검색 결과 가져오기
        if (value.length >= 2) {
            // 검색 결과를 가져오는 API 호출 또는 데이터 처리 로직
            // 예시: fetchSearchResults(value).then(results => setSearchResults(results));
        } else {
            // 검색어가 두 글자 미만인 경우 검색 결과 초기화
            setSearchResults([]);
        }
    };
    return (
        <div>
            <header className="bdr">
                <nav>
                    <div className="container bdr">
                        <div className="nav-header bdr">
                            <h1 className="title bdr">Bada</h1>
                        </div>
                        <label className="search bdr">
                            <input
                                className="search-bar"
                                value={searchTerm}
                                onChange={handleSearch} // onChange 이벤트 핸들러 추가
                                placeholder="검색어를 입력하세요..."
                            />
                            {/* 드롭다운 영역 */}
                            {searchResults.length > 0 && (
                                <ul className="dropdown">
                                    {searchResults.map(result => (
                                        <li key={result.id}>{result.title}</li>
                                    ))}
                                </ul>
                            )}
                            <span></span>
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
