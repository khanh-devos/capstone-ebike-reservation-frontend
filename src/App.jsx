import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

import Loginpage from './Components/auth/Loginpage';
import Homepage from './Components/Homepage';
import Singup from './Components/auth/Singup';
import { fetchEbike } from './redux/ebike/ebikeSlice';
import EbikeIndex from './Components/ebike/EbikeIndex';

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.loginSlice);

  useEffect(() => {
    dispatch(fetchEbike(data));
  }, [dispatch, data]);

  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/ebikes">Ebikes</Link>

      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/ebikes" element={<EbikeIndex />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
