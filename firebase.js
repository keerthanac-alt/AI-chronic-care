import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "MOCK_API_KEY_OR_PROCESS_ENV_VITE_FIREBASE_API_KEY",
  authDomain: "MOCK_AUTH_DOMAIN_OR_PROCESS_ENV_VITE_FIREBASE_AUTH_DOMAIN",
  projectId: "MOCK_PROJECT_ID",
  storageBucket: "MOCK_STORAGE_BUCKET",
  messagingSenderId: "MOCK_MESSAGING_SENDER_ID",
  appId: "MOCK_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
