import React from 'react';
import PropTypes from 'prop-types';

const BikeCard = ({ bike }) => (
  <div className="bike-card">
    <img className="img-bike" src={bike.image} alt={bike.name} />
    <h2 className="name-bike">{bike.name}</h2>
    <p className="bike-description">{bike.description}</p>

  </div>
);

BikeCard.propTypes = {
  bike: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default BikeCard;
