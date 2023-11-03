import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import './index.css';
import Loginpage from './Components/Loginpage';
import Singup from './Components/Singup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Singup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
