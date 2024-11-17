import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Audience from "./pages/Audience";
import Campaigns from "./pages/Campaigns";
import Login from "./pages/Login";
import MessageSender from "./components/MessageSender";
import CampaignStats from "./components/CampaignStats";
import Navbar from "./components/Navbar";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkNQp9Q0r-9LGHUuTFaIEz1vLJ2hpEve4",
  authDomain: "harsh-campaign-management.firebaseapp.com",
  projectId: "harsh-campaign-management",
  storageBucket: "harsh-campaign-management.firebasestorage.app",
  messagingSenderId: "624787384906",
  appId: "1:624787384906:web:6db70958bc1cac8b4854b3",
  measurementId: "G-72C1LLVWZM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  

provider.setCustomParameters({   
    prompt : "select_account "
});


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/audience" element={<Audience />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/login" element={<Login />} />
        <Route path="/send-message" element={<MessageSender />} />
        <Route path="/campaign-stats" element={<CampaignStats />} />
      </Routes>
    </Router>
  );
}

export  {App};
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);