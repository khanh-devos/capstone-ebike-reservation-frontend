import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

import Loginpage from './Components/auth/Loginpage';
import Homepage from './Components/Homepage';
import { fetchEbike } from './redux/ebike/ebikeSlice';
import Signup from './Components/auth/Signup';
import Mainpage from './Components/ebikes/Mainpage';
import Reservations from './Components/reservations/Reservations';
import { fetchReservation } from './redux/reservation/reservationSlice';
import SpecificBike from './Components/ebikes/SpecificBike';
import NewReservation from './Components/reservations/NewReservation';

function App() {
  const dispatch = useDispatch();
  const { isLogined } = useSelector((state) => state.authSlice);

  useEffect(() => {
    dispatch(fetchEbike());
  }, [dispatch, isLogined]);

  return (
    <Router>

      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ebikes" element={<Mainpage />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/reservations/new" element={<NewReservation />} />
          <Route path="/bike/:id" element={<SpecificBike />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
