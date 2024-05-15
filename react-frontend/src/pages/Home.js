import React from 'react';
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
