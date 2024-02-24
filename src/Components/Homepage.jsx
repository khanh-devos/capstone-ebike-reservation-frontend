import '../index.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const Homepage = () => {
  const navigate = useNavigate();
  const { isLogined } = useSelector((state) => state.authSlice);
  const { isLoading } = useSelector((state) => state.ebikeSlice);

  useEffect(() => {
    if (isLogined) navigate('/ebikes');
  }, [navigate, isLogined]);

  if (isLoading) return <Loading />;

  return (
    <div className="bgcontainer">
      <div className="getposition">
        <div className="flex justify-center  items-center">
          <h1 className="text-6xl w-full text-center text-white font-bold">THE NEW VESPA TRIDENT</h1>
        </div>
        <div className="flex justify-center items-center">
          <ul className="flex gap-4 mt-5">
            <li className="btnone">
              <NavLink to="/login">
                <h2 className="font-semibold">Login</h2>
              </NavLink>
            </li>
            <li className="btnone">
              <NavLink to="/signup">
                <h2 className="font-semibold">Sign Up</h2>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
