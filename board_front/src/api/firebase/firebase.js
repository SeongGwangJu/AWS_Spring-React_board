// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGneTfQN_h-DsLXlZlRS7em_X_9YEjX4U",
  authDomain: "board-52fc8.firebaseapp.com",
  projectId: "board-52fc8",
  storageBucket: "board-52fc8.appspot.com",
  messagingSenderId: "665401691026",
  appId: "1:665401691026:web:713508c80880e8f280cf4b",
  measurementId: "G-EXSEJX0523"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);