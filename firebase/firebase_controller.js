import {writePostToDB, deletePostFromDB} from "./firebase"

// TODO: Add a post steps: 
// 1. create a post in post db collection [starttime, endtime, location, pettype, description, ownerid=currentuserid, accepted=false]
export async function addPost(post) {

}

// TODO: Edit a post steps
// 1. if the post is already accepted, cannot edit
// 2. if not accepted, edit
export async function editPost(post) {

}

// TODO: Accept post steps:
// 1. edit post by changing accepted to true, acceptedid = currentuserid
// 2. add notifications to both owner and sitter
export async function acceptPost(post) {

}