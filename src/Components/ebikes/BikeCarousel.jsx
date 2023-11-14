import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ebikes.css';
import BikeCard from './BikeCard';
import NavigationPanel from '../NavigationPanel';


// eslint-disable-next-line no-unused-vars
const BikeCarousel = ({ bikes: mockBikes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const moveSlide = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((currentIndex - 1 + mockBikes.length) % mockBikes.length);
    } else if (direction === 'next') {
      setCurrentIndex((currentIndex + 1) % mockBikes.length);
    }
  };

  return (
    <div className="carousel-container">
      <button
        type="button"
        className={`arrow-left ${currentIndex === 0 ? 'inactive' : 'active'}`}
        onClick={() => moveSlide('prev')}
      >
        {' '}
        {'<'}
        {' '}
      </button>

      <div className="bike-slides">
        {mockBikes
          .slice(currentIndex, currentIndex + (isMobile ? 1 : 3))
          .map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
      </div>

      <button
        type="button"
        className={`arrow-right ${
          currentIndex === mockBikes.length - 1 ? 'inactive' : 'active'
        }`}
        onClick={() => moveSlide('next')}
      >
        {' '}
        {'>'}
        {' '}
      </button>
      <NavigationPanel />
    </div>
  );
};

BikeCarousel.propTypes = {
  bikes: PropTypes.shape.isRequired,
};

export default BikeCarousel;
