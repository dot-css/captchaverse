export const initTelegram = () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    return tg;
};

export const getUserData = (tg) => {
    const user = tg.initDataUnsafe?.user;
    return user ? {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
    } : null;
};

export const getDeviceData = (tg) => {
    return {
        platform: tg.platform,
        themeParams: tg.themeParams,
        colorScheme: tg.colorScheme
    };
};
