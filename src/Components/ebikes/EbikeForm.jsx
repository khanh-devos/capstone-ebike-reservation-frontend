// YourComponent.js
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { postEbike } from '../../redux/ebike/addingNewbike';
import NavigationPanel from '../NavigationPanel';

const EbikeForm = () => {
  const dispatch = useDispatch();
  const { locations } = useSelector((state) => state.locationSlice);
  const { ebikeModels } = useSelector((state) => state.ebikeModelSlice);

  const [ebikeData, setEbikeData] = useState({
    name: '',
    model: '',
    image: '',
    description: 'This is a description.',
    price: 0,
    city: '',
    weight: 0,
  });

  const handleChange = (e) => {
    setEbikeData({ ...ebikeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(ebikeData).some((item) => item.trim() === '')) return;

    dispatch(postEbike(ebikeData));
    setEbikeData({
      name: '',
      model: '',
      image: '',
      description: '',
      price: 0,
      city: '',
      weight: 0,
    });
  };

  return (
    <div className="mainclass">
      <form onSubmit={handleSubmit} className="getInput">
        <h1>Add your new ebike</h1>
        <div className="ebike-input">
          <input
            required
            name="name"
            value={ebikeData.name}
            onChange={handleChange}
            type="text"
            placeholder="Your name"
          />
        </div>
        <div className="ebike-model-input">
          <h3>Model:</h3>
          <select type="text" required name="model" value={ebikeData.model} onChange={handleChange}>
            <option value="">Select your ebike model</option>
            {
            ebikeModels.map((item) => (
              <option key={v4()} value={`${item}`}>{item}</option>
            ))
            }
          </select>
        </div>
        <div className="ebike-input">
          <input type="text" required name="image" value={ebikeData.image} onChange={handleChange} placeholder="Image URL" />
        </div>
        <div className="ebike-input">
          <textarea name="description" required value={ebikeData.description} onChange={handleChange} placeholder="Description" />
        </div>
        <div className="ebike-price-input">
          <h3>Price(£)</h3>
          <input type="number" required name="price" value={ebikeData.price} onChange={handleChange} placeholder="Price" />
        </div>
        <div className="ebike-location-input">
          <h3>Location:</h3>
          <select
            type="text"
            required
            name="city"
            value={ebikeData.city}
            onChange={handleChange}
            placeholder="City"
          >
            <option value="">Select your city</option>
            {
            locations.map((item) => (
              <option key={v4()} value={`${item}`}>{item}</option>
            ))
            }

          </select>
        </div>

        <div className="ebike-weight-input">
          <h3>Weight(pound):</h3>
          <input type="number" required name="weight" value={ebikeData.weight} onChange={handleChange} placeholder="Price" />
        </div>

        <button type="submit">Submit</button>
      </form>
      <NavigationPanel />
    </div>
  );
};

export default EbikeForm;
