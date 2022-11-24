import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { firestore } from "./firebase_setup";

// post apis
export async function writePostToDB(post) {
    try {
        const docRef = await addDoc(collection(firestore, "posts"), {
            ...post,
            owner: auth.currentUser.uid,
          });
    } catch (err) {
        console.log(err);
    }
}

export async function deletePostFromDB(key) {
    try {
        await deleteDoc(doc(firestore, "posts", key));
    } catch (err) {
        console.log(err);
    }
}

// notification apis
export async function writeNotificationToDB(notification) {
    try {
        const docRef = await addDoc(collection(firestore, "notifications"), {
            ...notification,
            user: auth.currentUser.uid,
          });
    } catch (err) {
        console.log(err);
    }
}

// update accept to true 
export async function updateAcceptToDB(key, change) {
    try {
        await updateDoc(doc(firestore, "posts", key), change);
      } catch (err) {
        console.log(err);
      }
}



