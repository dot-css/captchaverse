import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tgInitData = urlParams.get('tgWebAppData');

    if (tgInitData) {
      try {
        const parsedData = JSON.parse(tgInitData);
        
        if (parsedData && parsedData.user) {
          const { id, first_name, last_name, username } = parsedData.user;
          const userDocRef = doc(db, 'users', id.toString());

          getDoc(userDocRef)
            .then((docSnap) => {
              if (!docSnap.exists()) {
                setDoc(userDocRef, {
                  firstName: first_name,
                  lastName: last_name,
                  username: username,
                  id: id,
                })
                .then(() => {
                  toast.success('Registration successful!');
                  navigate('/'); // Redirect to Home after registration
                })
                .catch((error) => {
                  console.error('Error writing document:', error);
                  toast.error('Error registering user.');
                });
              } else {
                toast.info('Welcome back!');
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
          toast.error('Invalid user data received from Telegram.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error parsing Telegram data:', error);
        toast.error('Error parsing user data.');
        setLoading(false);
      }
    } else {
      toast.error('No Telegram Web App data found in URL.');
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return children;
};

export default UserDataProvider;
