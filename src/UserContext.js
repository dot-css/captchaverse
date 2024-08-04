import React, { createContext, useState, useContext, useEffect } from 'react';

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
  const [points, setPoints] = useState(() => {
    // Retrieve points from local storage, default to 0 if not found
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  useEffect(() => {
    // Update local storage whenever points change
    localStorage.setItem('points', points);
  }, [points]);

  return (
    <UserContext.Provider value={{ userData, setUserData, points, setPoints }}>
      {children}
    </UserContext.Provider>
  );
};
