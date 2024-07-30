import { auth, db, signInWithCustomToken } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const signInUser = async (userData, deviceData) => {
    try {
        const token = await generateCustomToken(userData);
        await signInWithCustomToken(auth, token);
        console.log('User signed in with token:', token);
        await saveUserData(userData, deviceData);
        localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
        console.error("Error signing in: ", error);
    }
};

const generateCustomToken = async (userData) => {
    // Call your backend to generate a Firebase custom auth token
    // This is a placeholder, replace it with your backend call
    console.log('Generating custom token for user:', userData);
    return "YOUR_GENERATED_CUSTOM_TOKEN";
};

const saveUserData = async (userData, deviceData) => {
    const userRef = doc(db, 'users', userData.id.toString());
    const userSnap = await getDoc(userRef);
    console.log('Saving user data:', userData, deviceData);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            ...userData,
            ...deviceData,
            createdAt: new Date()
        });
        console.log('User data saved to Firestore:', userData.id);
    } else {
        console.log('User data already exists in Firestore:', userData.id);
    }
};

export { signInUser };
