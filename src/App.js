import { useEffect } from 'react';

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
        <div className="App">
            <h1>Welcome to Captchaverse</h1>
            {/* Add your app components and logic here */}
        </div>
    );
}

export default App;
