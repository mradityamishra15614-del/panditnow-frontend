import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYCnwHgtyfozU4NnjkdtgtH6iq75uHrJs",
  authDomain: "panditnow-5e160.firebaseapp.com",
  projectId: "panditnow-5e160",
  storageBucket: "panditnow-5e160.firebasestorage.app",
  messagingSenderId: "357577627104",
  appId: "1:357577627104:web:5b4d9e162604cd94ab4785",
  measurementId: "G-YXX1MT0ZSC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();
