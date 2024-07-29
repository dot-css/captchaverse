import React, { useEffect } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import './App.css';

function App() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-web-app.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const tg = window.Telegram.WebApp;
            tg.ready();
        };
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to Captchaverse
                </Typography>
                <Button variant="contained" color="primary">
                    Get Started
                </Button>
            </Paper>
        </Container>
    );
}

export default App;
