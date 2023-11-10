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
  const { ebikes } = useSelector((state) => state.ebikeSlice);

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

  useEffect(() => {
    if (!isLogined) navigate('/');
    if (reservationSuccess) dispatch(fetchReservations());
  }, [dispatch, navigate, isLogined, reservationSuccess]);

  return (
    <div className="reservation-page">
      <h2><strong>NEW RESERVATION</strong></h2>

      <MyCalendar />

      <form className="reservation-form" onSubmit={handleSubmit}>

        <div className="date-input">
          <h5>Ebike : </h5>
          <select name="ebike">
            {
            ebikes.map((item) => {
              if (item.id === Number(id)) {
                return (
                  <option key={v4()} value={item.id} selected>
                    {item.name.toUpperCase()}
                    -
                    {item.id}
                  </option>
                );
              }

              return (
                <option key={v4()} value={item.id}>
                  {item.name.toUpperCase()}
                  -
                  {item.id}
                </option>
              );
            })
          }
          </select>
        </div>

        <div className="date-input">
          <h5>From : </h5>
          <input
            className="reservation-input"
            placeholder="Starting date"
            type="date"
            name="startingDate"
            required
          />
        </div>

        <div className="date-input">
          <h5>To : </h5>
          <input
            className="reservation-input"
            placeholder="Ending date"
            type="date"
            name="endingDate"
            required
          />
        </div>

        <div className="date-input">
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
