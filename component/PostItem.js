import { StyleSheet, View, Pressable, Text } from "react-native";
import React from "react";
import { collection } from "firebase/firestore";

const PostItem = ({post, PressedPost}) => {

  const toDateTime = (secs)=>{
    var t = new Date(1970, 0, 1)
    t.setSeconds(secs)
    return t
  }

  const convertDateToStr = (t)=>{

    // var yy = t.getFullYear()
    // var mm = t.getMonth() + 1
    // var dd = t.getDate()
    // return [yy, (mm> 9 ? '':'0') + mm, (dd>9 ? '':'0') +dd].join('-')
    return t.toISOString().split('T')[0]
  }


  return (
    <Pressable onPress={() => {PressedPost()}}
        style={(obj)=>{return obj.pressed&&styles.pressedPost}}>
        <View style={styles.container}>
          <View style ={styles.postContainer}>
            <Text style={styles.postText}> {post.pet} </Text>
            <Text style={styles.postText}> {convertDateToStr(toDateTime(post.from))} </Text>
            <Text style={styles.postText}> {convertDateToStr(toDateTime(post.to))} </Text>
          </View>
       </View>
    </Pressable>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingTop: 30,
    backgroundColor: "#FFFFFF",
    //height: "100%",
    flexDirection: "row",
    flex: 1,
    backgroundColor: '#E1BEE7',
  },

  postContainer: {
    marginTop: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: 90, 
  }, 
  
  pressedPost:{
    backgroundColor: "#9575CD",
    opacity: 0.5,
    borderRadius:5, 
  }, 

});

export default PostItem;