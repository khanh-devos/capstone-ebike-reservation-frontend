import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ebikes.css';
import BikeCard from './BikeCard';

const mockBikes = [
  {
    id: 1,
    name: 'EcoRider 500',
    description: 'An elegant and efficient electric bicycle for your daily commute.',
    image: 'https://media.bcompras.com.mx/iFSz4S0PZCusaaKK1RvtSbd2.webp',
  },
  {
    id: 2,
    name: 'VoltXpress ZR2',
    description: 'The perfect companion to explore the city with speed and comfort.',
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_904305-MLA48736887155_012022-F.webp',
  },
  {
    id: 3,
    name: 'UrbanGlide Pro',
    description: 'A versatile and modern electric bicycle that adapts to your lifestyle.',
    image: 'https://media.bcompras.com.mx/tVmMvJPOxrykcPSk2roMyqOx.webp',
  },
  {
    id: 4,
    name: 'EcoMotion X3',
    description: 'Experimenta la libertad de moverte de manera sostenible con esta e-bike.',
    image: 'https://media.bcompras.com.mx/RUFTQuCiAjO0SVYA4SF4W3Po.webp',
  },
  {
    id: 5,
    name: 'SpeedRider S1',
    description: 'Experience the freedom of moving sustainably with this e-bike.',
    image: 'https://media.bcompras.com.mx/F0OGrsgu8eZV3kw2MLbpJnSJ.webp',
  },
  {
    id: 6,
    name: 'CityCommuter E7',
    description: 'Ride around town in style and efficiency on this modern e-bike.',
    image: 'https://media.bcompras.com.mx/yYuGNeaCO1J1aHHsQhbhzwbJ.webp',
  },
];

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
        {mockBikes.slice(currentIndex, currentIndex + 3).map((bike) => (
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
