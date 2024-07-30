import React from 'react';
import { Typography } from '@mui/material';

const Timer = ({ timer }) => (
    <Typography sx={styles.timer}>
        Time Remaining: {timer}s
    </Typography>
);

const styles = {
    timer: {
        fontFamily: 'Roboto, sans-serif',
        color: '#f5f5f5',
        marginTop: '-10px',  // 2px gap on top
        marginBottom: '30px',  // 10px on bottom
    }
};

export default Timer;
