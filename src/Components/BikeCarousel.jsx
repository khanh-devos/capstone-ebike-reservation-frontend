import React, { useState } from 'react';
import BikeCard from './BikeCard';

const BikeCarousel = ({ bikes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveSlide = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((currentIndex - 1 + bikes.length) % bikes.length);
    } else {
      setCurrentIndex((currentIndex + 1) % bikes.length);
    }
  };

  return (
    <div className="carousel-container">
      <button onClick={() => moveSlide('prev')}>Previous</button>
      <div className="bike-slides">
        {bikes.slice(currentIndex, currentIndex + 3).map((bike, index) => (
          <BikeCard key={index} bike={bike} />
        ))}
      </div>
      <button onClick={() => moveSlide('next')}>Next</button>
    </div>
  );
};

export default BikeCarousel;
