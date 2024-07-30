import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCQPmqtIY-t1DL4muitKlM5LdG5YlXRChw",
    authDomain: "captcha-verse.firebaseapp.com",
    projectId: "captcha-verse",
    storageBucket: "captcha-verse.appspot.com",
    messagingSenderId: "946666590657",
    appId: "1:946666590657:web:aa32d7cc063c5146ed5f40",
    measurementId: "G-2JJ49JBDLC"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithCustomToken };
