import React from 'react';

const Referral = () => {
  const referralCode = 'ABC123XYZ';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral code copied to clipboard!');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Earn Rewards with Referrals</h1>
      <p style={styles.description}>
        Invite your friends to join and earn exclusive rewards when they sign up using your referral code!
      </p>
      <div style={styles.referralBox}>
        <p style={styles.referralText}>Your Referral Code:</p>
        <div style={styles.codeBox}>
          <p style={styles.code}>{referralCode}</p>
          <button style={styles.button} onClick={handleCopy}>Copy</button>
        </div>
        <div style={styles.statsBox}>
          <p style={styles.stat}>Referrals: <span style={styles.statNumber}>25</span></p>
          <p style={styles.stat}>Rewards Earned: <span style={styles.statNumber}>500 UC</span></p>
        </div>
      </div>
      <div style={styles.tipsBox}>
        <h2 style={styles.subTitle}>Tips to Maximize Your Referrals</h2>
        <ul style={styles.tipsList}>
          <li style={styles.tipItem}>Share your code on social media platforms.</li>
          <li style={styles.tipItem}>Invite friends and family directly.</li>
          <li style={styles.tipItem}>Use your referral code in your email signature.</li>
          <li style={styles.tipItem}>Promote your code in online communities and forums.</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    color: '#FFF',
    padding: '40px 20px',
    borderRadius: '10px',
    maxWidth: '800px',
    margin: '40px auto',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  description: {
    fontSize: '18px',
    marginBottom: '30px',
    textAlign: 'center',
    lineHeight: '1.5',
  },
  referralBox: {
    backgroundColor: '#1E1E1E',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  referralText: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  codeBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  code: {
    backgroundColor: '#333',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '18px',
    letterSpacing: '2px',
    marginRight: '10px',
  },
  button: {
    backgroundColor: '#FFD700',
    color: '#000',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  statsBox: {
    marginTop: '20px',
  },
  stat: {
    fontSize: '16px',
    margin: '5px 0',
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  tipsBox: {
    marginTop: '30px',
    backgroundColor: '#1E1E1E',
    padding: '20px',
    borderRadius: '10px',
  },
  subTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  tipsList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
  },
  tipItem: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  socialBox: {
    marginTop: '30px',
    textAlign: 'center',
  },
  socialButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  socialButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    color: '#FFF',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'opacity 0.3s',
  },
};

export default Referral;
