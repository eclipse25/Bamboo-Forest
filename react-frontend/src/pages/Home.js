import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import '../styles/Home.css';

function Home() {
    return (
        <div>
            <Header />
            <main className='bdr'>
                <p className="description">Welcome to the home page!</p>
            </main>
        </div>
    );
    }

export default Home;
