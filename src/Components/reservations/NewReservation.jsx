// Singup.js
import React from 'react';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './reservation.css';
import { addReservation } from '../../redux/reservation/reservationSlice';
import NavigationPanel from '../NavigationPanel';

export default function NewReservation() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { locations } = useSelector((state) => state.locationSlice);

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;

    const arr = [f.startingDate.value, f.endingDate.value, f.city.value];

    if (arr.some((item) => item.trim().length === 0)) return;

    const data = {
      starting_date: arr[0],
      ending_date: arr[1],
      location: arr[2],
      ebike_id: id,
    };

    dispatch(addReservation(data));
    // form.reset();
  };

  return (
    <div className="reservation-page">
      <h2 className=""><strong>NEW RESERVATION</strong></h2>

      <form className="reservation-form" onSubmit={handleSubmit}>

        <div>
          <h5>Starting Date : </h5>
          <input
            className="reservation-input"
            placeholder="Starting date"
            type="date"
            name="startingDate"
            autoComplete
            required
          />
        </div>

        <div>
          <h5>Ending Date : </h5>
          <input
            className="reservation-input"
            placeholder="Ending date"
            type="date"
            name="endingDate"
            required
          />
        </div>

        <div>
          <h5>City : </h5>
          <select name="city">
            {
            locations.map((item) => (
              <option key={v4()} value={`${item}`}>{item}</option>
            ))
          }
          </select>
        </div>

        <button className="submit-btn" type="submit">SUBMIT</button>

      </form>

      <NavigationPanel />

    </div>
  );
}
