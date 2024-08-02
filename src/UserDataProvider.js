import React, { useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig'; // Your Firebase configuration
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Profile from './screens/Profile';

const UserDataProvider = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Extract Telegram Web App data
    const urlParams = new URLSearchParams(window.location.search);
    const tgInitData = urlParams.get('tgWebAppData');

    if (tgInitData) {
      const parsedData = JSON.parse(tgInitData);
      const { id, first_name, last_name, username } = parsedData.user;

      // Check if user exists and register if not
      const userDocRef = doc(db, 'users', id.toString());
      getDoc(userDocRef).then((docSnap) => {
        if (!docSnap.exists()) {
          setDoc(userDocRef, {
            firstName: first_name,
            lastName: last_name,
            username: username,
            id: id,
          });
        }
        setUserData(parsedData.user);
      });
    }
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return <Profile userData={userData} />;
};

export default UserDataProvider;
