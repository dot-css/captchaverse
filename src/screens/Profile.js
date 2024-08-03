// src/screens/Profile.js
import React from 'react';
import { useUserContext } from '../UserContext';

const Profile = () => {
  const { userData } = useUserContext();

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile Screen</h2>
      <div>
        <p><strong>First Name:</strong> {userData.first_name}</p>
        <p><strong>Last Name:</strong> {userData.last_name}</p>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>ID:</strong> {userData.id}</p>
      </div>
    </div>
  );
};

export default Profile;
