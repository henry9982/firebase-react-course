// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth ,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIt4zYGWNhrsy4p057F06kU7xo7y35kJk",
  authDomain: "learn-firebase-c4cfc.firebaseapp.com",
  projectId: "learn-firebase-c4cfc",
  storageBucket: "learn-firebase-c4cfc.appspot.com",
  messagingSenderId: "424948321071",
  appId: "1:424948321071:web:8130df3ec9f1ab48b46fda",
  measurementId: "G-72RDMB9HRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app);