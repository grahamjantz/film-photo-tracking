// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCounhcwf6UbhHY2rHt0siupROFaGvh1A",
  authDomain: "film-photo-tracking.firebaseapp.com",
  projectId: "film-photo-tracking",
  storageBucket: "film-photo-tracking.appspot.com",
  messagingSenderId: "813768501434",
  appId: "1:813768501434:web:711dcc92cd1a8a32a03a83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db