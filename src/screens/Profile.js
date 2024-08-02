import React from 'react';

const Profile = ({ userData }) => {
  return (
    <div>
      <h2>Profile Screen</h2>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>Username: {userData.username}</p>
    </div>
  );
};

export default Profile;
