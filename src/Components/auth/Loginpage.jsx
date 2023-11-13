import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../redux/auth/authSlice';
import './auth.css';

function Loginpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogined } = useSelector((state) => state.authSlice);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const [name, password] = [form.name.value, form.password.value];
    if (!name.trim() || !password.trim()) return;

    const data = { name, password };

    dispatch(fetchLogin(data));
    form.reset();
  };

  useEffect(() => {
    if (isLogined) navigate('/ebikes');
  }, [isLogined, navigate]);

  return (
    <div className="login-page">
      <h2 className="auth-title">WELCOME</h2>

      <img
        className="reservation-page-background"
        alt="reservarion-background"
        src="https://cdn.shopify.com/s/files/1/1439/6088/files/thin.jpg?width=100;height:100"
      />

      <div className="reservation-page-bg-cover" />

      <form className="login-form" onSubmit={handleSubmit}>

        <input
          className="login-input"
          placeholder="Name"
          type="text"
          name="name"
          autoComplete
        />

        <input
          className="login-input"
          placeholder="Password"
          type="password"
          name="password"
        />
        <button className="submit-btn" type="submit">Login</button>

      </form>

      <Link to="/signup" className="auth-link">To the Signup page</Link>

    </div>
  );
}

export default Loginpage;
