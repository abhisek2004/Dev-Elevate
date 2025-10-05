import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Read Vite env variables for Firebase configuration
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

/**
 * Initialize Firebase safely.
 * If required env vars are missing or invalid, we avoid calling initializeApp to prevent
 * the generic Firebase runtime error (auth/invalid-api-key). Instead we log a clear message
 * and export null placeholders so the app can detect the absence of an initialized auth.
 */
let auth: ReturnType<typeof getAuth> | null = null;
let provider: GoogleAuthProvider | null = null;

try {
  if (!apiKey || apiKey === "your_firebase_api_key_here") {
    throw new Error(
      "Missing or invalid VITE_FIREBASE_API_KEY. Set VITE_FIREBASE_API_KEY in DevElevate/Client/.env"
    );
  }

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
} catch (err) {
  // Provide a clear, actionable console message for developers and avoid crashing the app.
  // Don't expose secrets in logs.
  // eslint-disable-next-line no-console
  console.error("Firebase initialization skipped:", err?.message ?? err);
}

export { auth, provider };
