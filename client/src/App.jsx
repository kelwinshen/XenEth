import logo_image from './assets/xeneth.png'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ChangeName from './components/ChangeName';
import Donate from './components/Donate';
import Home from './components/Home';


function App() {
  
  return (
    <Router>
      <div className="w-full bg-[#353535]">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/change-name" element={<ChangeName />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
