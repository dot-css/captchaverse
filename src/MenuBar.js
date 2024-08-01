// src/MenuBar.js
import React, { useState } from 'react';
import { FaHome, FaUser, FaTasks, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import { Link, useLocation } from 'react-router-dom';

const MenuBar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const menuItems = [
    { icon: <FaHome />, label: 'Home', path: '/' },
    { icon: <FaUsers />, label: 'Referral', path: '/referral' },
    { icon: <FaCalendarAlt />, label: 'Events', path: '/events' },
    { icon: <FaTasks />, label: 'Task', path: '/task' },
    { icon: <FaUser />, label: 'Profile', path: '/profile' },
  ];

  return (
    <div style={styles.menuBar}>
      {menuItems.map((item, index) => (
        <Tooltip title={item.label} arrow key={index}>
          <Link to={item.path} style={{ textDecoration: 'none' }}>
            <div
              style={{ 
                ...styles.menuItem, 
                ...(activeItem === item.path && styles.activeItem),
              }}
              onClick={() => setActiveItem(item.path)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF'; // White text on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = activeItem === item.path ? '#BB86FC' : '#B0B0B0'; // Reset to active or default color
              }}
            >
              <div style={styles.iconContainer}>
                {item.icon}
              </div>
              {activeItem === item.path && <div style={styles.activeLine}></div>}
            </div>
          </Link>
        </Tooltip>
      ))}
    </div>
  );
};

const styles = {
  menuBar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '60px',
    borderTop: '1px solid #444', // Darker border for visibility
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: '#2c2c2c', // Slightly lighter dark background for the menu bar
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)',
    padding: '0 10px',
    boxSizing: 'border-box',
    borderRadius: '20px 20px 0 0',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
    color: '#B0B0B0', // Medium gray for text
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    padding: '10px 0',
    position: 'relative',
  },
  activeItem: {
    color: '#BB86FC', // Light purple for the active icon
  },
  iconContainer: {
    fontSize: '24px',
  },
  activeLine: {
    position: 'absolute',
    bottom: 0,
    width: '30px',
    height: '3px',
    background: '#BB86FC', // Light purple for the active line
    borderRadius: '2px',
  },
};

export default MenuBar;
