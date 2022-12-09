import { View, Text, TextInput, StyleSheet, Button, Alert, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/firebase_setup";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred);
    } catch (err) {
      Alert.alert(err.message);
      console.log(err.message);
    }
  };
  return (
    <View style={styles.authContent}>
      <Image
        source={{
          uri: `http://m.qpic.cn/psc?/V14cWuDq2zd7rR/bqQfVz5yrrGYSXMvKr.cqX.z4TClcIbLujtGdtjG7aJxsfHrjdieG9BMa4xI3bxE80sOH64O.yMUQ4RrnFZdkyGOtiZr7.nzZzpOWPT1QVk!/b&bo=1wGwANcBsAABByA!&rf=viewer_4`,
        }}
        style={styles.image_title}
        resizeMode="cover"
      />
      <Image
        source={{
          uri: `https://ts1.cn.mm.bing.net/th/id/R-C.c02143e4112f72c468940d58ecc2d95e?rik=LdmRoCR%2freEwag&riu=http%3a%2f%2falstyle.xmyeditor.com%2fsucai-png%2f20200810%2f5f30eee828931dghrdljghv.stakukifvdrxiqmkutwskdtiistzfb&ehk=QDGt5N0Fuuix9g73m3oV8cubMxFNW%2f7VN%2fSYk32lWqU%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1`,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(newEmail) => setEmail(newEmail)}
        value={email}
        keyboardType="email-address"
      />
      <Text style={styles.label}>password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(newPass) => setPassword(newPass)}
        value={password}
        placeholder="Password"
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Log In</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.replace("Signup")}>
        <Text style={styles.text}>New User?</Text>
        <Text style={styles.text}>Create an account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  authContent: {
    padding: 16,
    paddingTop: 5,
    flex: 1,
    justifyContent: "center",
    backgroundColor:"#D8BFD8",
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    marginTop:15,
    marginBottom: 4,
    color: "#9370DB",
  },

  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: "#FAEBD7",
  },
  button: {
    fontSize: 2,
    minHeight: 20,
    marginTop: 20,
    paddingVertical:3,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#9370DB',
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
  image: {
    width: "35%",
    height: "12%",
    alignSelf: "center",
    marginTop:40,
  },
  image_title: {
    width: "75%",
    height: "12%",
    alignSelf: "center",
  },
});