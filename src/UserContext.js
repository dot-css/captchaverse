// src/UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [points, setPoints] = useState(0); // Add points state

  return (
    <UserContext.Provider value={{ userData, setUserData, points, setPoints }}>
      {children}
    </UserContext.Provider>
  );
};
