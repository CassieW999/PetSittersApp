import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { auth } from "../firebase/firebase_setup";
// import color from "../helper/color";
import LocationManager from "../component/LocationManager";

const Profile = () => {

  return (
    <View style={styles.container}>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
      <LocationManager />
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

export default Profile;