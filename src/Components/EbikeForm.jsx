// YourComponent.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import addEbike from '../redux/actions/ebikeActions';
import  {TextField}  from '@mui/material';
import { postEbike } from '../redux/ebike/ebikeSlice';

function YourComponent() {
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
      <form onSubmit={handleSubmit}>
        <div className="">
          <TextField name="name" value={ebikeData.name} onChange={handleChange} label="set your name" variant="outlined" type="text" />
        </div>
        <div className="">
          <select type="text" name="model" value={ebikeData.model} onChange={handleChange} placeholder="Model">
            <option value="Pedego-bike">Pedego</option>
            <option value="Rad Power Bikes">Rad Power Bikes</option>
            <option value="Specialized Turbo">Rad Power Bikes</option>
            <option value="Haibike">Haibike</option>
            <option value="Gazelle">Gazelle</option>
            <option value="Trek Electric Bikes">Trek Electric Bikes</option>
            <option value="Raleigh Electric">Raleigh Electric</option>
            <option value="Juiced Bikes">Juiced Bikes</option>
            <option value="Ariel Rider">Ariel Rider</option>
            <option value="Riese & Mülle">Riese & Mülle</option>
          </select>
        </div>
        <div className="">
          <input type="text" name="image" value={ebikeData.image} onChange={handleChange} placeholder="Image URL" />
        </div>
        <div className="">
          <textarea name="description" value={ebikeData.description} onChange={handleChange} placeholder="Description" />
        </div>
        <div className="">
          <input type="number" name="price" value={ebikeData.price} onChange={handleChange} placeholder="Price" />
        </div>
        <div className="">
          <input type="text" name="city" value={ebikeData.city} onChange={handleChange} placeholder="City" />
        </div>
        <div className="">
          <input type="number" name="weight" value={ebikeData.weight} onChange={handleChange} placeholder="Weight" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default YourComponent;
