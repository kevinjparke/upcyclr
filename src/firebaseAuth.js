// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkGNvpqDD6830Qes4E743pZtZ4xKtvXRA",
  authDomain: "recyclerwards.firebaseapp.com",
  projectId: "recyclerwards",
  storageBucket: "recyclerwards.appspot.com",
  messagingSenderId: "296533250359",
  appId: "1:296533250359:web:9561b7f21e37788b60cab2",
  measurementId: "G-RT73180X2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); 