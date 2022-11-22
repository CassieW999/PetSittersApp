import { StyleSheet, View } from "react-native";
import React from "react";
import color from "../helper/color";

const PostDetails = () => {

  return (
    <View style={styles.container}>
       <Text>This is PostDetails Page</Text>
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

export default PostDetails;