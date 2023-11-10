import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../../redux/reservation/reservationSlice';
import './reservation.css';
import NavigationPanel from '../NavigationPanel';

function MyReservations() {
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.reservationSlice);
  const { user } = useSelector((state) => state.authSlice);
  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);
  return (
    <div className="flex justify-center items-center container">
      <h1 className="title">
        {`${user.name}s Reservations`}
      </h1>
      <div className="container">
        { reservations && reservations.length > 0
          ? (
            <div className="table">
              <div className="table_row">
                <div className="table_header_item">Ebike</div>
                <div className="table_header_item">Location</div>
                <div className="table_header_item">From</div>
                <div className="table_header_item">To</div>

              </div>
              {
            reservations
              .filter((item) => item.user_id === user.id)
              .map((reservation) => (
                <div key={reservation.id} className="table_row">
                  <div className="table_item">{reservation.ebike.name}</div>
                  <div className="table_item">{reservation.location}</div>
                  <div className="table_item">{reservation.formated_starting_date}</div>
                  <div className="table_item">{reservation.formated_ending_date}</div>

                </div>
              ))
            }
            </div>
          )
          : <p>no reservations</p>}
      </div>
      <NavigationPanel />
    </div>
  );
}

export default MyReservations;
