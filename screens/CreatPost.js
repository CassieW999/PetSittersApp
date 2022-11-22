import { StyleSheet, View } from "react-native";
import React from "react";
import color from "../helper/color";

const CreatPost = () => {

  return (
    <View style={styles.container}>
       <Text>This is CreatPost Page</Text>
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

export default CreatPost;