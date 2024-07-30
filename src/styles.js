const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
    },
    ucContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    ucEarned: {
        fontFamily: 'Roboto, sans-serif',
        color: '#f5f5f5',
        fontWeight: 'bold',
    },
    heading: {
        fontFamily: 'Roboto, sans-serif',
        color: '#f5f5f5',
        marginBottom: '30px',
        marginTop:'-100px'
    },
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
        },
    },
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
            color: '#00bcd4',
        },
    },
    timer: {
        fontFamily: 'Roboto, sans-serif',
        color: '#f5f5f5',
        margin: '10px 0',
    },
    input: {
        marginTop: '20px',
        mb: 2,
        backgroundColor: '#333',
        borderRadius: '8px',
        width: '80%',
        input: { color: '#fff' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#555' },
            '&:hover fieldset': { borderColor: '#fff' },
            '&.Mui-focused fieldset': { borderColor: '#00bcd4' },
        },
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
            background: '#00bcd4',
        },
    },
    bottomMenuContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    bottomMenuBar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(90deg, rgba(33,33,33,1) 0%, rgba(66,66,66,1) 100%)',
        color: '#fff',
        borderTop: '1px solid #444',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.3)',
        padding: '10px 10px',
    },
    menuItem: {
        color: '#ccc',
        transition: 'color 0.3s, transform 0.3s',
        '&.Mui-selected': {
            color: '#00bcd4',
        },
        '&:hover': {
            color: '#00bcd4',
            transform: 'scale(1.2)',
        },
    },
};

export default styles;
