import { StyleSheet, View, Text, Button, TextInput, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect} from "react";
import { writePostToDB } from '../firebase/firebase';


const CreatPost = ({navigation}) => {

  const [from, setFrom] = useState(new Date())
  const [to, setTo] = useState(new Date())
  const [location, setLocation] = useState("")
  const [pet, setPet] = useState("")
  const [description, setDescription] = useState("")


  const onAdd = async (from, to, location, pet, description)=>{
      await writePostToDB({from: from, to:to, location: location, pet: pet, description: description})
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
    console.log("dog")
  }

  const pressedCat = () =>{
    setPet("cat")
    console.log("cat")
  }

  const pressedBoth = () =>{
    setPet("both")
    console.log("both")
  }


  return (
    <View style={styles.container}>

      <View style={styles.timeContainer}>
        {/* <Text style={styles.textStyle}>Pet Sitter Time: </Text> */}
        <View style={styles.time}>
          <Text style={styles.textStyle}>From: </Text>
          <DateTimePicker mode="datetime" value={from} onChange={onChangeFrom}/>
        </View>

        <View style={styles.time}>
          <Text style={styles.textStyle}>To: </Text>
          <DateTimePicker mode="datetime" value={to} onChange={onChangeTo}/>
        </View>
      </View>

      <View style = {styles.locationContainer}>
        <Text style={styles.textStyle}>Location: </Text>
        <TextInput 
          style = {styles.locationInput}
          value = {location} 
          onChangeText={(newLocation) => {
            setLocation(newLocation)
          }}/>
      </View>

      <View style = {styles.petContainer}>
        <Text style={styles.textStyle}>Pet Type: </Text>
        <View style={styles.buttonStyle}><Button  title="Dog" onPress={pressedDog} color = "purple" /></View>
        <View style={styles.buttonStyle}><Button title="Cat" onPress={pressedCat} color = "purple"  /></View>
        <View style={styles.buttonStyle}><Button title="Both" onPress={pressedBoth} color = "purple"  /></View>
      </View>
       
      <View style = {styles.descriptionContainer}>
        <Text style={styles.textStyle}>Description: </Text>
        <TextInput 
          style = {styles.DescriptionInput}
          value = {description} 
          onChangeText={(newDescription) => {
            setDescription(newDescription)
          }}/>

        <View style = {styles.buttonContainer}>
          <View style = {styles.confirmButtonStyle}>
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
          </View>
          
          <View style = {styles.confirmButtonStyle}>
            <Button title="Cancel" onPress={cancelButton} color= "purple"/>
          </View>
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
    //alignContent: "center",
    //justifyContent: "center",
    // backgroundColor: "#FFFFFF",
    //backgroundColor: "orange",
    height: "100%",
    // width: "90%", 
    // marginTop: 50, 
  },

  textStyle: {
    marginTop: 10, 
    marginLeft: "5%", 
    marginRight: 5, 
    marginBottom: 5,
    width: "25%",
    fontSize: 16,
  }, 
  
  timeContainer:{
    alignContent: "center",
    justifyContent: "center",
    flexDirection:"col",
  }, 

  time: {
    flexDirection: "row", 
    marginBottom: 7, 
    // marginLeft: 20, 
  }, 

  locationContainer: {
    // flex: 0.5, 
    marginTop: 20,
    justifyContent: "left",
    //backgroundColor: "pink",
    flexDirection: "row"
  }, 

  locationInput: {
    width: "60%",
    height: 30,
    backgroundColor:'white', 
    borderWidth: 1,
    borderRadius: 5,
    margin: 0, 
  }, 

  petContainer: {
    marginTop: 20,
    justifyContent: "left",
    flexDirection: "row", 
    alignContent: "left",
  }, 

  buttonStyle:{
    //minWidth: 25,
    width: "20%",
    //marginLeft: 10,
    marginRight: 5,
    borderRadius: 10,
    //backgroundColor: "AF7AC5",
    borderWidth: 1,
  },

  descriptionContainer: {
    marginTop: 20,
  }, 

  DescriptionInput: {
    width: "85%",
    height: 100,
    backgroundColor:'white', 
    borderWidth: 1,
    borderRadius: 5,
    margin: 0, 
    marginLeft: "5%", 
  }, 

  buttonContainer: {
    marginTop: 30,
    flexDirection: "row", 
    justifyContent: "center",
    alignContent: "center",
    //backgroundColor: "yellow", 
  }, 
  input: {
  },

  confirmButtonStyle: {
    width: "25%",
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
  }

});

export default CreatPost;