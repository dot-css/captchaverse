import { db } from './firebaseConfig'; // Adjust the import path according to your file structure
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const storeUserData = async (userData, points, level, progress) => {
  if (!userData || !userData.id) return;

  console.log('Attempting to store user data:', userData);

  try {
    const userRef = doc(db, 'users', userData.id.toString());
    await setDoc(userRef, {
      firstName: userData.first_name,
      lastName: userData.last_name,
      username: userData.username,
      id: userData.id,
      uc: points, // Store UC points
      level: level, // Store level
      progress: progress // Store progress
    });
    toast.success('User data, points, level, and progress stored successfully');
  } catch (error) {
    console.error('Error storing user data:', error);
    toast.error('Failed to store user data');
  }
};
