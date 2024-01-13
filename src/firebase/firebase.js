// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcTPrIhCtPuCHGNLdxAyG0Sy9QySit7_k",
  authDomain: "instagram-clone-sm.firebaseapp.com",
  projectId: "instagram-clone-sm",
  storageBucket: "instagram-clone-sm.appspot.com",
  messagingSenderId: "251803796905",
  appId: "1:251803796905:web:08468ce184134697d030b8",
  measurementId: "G-TM9933056P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage }