import { StyleSheet, View, Text, Button, TextInput, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState, useEffect} from "react";
import { writePostToDB } from '../firebase/firebase';
import { storage } from "../firebase/firebase_setup";
import ImageManager from "../component/ImageManager";
import { ref, uploadBytes } from "firebase/storage";
import { auth } from "../firebase/firebase_setup";
import * as Notifications from "expo-notifications";

const CreatPost = ({navigation}) => {

  const [from, setFrom] = useState(new Date())
  const [to, setTo] = useState(new Date())
  const [location, setLocation] = useState("")
  const [pet, setPet] = useState("")
  const [description, setDescription] = useState("")
  const [getPushToken, setPushToken] = useState()

  const selectedColor = "blue";
  const unselectedColor = "purple";
  const [dogButtonColor, setDogButtonColor] = useState(unselectedColor)
  const [catButtonColor, setCatButtonColor] = useState(unselectedColor)
  const [bothButtonColor, setBothButtonColor] = useState(unselectedColor)


  //get push the token of device
  const verifyPermission = async () => {
    const permissionStatus = await Notifications.getPermissionsAsync();
    if (permissionStatus.granted) {
      return true;
    }
    const requestedPermission = await Notifications.requestPermissionsAsync({
      ios: {
        allowBadge: true,
      },
    });
    return requestedPermission.granted;
  };


  useEffect(() => {
    const getPushToken = async () => {
      const hasPermission = verifyPermission();
      if (!hasPermission) {
        return;
      }
      try {
        const token = await Notifications.getExpoPushTokenAsync();
        setPushToken(token)
      } catch (err) {
        console.log("push token ", err);
        return null; 
      }
    };
    getPushToken();
  }, []);


  const getImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (err) {
      console.log("fetch image ", err);
    }
  };
  
  const onAdd = async (from, to, location, pet, description, uri)=>{
    const fromDate = from.toLocaleDateString('en-US') // toLocaleTimeString
    const toDate = to.toLocaleDateString("en-US")
    if (uri) {
      const imageBlob = await getImage(uri);
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = await ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytes(imageRef, imageBlob);
      uri = uploadResult.metadata.fullPath;
    }

    await writePostToDB({
      from: fromDate, to:toDate, 
      location: location, 
      pet: pet, 
      description: description, 
      isAccepted: false, 
      uri,
      posterEmail: auth.currentUser.email, 
      token: getPushToken.data, 
      posterId:auth.currentUser.uid})
      
    navigation.goBack()
}
  
  const onChangeFrom = (event, selectedDate) => {

    if (event.type === 'dismissed') {
      return;
    }
    setFrom(selectedDate);
  };

  const onChangeTo = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      return;
    }
    setTo(selectedDate)
  };

  const pressedDog = () =>{
    setDogButtonColor(selectedColor)
    setCatButtonColor(unselectedColor)
    setBothButtonColor(unselectedColor)
    setPet("dog")
  }

  const pressedCat = () =>{
    setDogButtonColor(unselectedColor)
    setCatButtonColor(selectedColor)
    setBothButtonColor(unselectedColor)
    setPet("cat")
  }

  const pressedBoth = () =>{
    setDogButtonColor(unselectedColor)
    setCatButtonColor(unselectedColor)
    setBothButtonColor(selectedColor)
    setPet("both")
  }

  const [uri, setUri] = useState("");
  const imageHandler = (uri) => {
    console.log("imageHandler called", uri);
    setUri(uri);
  };


  return (
    <View style={styles.container}>

      <View style={styles.timeContainer}>
        <View style={styles.time}>
          <Text style={styles.textStyle}>From: </Text>
          <DateTimePicker mode="date" value={from} onChange={onChangeFrom}/>
        </View>

        <View style={styles.time}>
          <Text style={styles.textStyle}>To: </Text>
          <DateTimePicker mode="date" value={to} onChange={onChangeTo}/>
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
        <View style={styles.buttonStyle}><Button  title="Dog" onPress={pressedDog} color = {dogButtonColor} /></View>
        <View style={styles.buttonStyle}><Button title="Cat" onPress={pressedCat} color = {catButtonColor}  /></View>
        <View style={styles.buttonStyle}><Button title="Both" onPress={pressedBoth} color = {bothButtonColor}  /></View>
      </View>
       
      <View style = {styles.descriptionContainer}>
        <Text style={styles.textStyle}>Description: </Text>
        <TextInput 
          style = {styles.DescriptionInput}
          value = {description} 
          multiline={true}
          blurOnSubmit={true}
          onChangeText={(newDescription) => {
            setDescription(newDescription)
          }}/>
        <ImageManager imageHandler={imageHandler} />

        <View style = {styles.buttonContainer}>
          <View style = {styles.confirmButtonStyle}>
            <Button title="Confirm" onPress={
              ()=>{
                onAdd(from, to, location, pet, description, uri)
                setFrom(new Date())
                setTo(new Date())
                setLocation("")
                setPet("")
                setDescription("")
                setUri("")
              }
            } color="purple" />
          </View>
          
          <View style = {styles.confirmButtonStyle}>
            <Button title="Cancel" onPress={()=>{navigation.goBack()}} color= "purple"/>
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
    height: "100%",
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
  }, 

  locationContainer: {
    marginTop: 20,
    justifyContent: "left",
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
    width: "20%",
    marginRight: 5,
    borderRadius: 10,
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
    marginLeft: "5%", 
    textAlignVertical: "top", 

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
  }

});

export default CreatPost;