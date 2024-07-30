import React, { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { drawCaptcha } from '../utils/captchaUtils';

const Captcha = ({ captchaText, generateCaptcha }) => {
    const canvasRef = useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        drawCaptcha(canvas.getContext('2d'), captchaText);
    }, [captchaText]);

    return (
        <Box display="flex" alignItems="center" justifyContent="center" mb={2} sx={styles.captchaBox}>
            <canvas ref={canvasRef} width="200" height="50" style={styles.canvas} />
            <IconButton onClick={generateCaptcha} color="inherit" sx={styles.refreshButton}>
                <RefreshIcon sx={{ color: '#00bcd4' }} />
            </IconButton>
        </Box>
    );
};

const styles = {
    captchaBox: {
        position: 'relative',
        marginTop: '40px',
        marginBottom: '20px',
    },
    canvas: {
        backgroundColor: '#333',
        borderRadius: '8px',
        border: '2px solid #444',
    },
    refreshButton: {
        ml: 1,
        position: 'absolute',
        right: -2,
        top: '50%',
        transform: 'translateY(-50%)',
        transition: 'transform 0.3s, color 0.3s',
        '&:hover': {
            transform: 'translateY(-50%) rotate(180deg)',
            color: '#00bcd4',
        }
    },
};

export default Captcha;
