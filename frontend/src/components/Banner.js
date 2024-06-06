import React from 'react';
import '../styles/Banner.css';
import bannerImage from '../assets/images/wanted_ad.jpg';

function Banner() {
    return (
        <div className="banner">
            <a href="https://www.wanted.co.kr/" target="_blank" rel="noopener noreferrer">
                <img src={bannerImage} alt="대나무숲" className="banner-image" />
            </a>
        </div>
    );
}

export default Banner;