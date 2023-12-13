import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './reservation.css';
import { addReservation, fetchReservations } from '../../redux/reservation/reservationSlice';
import MyCalendar from './MyCalendar';
import MirrorCover from './cover';
import Loading from '../Loading';

const NewReservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogined } = useSelector((state) => state.authSlice);
  const { isSuccess: isReserveSuccess } = useSelector((state) => state.reservationSlice);
  const { locations, isLoading: locationLoading } = useSelector((state) => state.locationSlice);

  const { ebikes } = useSelector((state) => state.ebikeSlice);
  const { id } = useParams();

  const [bikeId, setBikeId] = useState(id.includes(':id') ? null : Number(id));

  const bike = bikeId ? ebikes.find((item) => item.id === bikeId) : null;

  const [city, setCity] = useState(bikeId && bike ? bike.city : null);
  const sameCityBikes = city ? ebikes.filter((item) => item.city === city) : [];

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
    if (e.currentTarget.value) {
      setCity(e.currentTarget.value);
      setBikeId(null); // reset calendar
    }
  };

  const handleBikeModel = (e) => {
    if (e.currentTarget.value) setBikeId(Number(e.currentTarget.value));
  };

  if (locationLoading) return <Loading />;

  return (
    <div className="reservation-page">

      <MirrorCover />

      <h2 className="auth-title reservation-title">BOOK A TEST-RIDE</h2>

      <MyCalendar bikeId={bikeId} />

      <form className="reservation-form" onSubmit={handleSubmit}>

        <div className="date-input">
          <h5>City : </h5>
          <select
            name="city"
            onChange={handleBikeCity}
            className="reservation-input city-selection"
          >
            <option key={v4()} value={null}>Select your city</option>
            {
            locations.map((item) => {
              if (item === city) {
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
          <select
            name="ebike"
            onChange={handleBikeModel}
            className="reservation-input"
          >
            <option key={v4()} value={null}>Select bike model</option>

            {
            sameCityBikes.map((item) => {
              if (item.id === bikeId) {
                return (
                  <option key={v4()} value={item.id} selected>
                    {`${item.model?.toUpperCase()} - ${item.id}`}
                  </option>
                );
              }

              return (
                <option key={v4()} value={item.id}>
                  {`${item.model?.toUpperCase()} - ${item.id}`}
                </option>
              );
            })
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
    </div>
  );
};

export default NewReservation;
