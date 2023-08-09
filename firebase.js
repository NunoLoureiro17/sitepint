// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS8Rfz8fYI807OtIC3EcGLUxmj7RMfiMQ",
  authDomain: "pint-2022-2023.firebaseapp.com",
  projectId: "pint-2022-2023",
  storageBucket: "pint-2022-2023.appspot.com",
  messagingSenderId: "233321193390",
  appId: "1:233321193390:web:e9a3d6fa96eee470cf723f",
  measurementId: "G-2GD7YMSBEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
