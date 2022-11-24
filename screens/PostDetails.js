import { StyleSheet, View, Text, Button, Alert} from "react-native";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";


const PostDetails = ({route, navigation}) => {
const from = route.params.postObject.from
const to = route.params.postObject.to
const pet = route.params.postObject.pet
const location = route.params.postObject.location
const description = route.params.postObject.description
const key = route.params.postObject.key

const markAsAccept = async()=>{
  await updateAcceptToDB(key, {isAccepted: true})
  navigation.goBack()
}

const onPressAccept = () => {
  Alert.alert(
    'Mark as Accept to Todo?', 
    'Are you sure you want to mark it Accept?',
    [{
      text: "Cancel",
      onPress: () => {},
      style: "cancel",
    },
    {
      text: "Yes",
      onPress: () => {markAsAccept()},
      style: "done",
    }
  ])
}

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        
      <View style ={styles.userContainer}>
        <MaterialCommunityIcons name="account" size={90} color={"gray"} />
      </View>

        <View style={styles.time}>
          <Text style={styles.textStyle}>From: </Text>
          <Text style={styles.textStyle}> {from} </Text>
        </View>

        <View style={styles.time}>
          <Text style={styles.textStyle}>To: </Text>
          <Text style={styles.textStyle}> {to} </Text>
        </View>
      </View>

      <View style = {styles.locationContainer}>
        <Text style={styles.textStyle}>Location: </Text>
        <Text style={styles.textStyle}> {location} </Text>

      </View>

      <View style = {styles.petContainer}>
        <Text style={styles.textStyle}>Pet Type: </Text>
        <Text style={styles.textStyle}> {pet} </Text>
        
      </View>
       
      <View style = {styles.descriptionContainer}>
        <Text style={styles.descripText}>Description: </Text>
        <Text style={styles.inputText}> {description} </Text>
      </View>

      <View style = {styles.buttonContainer}>
          <View style = {styles.confirmButtonStyle}>
            <Button title="Accept" onPress={onPressAccept} color= "purple"/>
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
    marginLeft: "16%", 
    marginBottom: 5,
    width: "25%",
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

  descripText: {
    marginTop: 10, 
    marginLeft: "16%", 
    marginBottom: 5,
    width: "50%",
    fontSize: 20,
    alignItems: "center", 

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
    marginLeft: "16%", 
    marginBottom: 5,
    width: "90%",
    fontSize: 15,
    height: 50, 
    alignItems: "center",
  }

});

export default PostDetails;