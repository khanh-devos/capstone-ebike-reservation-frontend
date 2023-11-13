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
  const { locations } = useSelector((state) => state.locationSlice);

  const { ebikes } = useSelector((state) => state.ebikeSlice);
  const { id } = useParams();
  const [bikeId, setBikeId] = useState(id || ebikes.length - 1);

  const bike = ebikes.find((item) => item.id === Number(bikeId));
  const sameCityBikes = ebikes.filter((item) => item.city === bike?.city);

  useEffect(() => {
    if (!isLogined) navigate('/');
    if (isReserveSuccess) dispatch(fetchReservations());
  }, [dispatch, navigate, isLogined, isReserveSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;

    const arr = [f.startingDate.value, f.endingDate.value, f.city.value];

    if (!bikeId) return;
    if (arr.some((item) => item.trim().length === 0)) return;

    const data = {
      starting_date: arr[0],
      ending_date: arr[1],
      location: arr[2],
      ebike_id: bikeId,
    };

    dispatch(addReservation(data));
    f.reset();
  };

  const handleBikeCity = (e) => {
    const selectBike = ebikes.find((item) => item.city === e.currentTarget.value);
    setBikeId(selectBike?.id);
  };

  const handleBikeModel = (e) => {
    setBikeId(Number(e.currentTarget.value));
  };

  return (
    <div className="reservation-page">

      <img
        className="reservation-page-background"
        alt="reservarion-background"
        src={bike?.image || 'https://cdn.shopify.com/s/files/1/1439/6088/files/thin.jpg?width=100;height:100'}
      />

      <div className="reservation-page-bg-cover" />

      <h2><strong>NEW RESERVATION</strong></h2>

      <MyCalendar bikeId={bikeId} />

      <form className="reservation-form" onSubmit={handleSubmit}>

        <div className="date-input">
          <h5>Select Your City : </h5>
          <select name="city" onChange={handleBikeCity}>
            {
            locations.length > 0 && locations.map((item) => {
              if (item === bike?.city) {
                return <option key={v4()} value={`${item}`} selected>{item}</option>;
              }

              return <option key={v4()} value={`${item}`}>{item}</option>;
            })
          }
          </select>
        </div>

        <div className="date-input">
          <h5>Model: </h5>
          <select name="ebike" onChange={handleBikeModel}>
            {
            sameCityBikes.length > 0
              ? sameCityBikes.map((item) => (
                <option key={v4()} value={item.id}>
                  {`${item.model.toUpperCase()} - ${item.id}`}
                </option>
              ))
              : <option value={-1}>NO SERVICE IN THIS CITY !</option>
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
