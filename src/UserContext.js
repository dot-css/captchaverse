import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from './firebaseConfig'; // Adjust the import path according to your file structure
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [walletAddress, setWalletAddress] = useState('');

  const fetchUserData = async (userId) => {
    if (!userId) return null;

    try {
      const userRef = doc(db, 'users', userId.toString());
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setPoints(data.uc || 0);
        setLevel(data.level || 1);
        setProgress(data.progress || 0);
        setWalletAddress(data.walletAddress || '');
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const storeUserData = async (data) => {
    if (!data || !data.id) return;

    try {
      const userRef = doc(db, 'users', data.id.toString());
      await setDoc(userRef, {
        firstName: data.first_name,
        lastName: data.last_name,
        username: data.username,
        id: data.id,
        uc: points, // Store UC points
        level: level, // Store level
        progress: progress, // Store progress
        walletAddress: walletAddress // Store Solana wallet address
      });
      toast.success('User data, points, level, progress, and wallet address stored successfully');
    } catch (error) {
      console.error('Error storing user data:', error);
      toast.error('Failed to store user data');
    }
  };

  useEffect(() => {
    if (userData) {
      storeUserData(userData);
    }
  }, [points, level, progress, walletAddress]);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) {
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      if (initDataUnsafe && initDataUnsafe.user) {
        fetchUserData(initDataUnsafe.user.id);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, points, setPoints, level, setLevel, progress, setProgress, walletAddress, setWalletAddress }}>
      {children}
    </UserContext.Provider>
  );
};
