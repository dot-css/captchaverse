// src/screens/Profile.js
import React, { useState } from 'react';
// import { useUserContext } from '../UserContext';

const Profile = () => {
  // const { userData } = useUserContext();
  const [solanaAddress, setSolanaAddress] = useState('');

  // if (!userData) {
  //   return <div style={styles.loading}>Loading...</div>;
  // }

  const handleAddressChange = (e) => {
    setSolanaAddress(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Profile Screen</h2>
      <div style={styles.info}>
        {/* <p><strong>First Name:</strong> {userData.first_name}</p>
        <p><strong>Last Name:</strong> {userData.last_name}</p>
        <p><strong>Username:</strong> {userData.username}</p> */}

      </div>
      <div style={styles.addressContainer}>
        <label htmlFor="solana-address" style={styles.label}>Solana Address:</label>
        <input
          type="text"
          id="solana-address"
          value={solanaAddress}
          onChange={handleAddressChange}
          placeholder="Enter Solana Address"
          style={styles.input}
        />
      </div>
    </div>
  );
};
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  info: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  infoItem: {
    margin: '10px 0',
    fontSize: '16px',
    color: '#555',
  },
  addressContainer: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
  },
};

export default Profile;