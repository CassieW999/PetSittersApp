import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect} from "react";
import { onSnapshot, collection} from "firebase/firestore";
import { firestore } from "../firebase/firebase_setup";
import PostItem from '../component/PostItem'; 

const Home = ({navigation}) => {


  const [posts, setPosts] = useState([])

  // when press the post, go to the post detail page 
  const onPressPost = (post) =>{
    navigation.navigate("postDetails", {postObject:post})
 
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
      <View style={styles.postContainer}>
        <FlatList data = {posts}
          renderItem = {({item}) => {
            return (
              item.isAccepted ? null : 
              <PostItem post={item} PressedPost={()=>{
                onPressPost(item)
              }}
              />
            )}}>
        </FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 	"#D8BFD8",
    height: "100%",
    
  },

  postContainer: {
    marginTop: 20,
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  }

});

export default Home;