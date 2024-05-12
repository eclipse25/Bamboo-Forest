import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import './styles/App.css';

import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
