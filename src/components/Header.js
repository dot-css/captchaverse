import React from 'react';
import { Typography, Box } from '@mui/material';

const Header = ({ reward }) => (
    <Box sx={styles.ucContainer}>
        <Typography variant="h5" sx={styles.ucEarned}>
            UC {reward}
        </Typography>
    </Box>
);

const styles = {
    ucContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
        borderRadius: '8px', // Rounded corners
        padding: '8px 16px', // Padding inside the box
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow
    },
    ucEarned: {
        fontFamily: 'Roboto, sans-serif',
        color: '#f5f5f5',
        fontWeight: 'bold',
    },
};

export default Header;
