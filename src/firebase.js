import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU1LmKS9jERX_ftsYWYhzBqJUa7tcCjN4",
  authDomain: "celorocni-hra.firebaseapp.com",
  projectId: "celorocni-hra",
  storageBucket: "celorocni-hra.firebasestorage.app",
  messagingSenderId: "735682192013",
  appId: "1:735682192013:web:b8ec900af674ed61a4b8c4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
