import React, { useState, useEffect, useCallback } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import Captcha from './components/Captcha';
import DifficultyButtons from './components/DifficultyButtons';
import Header from './components/Header';
import Timer from './components/Timer';
import BottomMenuBar from './components/BottomMenuBar';
import { generateRandomText } from './utils/captchaUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles';

function App() {
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [reward, setReward] = useState(0);
    const [timer, setTimer] = useState(10); // Default timer for Easy
    const [difficulty, setDifficulty] = useState('easy'); // Default difficulty

    const getTimerBasedOnDifficulty = useCallback(() => {
        switch (difficulty) {
            case 'medium':
                return 5;
            case 'hard':
                return 3;
            default:
                return 10;
        }
    }, [difficulty]);

    useEffect(() => {
        generateCaptcha();

        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    generateCaptcha();
                    return getTimerBasedOnDifficulty();
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [difficulty, getTimerBasedOnDifficulty]);

    const generateCaptcha = () => {
        const text = generateRandomText(6);
        setCaptchaText(text);
    };

    const handleInputChange = (event) => setUserInput(event.target.value);

    const handleVerify = () => {
        if (userInput === captchaText) {
            setReward(prevReward => prevReward + 1);
            toast.success('Captcha correct! You earned 1 UC.');
        } else {
            toast.error('Captcha incorrect. Please try again.');
        }
        setUserInput('');
        generateCaptcha();
        setTimer(getTimerBasedOnDifficulty());
    };

    return (
        <Container component="main" maxWidth="xs" sx={styles.container}>
            <ToastContainer />
            <Header reward={reward} />
            <Typography variant="h4" align="center" sx={styles.heading}>
                Captcha Verse
            </Typography>
            <DifficultyButtons
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                setTimer={setTimer}
            />
            <Captcha captchaText={captchaText} generateCaptcha={generateCaptcha} />
            <Timer timer={timer} />
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter Captcha"
                value={userInput}
                onChange={handleInputChange}
                sx={styles.input}
            />
            <Button
                variant="contained"
                onClick={handleVerify}
                sx={styles.verifyButton}
            >
                Verify
            </Button>
            <Box sx={styles.bottomMenuContainer}>
                <BottomMenuBar />
            </Box>
        </Container>
    );
}

export default App;
