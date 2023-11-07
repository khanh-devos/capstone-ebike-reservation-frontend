import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BikeCard from './BikeCard';
import './ebikes.css';

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
      <button type="button" onClick={() => moveSlide('prev')}>Previous</button>

      <div className="bike-slides">
        {bikes.slice(currentIndex, currentIndex + 1).map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>

      <button type="button" onClick={() => moveSlide('next')}>Next</button>
    </div>
  );
};

BikeCarousel.propTypes = {
  bikes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default BikeCarousel;
