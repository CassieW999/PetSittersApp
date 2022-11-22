import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import color from "../helper/color";

const TodoList = () => {

  return (
    <View style={styles.container}>
       <Text>This is TodoList Page</Text>
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

export default TodoList;