import { StyleSheet, View } from "react-native";
import React from "react";
import color from "../helper/color";

const Profile = () => {

  return (
    <View style={styles.container}>
       <Text>This is the Profile Page</Text>
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