// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore.js";
// import { getStorage } from "firebase/storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmVx3u-obS0JHH5V7tpNWBDsI29gGGvYE",
  authDomain: "e-commerce-website-428bd.firebaseapp.com",
  databaseURL: "https://e-commerce-website-428bd-default-rtdb.firebaseio.com",
  projectId: "e-commerce-website-428bd",
  storageBucket: "e-commerce-website-428bd.appspot.com",
  messagingSenderId: "147540178257",
  appId: "1:147540178257:web:348b59daa378fc316f8f70",
  measurementId: "G-6R5KRVEB1Z"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
const db = getDatabase(app);
// const storage = getStorage(app);

export{
  auth,
  app,
  db
}