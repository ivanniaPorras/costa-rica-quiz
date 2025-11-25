// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuunV0_86puTndE726LSTab2GNo6KV1bw",
  authDomain: "costa-rica-quiz.firebaseapp.com",
  projectId: "costa-rica-quiz",
  storageBucket: "costa-rica-quiz.firebasestorage.app",
  messagingSenderId: "933240193296",
  appId: "1:933240193296:web:6ce369c3bf6a817dfca595"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);