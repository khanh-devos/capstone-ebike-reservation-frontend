import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/reservation/reservationSlice';

function MyReservations() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  console.log('token', token);
  const { reservations } = useSelector((state) => state.reservationSlice);
  useEffect(() => {
    dispatch(fetchReservations());
  }, []);
  console.log('reservations', reservations);
  return (
    <div className="flex justify-center  items-center">
      <h1>MyReservations</h1>
      <div>
        {reservations.length > 0 ? reservations.map((reservation) => (
          <div key={reservation.id}>
            <p>{reservation.ebike_id}</p>
            <p>{reservation.user_id}</p>
            <p>{reservation.start_time}</p>
            <p>{reservation.end_time}</p>
          </div>
        )) : <p>no reservations</p>}
      </div>
    </div>
  );
}

export default MyReservations;
