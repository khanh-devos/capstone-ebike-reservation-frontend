import React from 'react';
import PropTypes from 'prop-types';

const BikeCard = ({ bike }) => (
  <div className="bike-card">
    <img src={bike.image} alt={bike.name} />
    <h2>{bike.name}</h2>

  </div>
);

BikeCard.propTypes = {
  bike: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default BikeCard;
