// YourComponent.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postEbike } from '../redux/ebike/addingNewbike';

function EbikeForm() {
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
      <form onSubmit={handleSubmit} className="getInput">
        <h1>Add your new ebike</h1>
        <div className="">
          <input required name="name" value={ebikeData.name} onChange={handleChange} label="set your name" type="text" placeholder="add your name" />
        </div>
        <div className="">
          <select type="text" required name="model" value={ebikeData.model} onChange={handleChange} placeholder="Model">
            <option selected hidden value="Pedego-bike">Select your ebike</option>
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
          <input type="text" required name="image" value={ebikeData.image} onChange={handleChange} placeholder="Image URL" />
        </div>
        <div className="">
          <textarea name="description" required value={ebikeData.description} onChange={handleChange} placeholder="Description" />
        </div>
        <div className="">
          <input type="number" required name="price" value={ebikeData.price} onChange={handleChange} placeholder="Price" />
        </div>
        <div className="">
          <select type="text" required name="city" value={ebikeData.city} onChange={handleChange} placeholder="City">
            <option selected hidden value="Pedego-bike">Select your city</option>
            <option value="Kigali">Kigali</option>
            <option value="Zambia">Zambia</option>
            <option value="Ghana">Ghana</option>
            <option value="Tanzania">Tanzania</option>
            <option value="India">India</option>
            <option value="Congo(drc)">Congo(drc)</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Zimbabwe">Zimbabwe</option>
            <option value="Uganda">Uganda</option>
          </select>
        </div>
        <div className="">
          <input type="number" required name="weight" value={ebikeData.weight} onChange={handleChange} placeholder="Weight" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EbikeForm;
