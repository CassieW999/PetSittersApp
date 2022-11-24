import { StyleSheet, View, Pressable, Text } from "react-native";
import React from "react";
import { collection } from "firebase/firestore";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const PostItem = ({post, PressedPost}) => {

  return (
    <Pressable onPress={() => {PressedPost()}}
        style={(obj)=>{return obj.pressed&&styles.pressedPost}}>
        <View style={styles.container}>
          <MaterialCommunityIcons name="account" size={18} color={"gray"} />
          <Text style={styles.postText}> {post.pet} </Text>
          <Text style={styles.postText}> {post.from} </Text>
          <Text style={styles.postText}> {post.to} </Text>
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
    height: 150,
    alignItems: "center",
    borderRadius: 10,
  },

  pressedPost:{
    backgroundColor: "#9575CD",
    opacity: 0.5,
    borderRadius:5, 
  }, 

});

export default PostItem;