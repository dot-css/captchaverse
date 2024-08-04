import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaSync } from 'react-icons/fa';
import { useUserContext } from '../UserContext';
import { storeUserData } from '../storeUserData';

const Home = () => {
  const { userData, points, setPoints, level, setLevel, progress, setProgress } = useUserContext();
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
      const id = setInterval(() => setTimer(t => t - 1), 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else {
      startGame(difficulty);
    }
  }, [timer, difficulty]);

  useEffect(() => {
    if (userData) storeUserData(userData, points, level, progress);
  }, [points, userData, level, progress]);

  useEffect(() => {
    const target = 1000 * Math.pow(2, level - 1);
    if (progress >= target) {
      setLevel(prev => prev + 1);
      setProgress(0);
      toast.success(`Level Up! Welcome to Level ${level + 1}`);
    }
  }, [progress, level]);

  const generateCaptcha = () => {
    setCaptcha(Array.from({ length: 7 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join(''));
  };

  const startGame = (level) => {
    setDifficulty(level);
    generateCaptcha();
    setInput('');
    setTimer(level === 'medium' ? 5 : level === 'hard' ? 3 : 10);
  };

  const handleWrongAnswer = () => {
    const deduction = (difficulty === 'easy' ? 2 : difficulty === 'medium' ? 5 : 10) * Math.pow(2, level - 1);
    setPoints(p => Math.max(0, p - deduction));
    toast.error(`Wrong CAPTCHA! -${deduction} UC`);
    startGame(difficulty);
  };

  const handleSubmit = () => {
    if (input === captcha) {
      const pointsEarned = (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 5 : 20) * Math.pow(2, level - 1);
      setPoints(p => p + pointsEarned);
      setProgress(p => p + pointsEarned);
      toast.success(`Correct! +${pointsEarned} UC`);
      startGame(difficulty);
    } else handleWrongAnswer();
  };

  const handleRefresh = () => {
    generateCaptcha();
    startGame(difficulty);
  };

  const target = 1000 * Math.pow(2, level - 1);
  const ucNeeded = target - progress;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Captchaverse</h1>
        <div style={styles.points}>UC {points}</div>
      </header>
      <main style={styles.main}>
        <div style={styles.levelContainer}>
          <h2 style={styles.level}>Level: {level}</h2>
          <div style={styles.progressBarWrapper}>
            <div style={styles.progressBarContainer}>
              <div style={{ ...styles.progressBar, width: `${(progress / target) * 100}%` }} />
            </div>
            <div style={styles.ucNeeded}>-{ucNeeded} UC</div>
          </div>
        </div>
        <div style={styles.buttonContainer}>
          {['easy', 'medium', 'hard'].map(level => (
            <button key={level} style={styles.difficultyButton} onClick={() => startGame(level)}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
        {difficulty && (
          <div style={styles.captchaContainer}>
            <div style={styles.captchaBox}>
              {captcha}
              <FaSync style={styles.refreshIcon} onClick={handleRefresh} />
            </div>
            <div style={styles.timer}>Time: {timer}s</div>
            <input
              style={styles.input}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter CAPTCHA"
            />
            <button style={styles.submitButton} onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </main>
      <Toaster />
    </div>
  );
};
const styles = {
  container: { display: 'flex', flexDirection: 'column', height: '100vh', color: '#ffffff', width: '100vw', fontFamily: 'Roboto, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#1f1f1f', marginBottom: '10px', flexShrink: 0 },
  title: { fontSize: '1.5rem', fontWeight: 700 },
  points: { fontSize: '1.2rem', fontWeight: 500 },
  main: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflowY: 'auto' },
  levelContainer: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '20px', width: '80%', marginTop: '-150px' },
  level: { fontSize: '1rem', marginBottom: '10px' },
  progressBarWrapper: { display: 'flex', alignItems: 'center', width: '100%' },
  progressBarContainer: { flex: 1, height: '10px', backgroundColor: '#444444', borderRadius: '5px', overflow: 'hidden', marginRight: '10px' },
  progressBar: { height: '100%', backgroundColor: '#ffffff' },
  ucNeeded: { fontSize: '0.8rem', fontWeight: 200, whiteSpace: 'nowrap' },
  buttonContainer: { display: 'flex', gap: '10px', marginBottom: '20px' },
  difficultyButton: { padding: '10px 20px', fontSize: '1rem', backgroundColor: '#333333', color: '#ffffff', border: '1px solid #444444', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' },
  captchaContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
  captchaBox: { fontSize: '2rem', backgroundColor: '#1f1f1f', padding: '15px', borderRadius: '5px', display: 'flex', alignItems: 'center', border: '1px solid #444444', position: 'relative', userSelect: 'none' },
  refreshIcon: { marginLeft: '10px', cursor: 'pointer', fontSize: '1.2rem', color: '#ffffff', transition: 'color 0.3s ease' },
  timer: { fontSize: '1rem', marginTop: '5px', marginBottom: '40px' },
  input: { padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #444444', backgroundColor: '#2b2b2b', color: '#ffffff', width: '200px', marginBottom: '10px' },
  submitButton: { width: '150px', padding: '10px 20px', fontSize: '1rem', backgroundColor: '#333333', color: '#ffffff', border: '1px solid #ffffff', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.2s ease', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }
};

export default Home;
