import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDma3sP7vRQWjnKK9kf0fra0B70MI-Hqgo",
    authDomain: "ecommerce-1731d.firebaseapp.com",
    projectId: "ecommerce-1731d",
    storageBucket: "ecommerce-1731d.appspot.com",
    messagingSenderId: "1050781546302",
    appId: "1:1050781546302:web:c637fcd49ac2d73aa5de6f",
    measurementId: "G-XSN7LNWHP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;