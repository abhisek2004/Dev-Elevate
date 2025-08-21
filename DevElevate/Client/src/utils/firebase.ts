import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
let auth;
let provider;

try {
  // Check if all required environment variables are present
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_firebase_api_key_here') {
    console.warn('Firebase configuration incomplete. Please set up your .env file with Firebase credentials.');
    throw new Error('Firebase configuration incomplete');
  }
  
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  // Create fallback objects to prevent crashes
  app = null;
  auth = null;
  provider = null;
}

export { auth, provider };