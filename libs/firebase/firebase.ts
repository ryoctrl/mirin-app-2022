import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa4MqQAO0-vBQWA5UkW8sj7rSevifYEX0",
  authDomain: "mirin-app-2022.firebaseapp.com",
  projectId: "mirin-app-2022",
  storageBucket: "mirin-app-2022.appspot.com",
  messagingSenderId: "652116928100",
  appId: "1:652116928100:web:156fbbe956e5c535762171",
};

export const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
