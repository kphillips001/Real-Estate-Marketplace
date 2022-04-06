import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCmBE9-9AcS5Z9nBE72A4PYsuUQeAE_zxw',
  authDomain: 'house-marketplace-app-ade9e.firebaseapp.com',
  projectId: 'house-marketplace-app-ade9e',
  storageBucket: 'house-marketplace-app-ade9e.appspot.com',
  messagingSenderId: '127947083590',
  appId: '1:127947083590:web:4d1a078592ea41f5c01f47',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
