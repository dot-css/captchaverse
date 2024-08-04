// src/storeUserData.js
import { db } from './firebaseConfig'; // Adjust the import path according to your file structure
import { doc, setDoc } from 'firebase/firestore';

export const storeUserData = async (userData) => {
  if (!userData || !userData.id) return;

  try {
    const userRef = doc(db, 'users', userData.id.toString());
    await setDoc(userRef, {
      firstName: userData.first_name,
      lastName: userData.last_name,
      username: userData.username,
      id: userData.id,
    });
    console.log('User data stored successfully');
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};
