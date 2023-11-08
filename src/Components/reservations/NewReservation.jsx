

// Singup.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignup } from '../../redux/auth/authSlice';
import './auth.css';

function NewReservation() {
  const dispatch = useDispatch();

  const { ebikes } = useSelector(state => state.ebikeSlice)

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
        <input
          className="reservation-input"
          placeholder="Starting date"
          type="text"
          name="startingDate"
          autoComplete
          required
        />

        <input
          className="reservation-input"
          placeholder="Ending date"
          type="date"
          name="endingDate"
          required
        />

        <select name="city">
        {
          ebikes.map((item) => (
            <option value={`${item.id}`}>{item.city}</option>
          ))
        }
        </select>

        <button type="submit">Sign up</button>

      </form>

    </div>
  );
}

export default Signup;
