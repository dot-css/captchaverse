import React, { useEffect, useState } from 'react';
import { initTelegram, getUserData } from './telegram';
import { signInUser } from './auth';
import './App.css';
import { Container, Typography, Button, Paper } from '@mui/material';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            signInUser(userData);
        } else {
            const tg = initTelegram();
            const userData = getUserData(tg);
            if (userData) {
                setUser(userData);
                signInUser(userData);
            }
        }
    }, []);

    const handleStartApp = () => {
        // Handle start app logic if needed
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to Captchaverse
                </Typography>
                {user && (
                    <Typography variant="body1">
                        Logged in as {user.username}
                    </Typography>
                )}
                <Button variant="contained" color="primary" onClick={handleStartApp}>
                    Start App
                </Button>
            </Paper>
        </Container>
    );
}

export default App;
