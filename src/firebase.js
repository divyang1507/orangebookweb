import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_DB_APIKEY,
  // authDomain: process.env.NEXT_PUBLIC_DB_AUTHDOMAIN,
  // projectId: process.env.NEXT_PUBLIC_DB_PROJECT, // Ensure this is present!
  // storageBucket: process.env.NEXT_PUBLIC_DB_STORAGEBUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_DB_MESSAGINGSENDERID,
  // appId: process.env.NEXT_PUBLIC_DB_APPID,
  // measurementId: process.env.NEXT_PUBLIC_DB_MEASUREMENTID,
  apiKey: "AIzaSyDg7rHP6hyfKF3Btg8uFQy_scIWTZQRXrY",
  authDomain: "orangebookfb.firebaseapp.com",
  projectId: "orangebookfb",
  storageBucket: "orangebookfb.firebasestorage.app",
  messagingSenderId: "987542557677",
  appId: "1:987542557677:web:5b2aa6d18cddb3fca38de4",
  measurementId: "G-DST01J2ZZR"
};



const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db,storage };