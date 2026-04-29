import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyAoOjV2658B9-AUdaNl9WHAH691e17Ups8",
  authDomain: "finalproject-d2127.firebaseapp.com",
  projectId: "finalproject-d2127",
  storageBucket: "finalproject-d2127.firebasestorage.app",
  messagingSenderId: "18275381354",
  appId: "1:18275381354:web:59ad282f171784ea599a13"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};