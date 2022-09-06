import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAXz8qu8ntWmSVNlLIoRaqUz9Hs6SGuo9c",
  authDomain: "meeta-a7c56.firebaseapp.com",
  projectId: "meeta-a7c56",
  storageBucket: "meeta-a7c56.appspot.com",
  messagingSenderId: "666190980000",
  appId: "1:666190980000:web:9b0379ca679ffef5f2fac5",
  measurementId: "G-7LQJ9JPFWS",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
