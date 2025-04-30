// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYuuh1zac7J9T3vttyrPVT668wVqLtmTg",
  authDomain: "email-password-authentic-3fb50.firebaseapp.com",
  projectId: "email-password-authentic-3fb50",
  storageBucket: "email-password-authentic-3fb50.firebasestorage.app",
  messagingSenderId: "470816171196",
  appId: "1:470816171196:web:e175572a5a5bb455975cb9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;