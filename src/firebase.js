// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyBGODuVDvukUVL45c6parJAKESgoI8vExI",
  authDomain: "swiftcast-e38f6.firebaseapp.com",
  projectId: "swiftcast-e38f6",
  storageBucket: "swiftcast-e38f6.firebasestorage.app",
  messagingSenderId: "757379569979",
  appId: "1:757379569979:web:edd4cb90484915877c7f1e",
  measurementId: "G-J3RTBLX5V2"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);       
const rtdb = getDatabase(app);       

export { db, rtdb };
