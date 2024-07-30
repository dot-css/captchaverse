import { auth, db, signInWithCustomToken } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const signInUser = async (userData) => {
    try {
        const token = await generateCustomToken(userData);
        await signInWithCustomToken(auth, token);
        await saveUserData(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
        console.error("Error signing in: ", error);
    }
};

const generateCustomToken = async (userData) => {
    // Call your backend to generate a Firebase custom auth token
    // This is a placeholder, replace it with your backend call
    return "YOUR_GENERATED_CUSTOM_TOKEN";
};

const saveUserData = async (userData) => {
    const userRef = doc(db, 'users', userData.id.toString());
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, userData);
    }
};

export { signInUser };
