// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmzg85lxo908I23h7Y5oJ2A4zfTiaGUAM",
  authDomain: "todo-app-2e86d.firebaseapp.com",
  projectId: "todo-app-2e86d",
  storageBucket: "todo-app-2e86d.appspot.com",
  messagingSenderId: "1008998202979",
  appId: "1:1008998202979:web:d7c3918e8dc3d5855c0256"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;