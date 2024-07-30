import React from 'react';
import { Button, Box } from '@mui/material';

const DifficultyButtons = ({ difficulty, setDifficulty, setTimer }) => {
    const difficulties = [
        { label: 'Easy', value: 'easy', timer: 10 },
        { label: 'Medium', value: 'medium', timer: 5 },
        { label: 'Hard', value: 'hard', timer: 3 }
    ];

    return (
        <Box sx={styles.difficultyButtons}>
            {difficulties.map((diff) => (
                <Button
                    key={diff.value}
                    variant={difficulty === diff.value ? 'contained' : 'outlined'}
                    onClick={() => {
                        setDifficulty(diff.value);
                        setTimer(diff.timer); // Reset and start the timer based on the selected difficulty
                    }}
                    sx={styles.difficultyButton}
                >
                    {diff.label}
                </Button>
            ))}
        </Box>
    );
};

const styles = {
    difficultyButtons: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 2,
    },
    difficultyButton: {
        margin: '0 5px',
        fontFamily: 'Roboto, sans-serif',
        color: '#f5f5f5',
        borderColor: '#555',
        '&.MuiButton-contained': {
            backgroundColor: '#00bcd4',
            color: '#fff',
        },
        '&.MuiButton-outlined': {
            borderColor: '#555',
            color: '#fff',
        },
        '&:hover': {
            borderColor: '#00bcd4',
            color: '#f5f5f5',
        }
    },
};

export default DifficultyButtons;
