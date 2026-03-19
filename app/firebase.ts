// Firebase initialization
// See: https://firebase.google.com/docs/web/setup

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAoOjV2658B9-AUdaNl9WHAH691e17Ups8",
  authDomain: "finalproject-d2127.firebaseapp.com",
  projectId: "finalproject-d2127",
  storageBucket: "finalproject-d2127.firebasestorage.app",
  messagingSenderId: "18275381354",
  appId: "1:18275381354:web:59ad282f171784ea599a13"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
