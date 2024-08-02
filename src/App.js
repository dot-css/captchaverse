import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from './MenuBar';
import Home from './screens/Home';
import Referral from './screens/Referral';
import Events from './screens/Events';
import Task from './screens/Task';
import Profile from './screens/Profile';
import UserDataProvider from './UserDataProvider';

const App = () => {
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
          backgroundColor: '#1e1e1e', // Slightly lighter dark background
          color: '#E0E0E0', // Light text color for readability
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Lighter shadow for better contrast
        }}
      >
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/events" element={<Events />} />
            <Route path="/task" element={<Task />} />
            <Route path="/profile" element={<UserDataProvider />} /> {/* Use UserDataProvider here */}
          </Routes>
        </div>
        <MenuBar />
      </div>
    </Router>
  );
};

export default App;
