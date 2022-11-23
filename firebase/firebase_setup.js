// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId} from "@env"


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket:  storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};

console.log("apiKey:", firebaseConfig)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
