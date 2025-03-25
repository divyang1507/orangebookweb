// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_DB_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_DB_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_DB_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_DB_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_DB_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_DB_APPID,
  measurementId: process.env.NEXT_PUBLIC_DB_MEASUREMENTID,
};



const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
const storage = getStorage(app);

export { db,storage };