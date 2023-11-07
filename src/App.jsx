import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Loginpage from './Components/Loginpage';
import Singup from './Components/Singup';
import EbikeForm from './Components/EbikeForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/addingbike" element={<EbikeForm />} />
          {/* <Route path="/mainpage" element={<Mainpage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
