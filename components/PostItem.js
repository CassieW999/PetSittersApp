import { StyleSheet, View, Pressable } from "react-native";
import React from "react";
import color from "../helper/color";

const PostItem = ({post, PressedPost}) => {

  return (
    <Pressable onPress={() => {PressedPost()}}
        style={(obj)=>{return obj.pressed&&styles.pressedPost}}>
        <View style={styles.container}>
            <Text>How you want you post look like</Text>
       </View>
    </Pressable>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingTop: 30,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },

  pressedPost:{
    backgroundColor: "#9575CD",
    opacity: 0.5,
    borderRadius:5, 
  }

});

export default PostItem;