import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaSync } from 'react-icons/fa';

const Home = () => {
  const [points, setPoints] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [captcha, setCaptcha] = useState('');
  const [timer, setTimer] = useState(10);
  const [input, setInput] = useState('');
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    startGame('easy');
    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else if (timer === 0 && difficulty) {
      startGame(difficulty);
    }
  }, [timer, difficulty]);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  const startGame = (level) => {
    setDifficulty(level);
    generateCaptcha();
    setInput('');
    switch (level) {
      case 'easy':
        setTimer(10);
        break;
      case 'medium':
        setTimer(5);
        break;
      case 'hard':
        setTimer(3);
        break;
      default:
        setTimer(10);
    }
  };

  const handleWrongAnswer = () => {
    const deduction = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 5 : 10;
    const newPoints = Math.max(0, points - deduction);
    setPoints(newPoints);
    toast.error(`Wrong CAPTCHA! -${deduction} UC`);
    startGame(difficulty);
  };

  const handleSubmit = () => {
    if (input === captcha) {
      switch (difficulty) {
        case 'easy':
          setPoints(prev => prev + 1);
          toast.success('Correct! +1 UC');
          break;
        case 'medium':
          setPoints(prev => prev + 5);
          toast.success('Correct! +5 UC');
          break;
        case 'hard':
          setPoints(prev => prev + 20);
          toast.success('Correct! +20 UC');
          break;
        default:
          break;
      }
      startGame(difficulty);
    } else {
      handleWrongAnswer();
    }
  };

  const handleRefresh = () => {
    generateCaptcha();
    startGame(difficulty); // Restart the game with current difficulty to reset the timer
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Captchaverse</h1>
        <div style={pointsStyle}>UC {points}</div>
      </header>
      <main style={mainStyle}>
        <div style={buttonContainerStyle}>
          <button style={difficultyButtonStyle} onClick={() => startGame('easy')}>Easy</button>
          <button style={difficultyButtonStyle} onClick={() => startGame('medium')}>Medium</button>
          <button style={difficultyButtonStyle} onClick={() => startGame('hard')}>Hard</button>
        </div>
        {difficulty && (
          <div style={captchaContainerStyle}>
            <div style={captchaBoxStyle}>
              {captcha}
              <FaSync style={refreshIconStyle} onClick={handleRefresh} />
            </div>
            <div style={timerStyle}>Time: {timer}s</div>
            <input
              style={inputStyle}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter CAPTCHA"
            />
            <button style={submitButtonStyle} onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </main>
      <Toaster />
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh', // Dark background color
  color: '#ffffff',
  width: '100vh',
  fontFamily: 'Roboto, sans-serif',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#1f1f1f',
  marginBottom: '10px', // Reduced margin-bottom to decrease the gap
};



const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 700,
};

const pointsStyle = {
  fontSize: '1.2rem',
  fontWeight: 500,
};

const mainStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
  marginTop: '-150px', // Reduce margin-top
};

const difficultyButtonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  backgroundColor: '#333333', // Dark button background
  color: '#ffffff',
  border: '1px solid #444444', // Slightly lighter border
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const captchaContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  marginTop: '20px',
};

const captchaBoxStyle = {
  fontSize: '2rem',
  backgroundColor: '#1f1f1f',
  padding: '15px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #444444',
  position: 'relative',
};

const refreshIconStyle = {
  marginLeft: '10px',
  cursor: 'pointer',
  fontSize: '1.2rem',
  color: '#ffffff',
  transition: 'color 0.3s ease',
};

const timerStyle = {
  fontSize: '1rem',
  marginTop: '5px',
  marginBottom:'40px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '1rem',
  borderRadius: '5px',
  border: '1px solid #444444', // Dark border
  backgroundColor: '#2b2b2b',
  color: '#ffffff',
  width: '250px',
  textAlign: 'center',
  placeholder: 'Enter CAPTCHA',
  marginBottom:'10px',
};


const submitButtonStyle = {
  width: '150px',
  padding: '10px 20px',
  fontSize: '1rem',
  backgroundColor: '#333333',
  color: '#ffffff',
  border: '1px solid #ffffff',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
};



export default Home;
