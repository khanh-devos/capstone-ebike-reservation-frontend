import { useDispatch } from 'react-redux';
import { fetchLogin } from '../../redux/auth/authSlice';
import './auth.css';

function Loginpage() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const [name, password] = [form.name.value, form.password.value];
    if (!name.trim() || !password.trim()) return;

    const data = { name, password };

    dispatch(fetchLogin(data));
    form.reset();
  };

  return (
    <div className="mx-0 px-28">
      <h1 className="text-black text-5xl">Login Welcom here</h1>

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
        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default Loginpage;
