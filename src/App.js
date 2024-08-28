import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { FaHome, FaTrophy, FaUsers } from 'react-icons/fa';
import Leaderboard from './Leaderboard';
import Referral from './Referral';
import Home from './Home';

const MenuBar = () => {
  const { pathname } = useLocation();
  const items = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/leaderboard", icon: <FaTrophy />, label: "Leaderboard" },
    { to: "/referral", icon: <FaUsers />, label: "Referral" }
  ];

  return (
    <div style={styles.menuBar}>
      {items.map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          style={pathname === to ? { ...styles.menuItem, ...styles.activeMenuItem } : styles.menuItem}
        >
          <div style={styles.iconContainer}>
            {icon}
            {pathname === to && <span style={styles.label}>{label}</span>}
          </div>
        </Link>
      ))}
    </div>
  );
};


const App = () => (
  <Router>
    <div style={styles.app}>
      <Routes>
        <Route path="/" element={<Home/>} /> {/* Default Home Content */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/referral" element={<Referral />} />
      </Routes>
      <MenuBar />
    </div>
  </Router>
);

const styles = {
  app: { 
    textAlign: 'center', 
    backgroundColor: '#181818', 
    minHeight: '100vh', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    color: '#e0e0e0', 
    fontFamily: "'Roboto', sans-serif", 
    margin: 0 
  },
  menuBar: { 
    position: 'fixed', 
    bottom: 0, 
    left: '50%', 
    transform: 'translateX(-50%)', 
    display: 'flex', 
    justifyContent: 'space-around', 
    width: '100%', 
    backgroundColor: '#1E201E', 
    padding: '13px', 
    borderRadius: '20px 20px 0 0', 
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.7)' 
  },
  menuItem: { 
    color: '#888', 
    textDecoration: 'none', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    transition: 'color 0.3s, transform 0.3s', 
    padding: '5px 10px', 
    borderRadius: '30px' 
  },
  activeMenuItem: { 
    color: '#7A1CAC', 
    backgroundColor: '#383838', 
    padding: '15px', 
    transform: 'scale(1.1)' 
  },
  iconContainer: { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '20px' 
  },
  label: { 
    fontSize: '14px', 
    marginLeft: '8px', 
    color: '#ffffff' 
  }
};

export default App;
