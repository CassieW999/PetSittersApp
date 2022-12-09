import { StyleSheet, View, Text, Button, Alert, Image} from "react-native";
import React, { useState, useEffect } from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { updateAcceptToDB } from '../firebase/firebase';
import { auth } from "../firebase/firebase_setup";
import { writeNotificationToDB, deletePostFromDB } from '../firebase/firebase';
import { storage } from "../firebase/firebase_setup";
import { getDownloadURL, ref } from "firebase/storage";
import LocationManager from "../component/LocationManager";
import {scheduleNotificationHandler} from "../component/NotificationManager";


const PostDetails = ({route, navigation}) => {
const from = route.params.postObject.from
const to = route.params.postObject.to
const pet = route.params.postObject.pet
const location = route.params.postObject.location
const description = route.params.postObject.description
const key = route.params.postObject.key
const posterId = route.params.postObject.posterId
const token = route.params.postObject.token
const currenUserEmail = auth.currentUser.email
const posterEmail = route.params.postObject.posterEmail
const isAccepted = route.params.postObject.isAccepted
const uri = route.params.postObject.uri
const [imageURL, setImageURL] = useState("");

useEffect(() => {
  const getImageURL = async () => {
    try {
      if (uri) {
        const reference = ref(storage, uri);
        const downloadImageURL = await getDownloadURL(reference);
        setImageURL(downloadImageURL);
      }
    } catch (err) {
      console.log("download image ", err);
    }
  };
  getImageURL();
}, []);

let type = ""
switch(pet){
  case "dog": 
    type = "dog"
    break
  case "cat": 
    type = "cat"
    break
  case "both": 
    type = "paw"
    break
  default:
    type = "paw"
}


const locationPickerHandler = () => {
  navigation.navigate("Location");
};


const markAsAccept = async()=>{

  if (auth.currentUser.uid != posterId) {
    const notification = {
      postId: key, 
      receiverId: auth.currentUser.uid, 
      posterId: posterId, 
      receiverEmail: auth.currentUser.email, 
      posterEmail: posterEmail}
      
    await writeNotificationToDB(notification)
    await updateAcceptToDB(key, {isAccepted: true})
    await scheduleNotificationHandler(posterEmail)
    
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: token, 
        title: "Push notofication", 
        body: `Your post was accepted by ${currenUserEmail}`
      }),
    })
  } 
  else{
      Alert.alert("You cannot accept your own post")
  }
  navigation.goBack()
}

const onPressAccept = () => {
  if(!isAccepted){
    Alert.alert(
      'Accept to pet sitting?', 
      'Are you sure to provide petsitting?',
      [{
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {markAsAccept()},
        style: "done",
      }
    ])
  }else{
    Alert.alert(
      'Failed', 
      'The post has already been accepted!'
    )
  } 
}

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>

      <View style ={styles.userContainer}>
        {!imageURL && <MaterialCommunityIcons name="account" size={90} color={"gray"} />}
        {imageURL && (
          <Image source={{ uri: imageURL }} style={{ width: 100, height: 100 }} />
        )}
      </View>

      <View style={styles.time}>
          <Text style={styles.textStyle}>Owner: </Text>
          <Text style={styles.contentStyle}> {posterEmail} </Text>
        </View>

        <View style={styles.time}>
          <Text style={styles.textStyle}>From: </Text>
          <Text style={styles.contentStyle}> {from} </Text>
        </View>

        <View style={styles.time}>
          <Text style={styles.textStyle}>To: </Text>
          <Text style={styles.contentStyle}> {to} </Text>
        </View>
      </View>

      <View style = {styles.locationContainer}>
        <Text style={styles.textStyle}>Location: </Text>
        <Text style={styles.contentStyle}> {location} </Text>

      </View>

      <View style = {styles.petContainer}>
        <Text style={styles.textStyle}>Pet Type: </Text>
        <Text style={styles.contentStyle}> {pet} </Text>
        
      </View>
       
      <View style = {styles.descriptionContainer}>
        <Text style={styles.textStyle}>Description: </Text>
        <Text style={styles.inputText}> {description} </Text>
      </View>

      <Button title="Pick a location" color="#AF7AC5" onPress={locationPickerHandler} />

      <View style = {styles.buttonContainer}>
          <View style = {styles.confirmButtonStyle}>
            <Button title="Accept" onPress={onPressAccept} color="#AF7AC5"/>
          </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 30,
    height: "100%",
  },
  userContainer:{
    alignItems: "center", 
    marginBottom: 10, 
  }, 
  textStyle: {
    marginTop: 10, 
    marginLeft: "15%", 
    marginBottom: 5,
    width: "25%",
    fontSize: 16,
    alignItems: "center"
  }, 

  contentStyle:{
    marginTop: 10, 
    marginLeft: "15%", 
    marginBottom: 5,
    fontSize: 16,
    alignItems: "center"
  },
  
  timeContainer:{
    alignContent: "center",
    justifyContent: "center",
    flexDirection:"col",
  }, 

  time: {
    flexDirection: "row", 
  }, 

  locationContainer: {
    marginTop: 10,
    justifyContent: "left",
    flexDirection: "row"
  }, 

  petContainer: {
    marginTop: 10,
    justifyContent: "left",
    flexDirection: "row", 
    alignContent: "left",
  }, 

  buttonStyle:{
    width: "20%",
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
  },

  descriptionContainer: {
    marginTop: 10,
  }, 

  buttonContainer: {
    marginTop: 30,
    flexDirection: "row", 
    justifyContent: "center",
    alignContent: "center",
  }, 
  input: {
  },

  confirmButtonStyle: {
    width: "25%",
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
  }, 
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row", 
    justifyContent: "center",
    alignContent: "center",
  }, 
  confirmButtonStyle: {
    width: "25%",
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
  }, 
  inputText: {
    marginTop: 10, 
    marginLeft: "15%", 
    marginBottom: 5,
    width: "70%",
    fontSize: 15,
    height: 100, 
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  }

});

export default PostDetails;