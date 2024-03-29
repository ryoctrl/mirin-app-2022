import { initializeApp, getApps } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

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

initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
