import { FlatList, StyleSheet, View, Text } from "react-native";
import React, {useEffect, useState} from "react";
import { auth, firestore} from "../firebase/firebase_setup";
import { onSnapshot, collection} from "firebase/firestore";
import PostItem from '../component/PostItem'; 
// import color from "../helper/color";
import LocationManager from "../component/LocationManager";

const Profile = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "posts"), 
      (querySnapshot) => {
        if (querySnapshot.empty){
          setPosts([])
          return 
        }
        setPosts(
          querySnapshot.docs.map((snapDoc) => {
            let data = snapDoc.data(); 
            data = {...data, key: snapDoc.id}
            return data
          })
        ); 
      }
    ); 
    return ()=>{
      unsubscribe(); 
    }
    
  }, [])
  
  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.titletext}>{"Account Info"}</Text>
      </View>
      <Text style={styles.text}>{"Account: " + auth.currentUser.email}</Text>
      <Text style={styles.text}>{"ID:" + auth.currentUser.uid}</Text>
      <View style={styles.postContainer}>
        <View style={styles.titlecontainer}>
          <Text style={styles.titletext}>{"History Posts"}</Text>
        </View>
        <FlatList data = {posts}
          renderItem = {({item}) => {
            return (
              (item.owner === auth.currentUser.uid) ? 
              <PostItem post={item} PressedPost={()=>{
                onPressPost(item)
              }}
              /> : null
            )}}>
        </FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingTop: 30,
    backgroundColor: "#D8BFD8",
    height: "100%",
  },
  titlecontainer: {
    flexDirection: "row", 
    justifyContent: "center",
    alignContent: "center",
  },
  titletext:{
    margin: 25,
    color: "#AF7AC5",
    fontSize: 20,
    fontWeight:"600"
  },
  text: {
    fontSize: 16,
    fontWeight:"600",
    margin: 10,
    marginLeft: 20
  }
});

export default Profile;