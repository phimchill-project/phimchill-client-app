import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBRXBl81RnxQh-hJ5vp-ADxLdwQ1gBCHfs",
  authDomain: "phim-chill.firebaseapp.com",
  projectId: "phim-chill",
  storageBucket: "phim-chill.appspot.com",
  messagingSenderId: "109735830443",
  appId: "1:109735830443:web:2218cd58837057abc4e8ee",
  measurementId: "G-Q71XSXB7ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)

