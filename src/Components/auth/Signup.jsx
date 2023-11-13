// Singup.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSignup } from '../../redux/auth/authSlice';
import MirrorCover from '../reservations/cover';
import './auth.css';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogined } = useSelector((state) => state.authSlice);

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
    f.reset();
  };

  useEffect(() => {
    if (isLogined) navigate('/ebikes');
  }, [isLogined, navigate]);

  return (
    <div className="signup-page">
      <h2 className="auth-title">REGISTER</h2>

      <MirrorCover />

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
          required
        />

        <input
          className="signup-input"
          placeholder="Password confirmation"
          type="password"
          name="passwordConfirmation"
          required
        />

        <div className="signup-select">
          <h3 className="singup-select-title">Role:</h3>
          <select name="role" className="signup-input">
            <option value="client">client</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <button className="submit-btn" type="submit">Sign up</button>

      </form>

      <Link to="/login" className="auth-link">To The Login Page</Link>

    </div>
  );
}

export default Signup;
