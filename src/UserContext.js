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

  const [level, setLevel] = useState(() => {
    // Retrieve level from local storage, default to 1 if not found
    const savedLevel = localStorage.getItem('level');
    return savedLevel ? parseInt(savedLevel, 10) : 1;
  });

  const [progress, setProgress] = useState(() => {
    // Retrieve progress from local storage, default to 0 if not found
    const savedProgress = localStorage.getItem('progress');
    return savedProgress ? parseInt(savedProgress, 10) : 0;
  });

  useEffect(() => {
    // Update local storage whenever points change
    localStorage.setItem('points', points);
  }, [points]);

  useEffect(() => {
    // Update local storage whenever level changes
    localStorage.setItem('level', level);
  }, [level]);

  useEffect(() => {
    // Update local storage whenever progress changes
    localStorage.setItem('progress', progress);
  }, [progress]);

  return (
    <UserContext.Provider value={{ userData, setUserData, points, setPoints, level, setLevel, progress, setProgress }}>
      {children}
    </UserContext.Provider>
  );
};
