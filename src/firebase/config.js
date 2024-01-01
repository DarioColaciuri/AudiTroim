
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAwunBBGUBW3gOkx9Tf1OwR8DJO4bfBuZY",
  authDomain: "auditroim.firebaseapp.com",
  projectId: "auditroim",
  storageBucket: "auditroim.appspot.com",
  messagingSenderId: "161458055348",
  appId: "1:161458055348:web:9e6adeb7f24a2670adcfe1",
  measurementId: "G-T3N32L1MXB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);