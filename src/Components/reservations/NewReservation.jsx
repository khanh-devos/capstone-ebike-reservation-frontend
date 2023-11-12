import React, { useEffect, useState } from 'react';
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
  const { isLogined } = useSelector((state) => state.authSlice);
  const { isSuccess: isReserveSuccess } = useSelector((state) => state.reservationSlice);

  const { ebikes } = useSelector((state) => state.ebikeSlice);
  const { id } = useParams();
  const [bikeId, setBikeId] = useState(Number(id));
  const latestEbike = ebikes[ebikes.length - 1];
  const bike = ebikes.find((item) => item.id === Number(bikeId)) || latestEbike;

  const sameModelBikes = ebikes.filter((item) => item.model === bike?.model);

  useEffect(() => {
    if (!isLogined) navigate('/');
    if (isReserveSuccess) dispatch(fetchReservations());
  }, [dispatch, navigate, isLogined, isReserveSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;

    const arr = [f.startingDate.value, f.endingDate.value, f.city.value];

    if (arr.some((item) => item.trim().length === 0)) return;

    const data = {
      starting_date: arr[0],
      ending_date: arr[1],
      location: arr[2],
      ebike_id: bikeId,
    };

    dispatch(addReservation(data));
    // f.reset();
  };

  const handleBikeId = (e) => {
    setBikeId(Number(e.currentTarget.value));
  };

  return (
    <div className="reservation-page">

      <img
        className="reservation-page-background"
        alt="reservarion-background"
        src={bike?.image}
      />

      <div className="reservation-page-bg-cover" />

      <h2><strong>NEW RESERVATION</strong></h2>

      <MyCalendar bikeId={bikeId} />

      <form className="reservation-form" onSubmit={handleSubmit}>

        <div className="date-input">
          <h5>Ebike Model: </h5>
          <select name="ebike" onChange={handleBikeId} value={bikeId}>
            {
            ebikes.length > 0 && ebikes.map((item) => (
              <option key={v4()} value={item.id}>
                {`${item.model.toUpperCase()} - ${item.id}`}
              </option>
            ))
          }
          </select>
        </div>

        <div className="date-input">
          <h5>Test-Ride City : </h5>
          <select name="city" onChange={handleBikeId}>
            {
            sameModelBikes.length > 0 && sameModelBikes.map((item) => {
              if (Number(item.id) === bikeId) {
                return <option key={v4()} value={`${item.id}`} selected>{item.city}</option>;
              }

              return <option key={v4()} value={`${item.id}`}>{item.city}</option>;
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

        <button className="submit-btn" type="submit">SUBMIT</button>

      </form>

      <NavigationPanel />

    </div>
  );
}
