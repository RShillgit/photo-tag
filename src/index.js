import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4BAwDEGGvuzxEmexLPTKfL1e0XclwN-k",
  authDomain: "photo-tag-de858.firebaseapp.com",
  projectId: "photo-tag-de858",
  storageBucket: "photo-tag-de858.appspot.com",
  messagingSenderId: "618042274538",
  appId: "1:618042274538:web:1781580844e3abc994dd93",
  measurementId: "G-YYJQQWCWKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
