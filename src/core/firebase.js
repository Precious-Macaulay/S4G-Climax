import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBI3JOiSWnyKuOoAlJJBVBwIQgdVenX25E",
  authDomain: "s4g-hack.firebaseapp.com",
  databaseURL: "https://s4g-hack-default-rtdb.firebaseio.com",
  projectId: "s4g-hack",
  storageBucket: "s4g-hack.appspot.com",
  messagingSenderId: "142747737600",
  appId: "1:142747737600:web:909523e44718a2be4502e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.app.name === "[DEFAULT]" ? console.log("Firebase is connected") : console.log("Firebase is not connected");

const db = getFirestore(app);
db.app.name === "[DEFAULT]" ? console.log("Firebase is connected") : console.log("Firebase is not connected");
export default {auth, db};
