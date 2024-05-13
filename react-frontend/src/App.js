import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './styles/App.css';

import Home from './pages/Home';
import Board from './pages/Board';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/:school_code" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
