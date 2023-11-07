import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

import Loginpage from './Components/auth/Loginpage';
import Homepage from './Components/Homepage';
import { fetchEbike } from './redux/ebike/ebikeSlice';
import EbikeIndex from './Components/ebike/EbikeIndex';
import Signup from './Components/auth/Signup';

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
          <Route path="/ebikes" element={<EbikeIndex />} />
          {/* <Route path="/mainpage" element={<Mainpage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
