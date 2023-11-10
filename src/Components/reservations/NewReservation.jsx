import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './reservation.css';
import { addReservation, fetchReservations } from '../../redux/reservation/reservationSlice';
import NavigationPanel from '../NavigationPanel';
import MyCalendar from './MyCalendar';

export default function NewReservation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLogined } = useSelector((state) => state.authSlice);
  const { locations } = useSelector((state) => state.locationSlice);
  const { reservationSuccess } = useSelector((state) => state.reservationSlice);

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;

    const arr = [f.bookingDate.value, f.city.value];

    if (arr.some((item) => item.trim().length === 0)) return;

    const data = {
      book_date: arr[0],
      location: arr[1],
      ebike_id: id,
    };

    dispatch(addReservation(data));
    // form.reset();
  };

  useEffect(() => {
    if (!isLogined) navigate('/');
    if (reservationSuccess) dispatch(fetchReservations());
  }, [dispatch, navigate, isLogined, reservationSuccess]);

  return (
    <div className="reservation-page">
      <h2><strong>{`NEW RESERVATION (ebikeID : ${id})`}</strong></h2>

      <MyCalendar />

      <form className="reservation-form" onSubmit={handleSubmit}>

        <div>
          <h5>Booking Date : </h5>
          <input
            className="reservation-input"
            placeholder="Booking date"
            type="date"
            name="bookingDate"
            autoComplete
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
