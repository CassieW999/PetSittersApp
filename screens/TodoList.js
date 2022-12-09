import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect} from "react";
import { onSnapshot, collection} from "firebase/firestore";
import { firestore, auth} from "../firebase/firebase_setup";
import { RadioButton } from 'react-native-paper';
import PostItem from '../component/PostItem'; 
// import color from "../helper/color";

const TodoList = ({navigation}) => {
  const [posts, setPosts] = useState([])
  const [checked, setChecked] = React.useState('owner');

  // when press the post, go to the post detail page 
  const onPressPost = (post) =>{
    // navigation.navigate("postDetails", {postObject:post})
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
      <View style={styles.radioButtonList}>
        <View style={styles.radioButtonContainer}>
          <Text>Owner</Text>
          <RadioButton
            color="#AF7AC5"
            value="owner"
            status={ checked === 'owner' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('owner')}
          />
        </View>
        <View style={styles.radioButtonContainer}>
          <Text>Sitter</Text>
          <RadioButton
            color="#AF7AC5"
            value="sitter"
            status={ checked === 'sitter' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('sitter')}
          />
        </View>
      </View>
      <View style={styles.postContainer}>
        <FlatList data = {posts}
          renderItem = {({item}) => {
            return (
              (item.isAccepted && 
                ((item.owner === auth.currentUser.uid && checked === 'owner') 
                || (item.sitterId === auth.currentUser.uid && checked === 'sitter')) ) ? 
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
    backgroundColor: "#D8BFD8",
    height: "100%",
    
  },
  radioButtonList:{
    margin: 8,
    width: "60%",
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonContainer: {
    margin: 8,
    width: "30%",
    flexWrap:'nowrap'
  },
  postContainer: {
    marginTop: 20,
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  }

});

export default TodoList;