import { StyleSheet, View, Pressable, Text } from "react-native";
import React, { useState } from "react";
import { collection } from "firebase/firestore";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { auth } from "../firebase/firebase_setup";

const NotificationItem = ({notification, pressedNotification}) => {

    let reminder = ""
    if(notification.posterId == auth.currentUser.uid){
        reminder = `Your post is accepted by ${notification.receiverEmail}`
    }else{
        reminder = `You accept ${notification.posterEmail} post`
    }

    return (
        <Pressable onPress={() => {pressedNotification()}}
        style={(obj)=>{return obj.pressed&&styles.pressedNotification}}>
            <View style={styles.container}>
            <MaterialCommunityIcons name="bell" size={18} color={"gray"} />
                <Text style={styles.postText}> {reminder} </Text>
            </View>
        </Pressable>
        
    );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: "95%",
    justifyContent: "left",
    backgroundColor: "#fff", //"#DDC4F6",
    flexDirection: "row",
    flex: 1,
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 1,
  },

  pressedNotification:{
    backgroundColor: "#9575CD",
    
    opacity: 0.5,
    borderRadius:5, 
  }, 

  postText:{
    // color: "white"
  }

});
  

export default NotificationItem;