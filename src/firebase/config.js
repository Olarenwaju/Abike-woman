import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDOXiGxOP5y_HDbh0RnjS-rNqxUiNHPxQ8",
  authDomain: "abikewoman-ef34e.firebaseapp.com",
  projectId: "abikewoman-ef34e",
  storageBucket: "abikewoman-ef34e.appspot.com",
  messagingSenderId: "1058547875714",
  appId: "1:1058547875714:web:761c80d73252094647599b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;