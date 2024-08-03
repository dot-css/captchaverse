// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from './MenuBar';
import Home from './screens/Home';
import Referral from './screens/Referral';
import Events from './screens/Events';
import Task from './screens/Task';
import Profile from './screens/Profile';

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (window.Telegram.WebApp.initData) {
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      if (initDataUnsafe && initDataUnsafe.user) {
        setUserData(initDataUnsafe.user);
      }
    }
  }, []);

  return (
    <Router>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '20px',
          boxSizing: 'border-box',
          position: 'relative',
          backgroundColor: '#1e1e1e',
          color: '#E0E0E0',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        {userData ? (
          <div>Welcome, {userData.first_name}!</div>
        ) : (
          <div>Loading...</div>
        )}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/events" element={<Events />} />
            <Route path="/task" element={<Task />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <MenuBar />
      </div>
    </Router>
  );
};

export default App;
