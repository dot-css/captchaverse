import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';
import { useUserContext } from '../UserContext'; // Import UserContext to get userData
import { storeUserData } from '../storeUserData';

const Profile = () => {
  const { userData } = useUserContext(); // Get userData from context
  const [editing, setEditing] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setEditing(false);
    setSubmitted(true);
    toast.success('Wallet address updated!');
    await storeUserData(userData, walletAddress); // Call storeUserData with walletAddress
  };

  const handleEdit = () => {
    setEditing(true);
    setSubmitted(false);
  };

  const formatAddress = (address) => {
    if (address.length <= 8) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {!submitted && (
          <h1 style={styles.title}>
            {userData ? `${userData.first_name} ${userData.last_name}` : 'Add Your Solana Wallet'}
          </h1>
        )}
        {editing ? (
          <>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            <button style={styles.submitButton} onClick={handleSubmit}>
              Submit
            </button>
          </>
        ) : (
          <>
            <h2 style={styles.subTitle}>
              {walletAddress ? 'Your Solana Wallet Address is' : ''}
            </h2>
            {walletAddress ? (
              <>
                <p style={styles.address}>{formatAddress(walletAddress)}</p>
                <button style={styles.editButton} onClick={handleEdit}>
                  <FaEdit style={styles.editIcon} />
                  Edit
                </button>
              </>
            ) : (
              <button style={styles.editButton} onClick={handleEdit}>
                Add Address
              </button>
            )}
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    color: '#FFFFFF',
    fontFamily: 'Roboto, sans-serif',
    padding: '20px',
    margin: '0',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '20px',
  },
  subTitle: {
    fontSize: '1.2rem',
    fontWeight: 500,
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: '#333333',
    color: '#FFFFFF',
    borderRadius: '4px',
    border: 'none',
  },
  submitButton: {
    width: '100%',
    maxWidth: '150px',
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#333333',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    width: '100%',
    maxWidth: '150px',
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#333333',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    marginRight: '8px',
  },
  address: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
};

export default Profile;
