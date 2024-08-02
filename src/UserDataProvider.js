import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; // Your Firebase configuration
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Profile from './screens/Profile';

const UserDataProvider = () => {
  const [userData, setUserData] = useState(null);

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
                }).catch((error) => {
                  console.error('Error writing document:', error);
                });
              } else {
                console.log('User already exists in Firebase.');
              }
              setUserData(parsedData.user);
            })
            .catch((error) => {
              console.error('Error getting document:', error);
            });
        } else {
          console.error('Invalid user data received from Telegram.');
        }
      } catch (error) {
        console.error('Error parsing Telegram data:', error);
      }
    } else {
      console.error('No Telegram Web App data found in URL.');
    }
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return <Profile userData={userData} />;
};

export default UserDataProvider;
