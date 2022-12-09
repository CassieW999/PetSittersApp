import { StyleSheet, View, Pressable, Text, Image} from "react-native";
import React, { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { storage } from "../firebase/firebase_setup";
import { getDownloadURL, ref } from "firebase/storage";

const PostItem = ({post, PressedPost}) => {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const getImageURL = async () => {
      try {
        if (post.uri) {
          const reference = ref(storage, post.uri);
          const downloadImageURL = await getDownloadURL(reference);
          setImageURL(downloadImageURL);
        }
      } catch (err) {
        console.log("download image ", err);
      }
    };
    getImageURL();
  }, []);

  let type = ""
  switch(post.pet){
    case "dog": 
      type = "dog"
      break
    case "cat": 
      type = "cat"
      break
    case "both": 
      type = "paw"
      break
    default:
      type = "paw"
  }

return (
  <Pressable onPress={() => {PressedPost()}}
      style={(obj)=>{return obj.pressed&&styles.pressedPost}}>
      <View style={styles.container}>
        <View style ={styles.userContainer}>
        {!imageURL && <MaterialCommunityIcons name={type} size={70} color={"gray"} />}
        {imageURL && (
          <Image source={{ uri: imageURL }} style={{ width: 100, height: 100 }} />
        )}
      </View>
        <View style={styles.info}>
          <View style={styles.detail}>
            <Text style={styles.postText}> Type: </Text>
            <Text style={styles.postText}> {post.pet} </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.postText}> From: </Text>
            <Text style={styles.postText}> {post.from} </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.postText}> To: </Text>
            <Text style={styles.postText}> {post.to} </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.postText}> Location: </Text>
            <Text style={styles.postText}> {post.location} </Text>
          </View>
        </View>
        
     </View>
  </Pressable>
  
);
};


const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: "95%",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    flex: 1,
    height: 125,
    alignItems: "center",
    borderRadius: 10,
  },
  userContainer:{
    alignItems: "center", 
    marginBottom: 10, 
  }, 
  pressedPost:{
    backgroundColor: "#9575CD",
    opacity: 0.5,
    borderRadius:5, 
  }, 

  info: {
    flexDirection: "column", 
    width: "50%", 
  }, 
  detail : {
    flexDirection: "row", 
  }, 
  postText: {
    fontSize: "15", 
    marginBottom: 5,
  }, 

});

export default PostItem;