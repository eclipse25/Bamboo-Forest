import React, { useEffect, useContext, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { RecentBoardsProvider, RecentBoardsContext } from './components/RecentBoardsContext';
import Header from './components/Header';
import Menu from './components/Menu';
import Board from './pages/Board'; // 게시판 컴포넌트 예시
import Home from './pages/Home'; // 홈 컴포넌트 예시

const TrackLocation = () => {
  const location = useLocation();
  const { addBoard } = useContext(RecentBoardsContext);
  const lastPathRef = useRef(location.pathname);

  const fetchSchoolData = async (school_code) => {
      try {
          const response = await fetch(`http://localhost:8000/api/board_info/${school_code}`);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Failed to fetch school data:', error);
          return null;
      }
  };

  const updateVisitedBoards = async () => {
      const pathParts = location.pathname.split('/');
      if (pathParts[1] === 'board' && pathParts[2]) {
          const school_code = pathParts[2];
          const schoolData = await fetchSchoolData(school_code);
          if (schoolData) {
              const { school_name, address, category } = schoolData;
              const newVisitedBoard = { school_code, school_name, address, category };
              addBoard(newVisitedBoard);
          }
      }
  };

  // 페이지가 처음 로드될 때
  useEffect(() => {
      updateVisitedBoards();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 위치가 변경될 때
  useEffect(() => {
      if (lastPathRef.current !== location.pathname) {
          lastPathRef.current = location.pathname;
          updateVisitedBoards();
      }
  }, [location.pathname]);

  return null;
};


function App() {
    return (
        <RecentBoardsProvider>
            <Router>
                <TrackLocation />  {/* This component will track location changes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/board/:school_code" element={<Board />} />
                </Routes>
            </Router>
        </RecentBoardsProvider>
    );
}

export default App;
