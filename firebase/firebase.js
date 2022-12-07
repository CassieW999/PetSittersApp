import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { auth } from "../firebase/firebase_setup";
import { firestore } from "./firebase_setup";

export async function saveUser(user) {
    try {
      await setDoc(doc(firestore, "users", auth.currentUser.uid), user);
    } catch (err) {
      console.log("save user ", err);
    }
  }
  export async function getUser() {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
  
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

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
