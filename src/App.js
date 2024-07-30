import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Paper, TextField, Button, Box, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const generateRandomText = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

const drawCaptcha = (ctx, text) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(text, ctx.canvas.width / 2, ctx.canvas.height / 2 + 10);
};

function App() {
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [reward, setReward] = useState(0);
    const canvasRef = useRef(null);

    useEffect(() => generateCaptcha(), []);

    const generateCaptcha = () => {
        const text = generateRandomText(6);
        setCaptchaText(text);
        const canvas = canvasRef.current;
        drawCaptcha(canvas.getContext('2d'), text);
    };

    const handleInputChange = (event) => setUserInput(event.target.value);

    const handleVerify = () => {
        if (userInput === captchaText) {
            setReward(reward + 1);
            toast.success('Captcha correct! You earned 1 UC.');
        } else {
            toast.error('Captcha incorrect. Please try again.');
        }
        setUserInput('');
        generateCaptcha();
    };

    return (
        <Container component="main" maxWidth="xs" sx={styles.container}>
            <ToastContainer />
            <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h4" fontWeight="bold" mb={2} sx={styles.heading}>
                    Captcha Challenge
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="center" mb={2} sx={styles.captchaBox}>
                    <canvas ref={canvasRef} width="200" height="50" style={styles.canvas} />
                    <IconButton onClick={generateCaptcha} color="inherit" sx={styles.refreshButton}>
                        <RefreshIcon sx={{ color: '#fff' }} />
                    </IconButton>
                </Box>
                <Typography variant="h6" sx={styles.ucEarned}>
                    UC Earned: {reward}
                </Typography>
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

            </Paper>
        </Container>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#fff'
    },
    paper: {
        backgroundColor: '#121212',
        textAlign: 'center',
    },
    heading: {
        fontFamily: 'Arial, sans-serif',
        color: '#f5f5f5',
        
    },
    captchaBox: {
        position: 'relative',
        marginTop: '70px',
    },
    canvas: {
        backgroundColor: '#333',
        borderRadius: '5px'
    },
    refreshButton: {
        ml: 1,
        position: 'absolute',
        right: -2,
        top: '50%',
        transform: 'translateY(-50%)',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'translateY(-50%) rotate(180deg)'
        }
    },
    input: {
        marginTop: '70px',
        mb: 2,
        backgroundColor: '#333',
        borderRadius: '5px',
        width:'80%',
        input: { color: '#fff' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#555' },
            '&:hover fieldset': { borderColor: '#fff' },
            '&.Mui-focused fieldset': { borderColor: '#00bcd4' }
        }
    },
    verifyButton: {
        position: 'relative',
        overflow: 'hidden',
        height: '3rem',
        padding: '0 2rem',
        borderRadius: '1.5rem',
        background: '#3d3a4e',
        backgroundSize: '400%',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scaleX(1)',
          background: 'linear-gradient(82.3deg, rgba(150, 93, 233, 1) 10.8%, rgba(99, 88, 238, 1) 94.3%)'
        },
       
      },
    ucEarned: {
        fontFamily: 'Arial, sans-serif',
        color: '#f5f5f5',
       
    }
};

export default App;
