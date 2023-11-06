import React from 'react';

const BikeCard = ({ bike }) => {
  return (
    <div className="bike-card">
      <img src={bike.image} alt={bike.name} />
      <h2>{bike.name}</h2>
      
    </div>
  );
};

export default BikeCard;
