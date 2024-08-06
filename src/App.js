import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from './MenuBar';
import Home from './screens/Home';
import Referral from './screens/Referral';
import Events from './screens/Events';
import Task from './screens/Task';
import Profile from './screens/Profile';
import { UserProvider, useUserContext } from './UserContext';
import { storeUserData, fetchUserData } from './storeUserData';

const AppContent = () => {
  const { setUserData, setPoints, setLevel, setProgress } = useUserContext();

  useEffect(() => {
    const initializeUser = async () => {
      if (window.Telegram.WebApp.initData) {
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        if (initDataUnsafe && initDataUnsafe.user) {
          const user = initDataUnsafe.user;
          setUserData(user);

          // Fetch user data from Firestore
          const userData = await fetchUserData(user.id);
          if (userData) {
            setPoints(userData.uc || 0);
            setLevel(userData.level || 1);
            setProgress(userData.progress || 0);
          } else {
            // If user data does not exist, store new user data
            storeUserData(user);
          }
        }
      }
    };
    initializeUser();
  }, [setUserData, setPoints, setLevel, setProgress]);

  return (
    <Router>
      <div style={styles.container}>
        <div style={styles.content}>
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

const App = () => (
  <UserProvider>
    <AppContent />
  </UserProvider>
);

const styles = {
  container: {
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
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
};

export default App;
