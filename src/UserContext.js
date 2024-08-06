import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchUserData } from './storeUserData';

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
    // Fetch user data from Firestore on mount
    const initializeUser = async () => {
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        const parsedUserData = JSON.parse(savedUserData);
        setUserData(parsedUserData);
        
        const userData = await fetchUserData(parsedUserData.id);
        if (userData) {
          setPoints(userData.uc || 0);
          setLevel(userData.level || 1);
          setProgress(userData.progress || 0);
        }
      }
    };
    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, points, setPoints, level, setLevel, progress, setProgress }}>
      {children}
    </UserContext.Provider>
  );
};
