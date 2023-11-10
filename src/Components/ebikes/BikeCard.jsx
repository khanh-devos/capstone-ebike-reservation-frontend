import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BiLogoTwitter, BiLogoFacebook, BiLogoInstagram,
} from 'react-icons/bi';
import { setEbike } from '../../redux/ebike/ebikeSlice';

function BikeCard({ bike }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickAbike = () => {
    dispatch(setEbike(bike));
    console.log('bike from the card', bike);
    navigate(`/ebikes/${bike.id}`);
  };

  return (
    <div className="card" onClick={clickAbike}>
      <div className="bike-card">
        <img className="img-bike" src={bike.image} alt={bike.name} />
        <h2 className="name-bike">{bike.name}</h2>
        <p className="bike-description">{bike.description}</p>
      </div>
      <ul className="container-icons-card">
        <li className="logo-card-Facebook"><NavLink to="/"><BiLogoFacebook /></NavLink></li>
        <li className="logo-card-Twitter"><NavLink to="/"><BiLogoTwitter /></NavLink></li>
        <li className="logo-card-Instagram"><NavLink to="/"><BiLogoInstagram /></NavLink></li>
      </ul>
    </div>
  );
}

BikeCard.propTypes = {
  bike: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default BikeCard;
