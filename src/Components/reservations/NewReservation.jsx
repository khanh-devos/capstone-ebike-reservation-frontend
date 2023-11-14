import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './reservation.css';
import { addReservation, fetchReservations } from '../../redux/reservation/reservationSlice';
import MyCalendar from './MyCalendar';
import MirrorCover from './cover';
import NavigationPanel from '../NavigationPanel';

const NewReservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogined } = useSelector((state) => state.authSlice);
  const { isSuccess: isReserveSuccess } = useSelector((state) => state.reservationSlice);
  const { locations } = useSelector((state) => state.locationSlice);

  const { ebikes } = useSelector((state) => state.ebikeSlice);
  const { id } = useParams();
  const lastbike = ebikes[ebikes.length - 1];
  const [bikeId, setBikeId] = useState(id.includes(':id') ? lastbike?.id : id);

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

      <MirrorCover />

      <h2 className="auth-title reservation-title">BOOK A TEST-RIDE</h2>

      <MyCalendar bikeId={bikeId} />

      <form className="reservation-form" onSubmit={handleSubmit}>

        <div className="date-input">
          <h5>Select Your City : </h5>
          <select name="city" onChange={handleBikeCity} className="reservation-input city-selection">
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
          {
          sameCityBikes.length > 0
          && (
          <select name="ebike" onChange={handleBikeModel} className="reservation-input">
            {
            sameCityBikes.map((item) => (
              <option key={v4()} value={item.id}>
                {`${item.model.toUpperCase()} - ${item.id}`}
              </option>
            ))
            }
          </select>
          )
          }

          {
            sameCityBikes.length === 0 && <h3 className="reservation-select-alert">CURRENTLY NO SERVICE IN THIS CITY</h3>
          }
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

        <button className="submit-btn" type="submit">BOOK</button>

      </form>
      <NavigationPanel />
    </div>
  );
};

export default NewReservation;
