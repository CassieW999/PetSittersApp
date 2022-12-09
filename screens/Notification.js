import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect} from "react";
import { onSnapshot, collection} from "firebase/firestore";
import { firestore } from "../firebase/firebase_setup";
import NotificationItem from '../component/NotificationItem'; 
import { auth } from "../firebase/firebase_setup";


const Notification = ({navigation}) => {

  const [notifications, setNotifications] = useState([])
  const [posts, setPosts] = useState([])

  const onPressNotification = (notification) =>{
    // get post information
    const post = posts.find(post => post.key == notification.postId)
    navigation.navigate("postDetails", {postObject:post})
  }
  // get noticarion data from firebase 
  useEffect(() => {
    const downloadNotification = onSnapshot(collection(firestore, "notifications"), 
      (querySnapshot) => {
        if (querySnapshot.empty){
          setNotifications([])
          return 
        }

        setNotifications(
          querySnapshot.docs.map((snapDoc) => {
            let data = snapDoc.data(); 
            data = {...data, key: snapDoc.id}
            return data
          })
        ); 
      }
    ); 

    const downloadPosts = onSnapshot(collection(firestore, "posts"), 
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
      downloadPosts();
      downloadNotification(); 
    }
    
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        <FlatList data = {notifications.filter((notification)=>{return notification.posterId == auth.currentUser.uid || notification.receiverId == auth.currentUser.uid})}
          renderItem = {({item}) => {
            return (
              <NotificationItem notification={item} 
              pressedNotification={()=>{
                onPressNotification(item)
              }}/>
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

});

export default Notification;