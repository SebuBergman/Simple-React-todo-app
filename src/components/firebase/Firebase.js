// Import the functions you need from the SDKs you need
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { useState, useEffect, useContext, createContext } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmzg85lxo908I23h7Y5oJ2A4zfTiaGUAM",
  authDomain: "todo-app-2e86d.firebaseapp.com",
  projectId: "todo-app-2e86d",
  storageBucket: "todo-app-2e86d.appspot.com",
  messagingSenderId: "1008998202979",
  appId: "1:1008998202979:web:d7c3918e8dc3d5855c0256",
};

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={{ user, error }} {...props} />;
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
