import { StyleSheet, View, Pressable, Text } from "react-native";
import React from "react";
import { collection } from "firebase/firestore";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const PostItem = ({post, PressedPost}) => {


return (
  <Pressable onPress={() => {PressedPost()}}
      style={(obj)=>{return obj.pressed&&styles.pressedPost}}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="account" size={70} color={"gray"} />
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
    // backgroundColor: "pink",
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
    marginRight: 5,  
  }, 

});

export default PostItem;