// Singup.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignup } from '../../redux/auth/authSlice';
import './reservation.css';

export default function NewReservation() {
  const dispatch = useDispatch();
  const { ebikes } = useSelector((state) => state.ebikeSlice);

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;

    const arr = [f.name.value, f.email.value, f.password.value,
      f.passwordConfirmation.value, f.role.value];

    if (arr.some((item) => item.trim().length === 0)) return;

    const data = {
      name: arr[0],
      email: arr[1],
      password: arr[2],
      password_confirmation: arr[3],
      role: arr[4],
    };

    dispatch(fetchSignup(data));
    // form.reset();
  };

  return (
    <div className="mx-0 px-28">
      <h1 className="text-black text-5xl">New Reservation</h1>

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
            ebikes.map((item) => (
              <option key={item.id} value={`${item.id}`}>{item.city}</option>
            ))
          }
          </select>
        </div>

        <button type="submit">Book</button>

      </form>

    </div>
  );
}
