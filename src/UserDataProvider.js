import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; // Your Firebase configuration
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Profile from './screens/Profile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserDataProvider = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Extract Telegram Web App data
    const urlParams = new URLSearchParams(window.location.search);
    const tgInitData = urlParams.get('tgWebAppData');

    console.log('Telegram Init Data:', tgInitData);

    if (tgInitData) {
      try {
        const parsedData = JSON.parse(tgInitData);
        console.log('Parsed Telegram Data:', parsedData);
        
        if (parsedData && parsedData.user) {
          const { id, first_name, last_name, username } = parsedData.user;

          // Check if user exists and register if not
          const userDocRef = doc(db, 'users', id.toString());
          getDoc(userDocRef)
            .then((docSnap) => {
              if (!docSnap.exists()) {
                console.log('User does not exist, creating new user...');
                setDoc(userDocRef, {
                  firstName: first_name,
                  lastName: last_name,
                  username: username,
                  id: id,
                }).then(() => {
                  console.log('User registered successfully in Firebase.');
                  toast.success('Registration successful!');
                  setUserData(parsedData.user);
                  navigate('/'); // Redirect to Home after registration
                }).catch((error) => {
                  console.error('Error writing document:', error);
                  toast.error('Error registering user.');
                });
              } else {
                console.log('User already exists in Firebase.');
                toast.info('Welcome back!');
                setUserData(parsedData.user);
                navigate('/'); // Redirect to Home if user already exists
              }
              setLoading(false);
            })
            .catch((error) => {
              console.error('Error getting document:', error);
              toast.error('Error fetching user data.');
              setLoading(false);
            });
        } else {
          console.error('Invalid user data received from Telegram.');
          toast.error('Invalid user data.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error parsing Telegram data:', error);
        toast.error('Error parsing user data.');
        setLoading(false);
      }
    } else {
      console.error('No Telegram Web App data found in URL.');
      toast.error('No Telegram data found.');
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return <Profile userData={userData} />;
};

export default UserDataProvider;
