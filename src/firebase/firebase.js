import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzq3rsPcWZUEn_yuKSZHP5NW6BegQg4ww",
  authDomain: "samiko-dd5ca.firebaseapp.com",
  projectId: "samiko-dd5ca",
  storageBucket: "samiko-dd5ca.appspot.com",
  messagingSenderId: "142029905931",
  appId: "1:142029905931:web:7cb5926a88f1bcf114a70e"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);


export { db};