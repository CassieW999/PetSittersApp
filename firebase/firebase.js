import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { firestore } from "./firebase_setup";

// post apis
export async function writePostToDB(post) {
    try {
        const docRef = await addDoc(collection(firestore, "posts"), post);
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

// todoiterm apis
export async function writeToDoItemToDB(todoiterm) {
    try {
        const docRef = await addDoc(collection(firestore, "todoiterms"), todoiterm);
    } catch (err) {
        console.log(err);
    }
}

export async function deleteTodoItemFromDB(key) {
    try {
        await deleteDoc(doc(firestore, "todoiterms", key));
    } catch (err) {
        console.log(err);
    }
}

// user apis


