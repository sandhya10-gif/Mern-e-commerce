// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQ1z98Msrv_dQAQcWUfe3UrpMYtJZJDag",
  authDomain: "electromart-20072.firebaseapp.com",
  projectId: "electromart-20072",
  storageBucket: "electromart-20072.firebasestorage.app",
  messagingSenderId: "499715789525",
  appId: "1:499715789525:web:783624f96671835c09885c",
  measurementId: "G-3NNSCFXV3Y"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Google provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
