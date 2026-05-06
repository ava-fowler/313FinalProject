import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

//TODO: Create user profiles that fetch data from Firestore, getCurrentUser from auth.ts
//TODO: Add profile feature to save favorited animals
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
