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
import MyReservations from './Components/reservations/MyReservations';
import Mainpage from './Components/ebikes/Mainpage';
// import { fetchReservation } from './redux/reservation/reservationSlice';
import SpecificBike from './Components/ebikes/SpecificBike';
import NewReservation from './Components/reservations/NewReservation';
import { resetMessage } from './redux/auth/authSlice';
import { fetchLocations } from './redux/location/locationSlice';
import Message from './Message';

import { fetchReservations, resetReservationMessage } from './redux/reservation/reservationSlice';
import EbikeForm from './Components/ebikes/EbikeForm';
import { fetchEbikeModels } from './redux/ebike_models/ebikeModelSlice';
import { resetAddEbikeMessage } from './redux/ebike/addingNewbike';

function App() {
  const dispatch = useDispatch();
  const { message, isLogined } = useSelector((state) => state.authSlice);
  const { reservationMessage } = useSelector((state) => state.reservationSlice);
  const { addEbikeMessage } = useSelector((state) => state.addingEbikeSlice);

  useEffect(() => {
    dispatch(fetchEbike());
    if (isLogined) dispatch(fetchLocations());
    if (isLogined) dispatch(fetchReservations());
    if (isLogined) dispatch(fetchEbikeModels());
  }, [dispatch, isLogined]);

  useEffect(() => {
    setTimeout(() => {
      if (message) dispatch(resetMessage());
      if (reservationMessage) dispatch(resetReservationMessage());
      if (addEbikeMessage) dispatch(resetAddEbikeMessage());
    }, 2000);
  }, [message, dispatch, reservationMessage, addEbikeMessage]);

  return (
    <div className="myApp">
      { message && <Message message={message} /> }
      { reservationMessage && <Message message={reservationMessage} />}
      { addEbikeMessage && <Message message={addEbikeMessage} />}

      <Router>
        <div className="App">
          <Routes>
            <Route path="/myreservations" element={<MyReservations />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addEbike" element={<EbikeForm />} />

            <Route path="/" element={<Homepage />} />

            <Route path="/ebikes/:id/reservations/new" element={<NewReservation />} />
            <Route path="/ebikes" element={<Mainpage />} />
            <Route path="/ebikes/:id" element={<SpecificBike />} />
          </Routes>
        </div>
      </Router>
    </div>

  );
}

export default App;
