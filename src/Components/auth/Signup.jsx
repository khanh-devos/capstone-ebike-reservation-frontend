// Singup.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchSignup } from '../../redux/auth/authSlice';
import './auth.css';

function Signup() {
  const dispatch = useDispatch();

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
      <h1 className="text-black text-5xl">Signup Welcome here</h1>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          className="signup-input"
          placeholder="Name"
          type="text"
          name="name"
          autoComplete
          required
        />

        <input
          className="signup-input"
          placeholder="Email"
          type="email"
          name="email"
          required
        />

        <input
          className="signup-input"
          placeholder="Password"
          type="password"
          name="password"
          value="@manda123"
          required
        />

        <input
          className="signup-input"
          placeholder="Password confirmation"
          type="password"
          name="passwordConfirmation"
          value="@manda123"
          required
        />

        <select name="role">
          <option value="client">client</option>
          <option value="admin">admin</option>
        </select>

        <button type="submit">Sign up</button>

      </form>

    </div>
  );
}

export default Signup;