import React, { useEffect, useState } from 'react';
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

function App() {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.authSlice);
  const [showMessage, setShowingMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchEbike());
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    setShowingMessage(true);
    setTimeout(() => {
      setShowingMessage(false);
      dispatch(resetMessage());
    }, 2000);
  }, [message, dispatch]);

  return (
    <Router>

      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ebikes" element={<Mainpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
