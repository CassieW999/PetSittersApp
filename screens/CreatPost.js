import { StyleSheet, View, Text, Button, TextInput, Alert } from "react-native";
// import color from "../helper/color";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect} from "react";
import { writeToDB } from '../firebase/firebase';


const CreatPost = () => {

  const [from, setFrom] = useState(new Date())
  const [to, setTo] = useState(new Date())
  const [location, setLocation] = useState("")
  const [pet, setPet] = useState("")
  const [description, setDescription] = useState("")


  const onAdd = async (from, to, location, pet, description)=>{
      await writeToDB({from: from, to:to, location: location, pet: pet, description: description})
      navigation.goBack()
}

  const confirmButton = ()=>{
    console.log("confirm")
  }

  const cancelButton = ()=>{
    console.log("cancle")
  }
  
  const onChangeFrom = (event, selectedDate) => {

    if (event.type === 'dismissed') {
      return;
    }
    setFrom(selectedDate);
    console.log("seleted from date: ", selectedDate)
    console.log("date: ", from)
  };

  const onChangeTo = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      return;
    }
    setTo(selectedDate)
    console.log("seleted to date: ", selectedDate)
    console.log("date: ", to)
  };

  const pressedDog = () =>{
    setPet("dog")
  }

  const pressedCat = () =>{
    setPet("cat")
  }

  const pressedBoth = () =>{
    setPet("both")
  }


  return (
    <View style={styles.container}>

      <View style={styles.timeContainer}>
        <View style={styles.time}>
          <Text style={styles.textStyle}>From: </Text>
          <DateTimePicker mode="datetime" value={from} onChange={onChangeFrom}/>
        </View>

        <View style={styles.time}>
          <Text style={styles.timeText}>To: </Text>
          <DateTimePicker mode="datetime" value={to} onChange={onChangeTo}/>
        </View>
      </View>

      <View style = {styles.locationContainer}>
        <Text>Location: </Text>
        <TextInput 
          style = {styles.locationInput}
          value = {location} 
          onChangeText={(newLocation) => {
            setLocation(newLocation)
          }}/>
      </View>

      <View style = {styles.petContainer}>
        <View>
          <Text style = {styles.petText}>Pet Type: </Text>
        </View>
  
        <View style = {styles.buttonContainer}>
          <Button title="Dog" onPress={pressedDog} color = "purple" />
          <Button title="Cat" onPress={pressedCat} color = "purple"  />
          <Button title="Both" onPress={pressedBoth} color = "purple"  />
        </View>

      </View>
       
      <View style = {styles.descriptionContainer}>
        <Text>Description: </Text>
        <TextInput 
          style = {styles.DescriptionInput}
          value = {description} 
          onChangeText={(newDescription) => {
            setLocation(newDescription)
          }}/>
      </View>

      <View style = {styles.buttonContainer}>
        <Button title="Confirm" onPress={
          ()=>{
            onAdd(from, to, location, pet, description)
            setFrom(new Date())
            setTo(new Date())
            setLocation("")
            setPet("")
            setDescription("")
          }
        } color="purple" />
        <Button title="Cancel" onPress={cancelButton} color= "purple"/>
      </View>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 30,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "90%", 
    marginTop: 50, 
  },
  timeContainer:{
    backgroundColor: "red",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection:"col",
  }, 
  time: {
    flexDirection: "row", 
    marginBottom: 7, 
  }, 
  textStyle: {
    marginTop: 7, 
  }, 

  locationContainer: {
    flex: 1, 
    justifyContent: "left",
    backgroundColor: "pink",
    flexDirection: "row"
  }, 

  locationInput: {
    width: "50%",
    height: 30,
    backgroundColor:'white', 
    borderWidth: 1,
    borderRadius: 5,
    margin: 0, 
  }, 

  petContainer: {
    flex: 1, 
    justifyContent: "left",
    flexDirection: "row", 
    backgroundColor: "green", 
    alignContent: "left",

  }, 
  petText: {
    //flex: 1
    backgroundColor: "yellow",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 40
  }, 

  descriptionContainer: {
    flex: 3, 
    justifyContent: "center",
    backgroundColor: "blue"
  }, 
  button: {
    flexDirection:"row",
  }, 

  DescriptionInput: {
    width: "90%",
    height: 80,
    backgroundColor:'white', 
    borderWidth: 1,
    borderRadius: 5,
    margin: 0, 
  }, 

  buttonContainer: {
    flex: 2,
    marginTop: 30,
    flexDirection: "row", 
    justifyContent: "center",
    alignContent: "center",
  }, 
  input: {
  }

});

export default CreatPost;