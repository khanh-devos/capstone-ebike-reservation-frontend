// YourComponent.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import addEbike from '../../redux/actions/ebikeActions';

function Ebikeform() {
  const dispatch = useDispatch();

  const [ebikeData, setEbikeData] = useState({
    name: '',
    model: '',
    image: '',
    description: '',
    price: 0,
    city: '',
    weight: 0,
  });

  const handleChange = (e) => {
    setEbikeData({ ...ebikeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEbike(ebikeData));
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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={ebikeData.name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="model" value={ebikeData.model} onChange={handleChange} placeholder="Model" />
        <input type="text" name="image" value={ebikeData.image} onChange={handleChange} placeholder="Image URL" />
        <textarea name="description" value={ebikeData.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="price" value={ebikeData.price} onChange={handleChange} placeholder="Price" />
        <input type="text" name="city" value={ebikeData.city} onChange={handleChange} placeholder="City" />
        <input type="number" name="weight" value={ebikeData.weight} onChange={handleChange} placeholder="Weight" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Ebikeform;
