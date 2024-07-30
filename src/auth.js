import { auth, db, signInWithCustomToken } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const signInUser = async (userData, deviceData, uc) => {
    try {
        const token = await generateCustomToken(userData);
        await signInWithCustomToken(auth, token);
        console.log('User signed in with token:', token);
        await saveUserData(userData, deviceData, uc); // Pass UC data here
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

const saveUserData = async (userData, deviceData, uc) => {
    const userRef = doc(db, 'users', userData.id.toString());
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
        await setDoc(userRef, {
            ...userData,
            ...deviceData,
            uc, // Add UC data here
            createdAt: new Date()
        });
        console.log('User data saved to Firestore:', userData.id);
    } else {
        console.log('User data already exists in Firestore:', userData.id);
    }
};


export { signInUser };
