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
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load data from local storage when the component mounts
    const savedPoints = localStorage.getItem('points');
    const savedLevel = localStorage.getItem('level');
    const savedProgress = localStorage.getItem('progress');
    const savedUserData = localStorage.getItem('userData');

    if (savedPoints) setPoints(parseInt(savedPoints, 10));
    if (savedLevel) setLevel(parseInt(savedLevel, 10));
    if (savedProgress) setProgress(parseInt(savedProgress, 10));
    if (savedUserData) setUserData(JSON.parse(savedUserData));
  }, []);

  useEffect(() => {
    // Update local storage whenever points, level, progress, or userData change
    localStorage.setItem('points', points);
  }, [points]);

  useEffect(() => {
    localStorage.setItem('level', level);
  }, [level]);

  useEffect(() => {
    localStorage.setItem('progress', progress);
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData, points, setPoints, level, setLevel, progress, setProgress }}>
      {children}
    </UserContext.Provider>
  );
};
