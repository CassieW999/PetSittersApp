// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId} from "@env"



// apiKey = "AIzaSyAvljflyiPiFCLhUIodcHY_RPvK9w1qeiQ"
// authDomain = "cs5520-b155a.firebaseapp.com"
// projectId = "cs5520-b155a"
// storageBucket = "cs5520-b155a.appspot.com"
// messagingSenderId = "278582328845"
// appId = "1:278582328845:web:ad7fedf80bbd3795289f44"
// measurementId = "G-L039FZXRQX"


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvljflyiPiFCLhUIodcHY_RPvK9w1qeiQ",
    authDomain: "cs5520-b155a.firebaseapp.com",
    projectId: "cs5520-b155a",
    storageBucket:  "cs5520-b155a.appspot.com",
    messagingSenderId: "278582328845",
    appId: "1:278582328845:web:ad7fedf80bbd3795289f44",
    measurementId: "G-L039FZXRQX"
};

console.log("apiKey:", firebaseConfig)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
