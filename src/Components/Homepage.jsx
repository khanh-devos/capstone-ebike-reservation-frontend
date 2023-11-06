import '../index.css';
import { NavLink } from 'react-router-dom';
import NavigationPanel from './NavigationPanel';

const Homepage = () => (
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
    <NavigationPanel />
  </div>
);

export default Homepage;
