// src/components/EbikeForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import addEbike from '../redux/actions/ebikeActions';

const EbikeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    image: '',
    description: '',
    price: '',
    city: '',
    weight: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEbike(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model" />
      <input type="" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
      <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EbikeForm;
