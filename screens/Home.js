import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect} from "react";
import { onSnapshot, collection} from "firebase/firestore";
import { firestore } from "../firebase/firebase_setup";
import PostItem from '../component/PostItem'; 

const Home = ({navigation}) => {


  const [posts, setPosts] = useState([])

  // when press the post, go to the post detail page 
  const onPressPost = (post) =>{
    navigation.navigate("PostDetail")
  }
  // get post data from firebase 
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
            data = {...data}
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
      <FlatList data = {posts}
        renderItem = {({item}) => {
          console.log("item is", item)
          return (
            <PostItem post={item} PressedPost={()=>{
              onPressPost(item)
            }}/>
          )} }>

      </FlatList>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingTop: 30,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },

});

export default Home;