import React from 'react';
import { Typography } from '@mui/material';

const Timer = ({ timer }) => (
    <Typography variant="h6" sx={styles.timer}>
        Time Remaining: {timer}s
    </Typography>
);

const styles = {
    timer: {
        fontFamily: 'Roboto, sans-serif',
        color: '#f5f5f5',
        margin: '10px 0',
    }
};

export default Timer;
