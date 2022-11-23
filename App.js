import Home from "./screens/Home";
import PostDetails from "./screens/PostDetails";
import CreatPost from "./screens/CreatPost";
import TodoList from "./screens/TodoList";
import AddTodo from "./screens/AddTodo";
import Notification from "./screens/Notification";
import Profile from "./screens/Profile";
import IconButton from "./component/IconButton";
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";

// Define vars
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ScreenOverView = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "FFCCFF" },
        headerTintColor: "#AF7AC5",
        tabBarStyle: { backgroundColor: "FFCCFF" },
        tabBarActiveTintColor: "#AF7AC5",
        headerTitleStyle: { fontSize: "16", fontWeight: "400" },
        headerRight: ({ tintColor }) => {
          return (
            <View style={styles.container}>
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("CreatPost");
              }}
            />
            
            <IconButton
              icon="location"
              size={24}
              color={tintColor}
              onPress={() => {
                // navigation.navigate("");
              }}
            />

            {/* <IconButton
              icon="location"
              size={24}
              color={tintColor}
              onPress={() => {
                // navigation.navigate("");
              }}
            /> */}
            </View>
          );
        },
      })}
    >
      <BottomTabs.Screen
        name="homePage"
        component={Home}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => {
            return <AntDesign name="home" size={18} color = {color} />;
          },
        }}
      />
      <BottomTabs.Screen
        name= "Todo"
        component={TodoList}
        options={{
          title: "Todo",
          tabBarLabel: "Todo",
          tabBarIcon: ({ color }) => {
            return <Entypo name="list" size={18} color= {color} />;
          },
        }}
      />
      <BottomTabs.Screen
        name= "Notification"
        component={Notification}
        options={{
          title: "Notification",
          tabBarLabel: "Notification",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="notifications" size={18} color={color} />;
          },
        }}
      />
      <BottomTabs.Screen
        name= "Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => {
            return <MaterialCommunityIcons name="account" size={18} color={color} />;
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "FFCCFF" },
            headerTintColor: "#AF7AC5",
            tabBarStyle: { backgroundColor: "FFCCFF" },
            tabBarActiveTintColor: "#AF7AC5",
            headerTitleStyle: { fontSize: "16", fontWeight: "400" },
          }}
        >
          <Stack.Screen
            name="screenOverView"
            component={ScreenOverView}
            options={{ headerShown: false }} // to disable the native stac header
          />
          <Stack.Screen
            name="postDetails"
            component={PostDetails}
            options={{
              tabBarLabel: "Post",
              title: "Post",
            }}
          />
          <Stack.Screen
            name="CreatPost"
            component={CreatPost}
            options={{
              tabBarLabel: "Creat Post",
              title: "Creat Post",
            }}
          />
          <Stack.Screen
            name="addTodo"
            component={AddTodo}
            options={{
              tabBarLabel: "Add Todo",
              title: "Add Todo",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 8,
    // paddingTop: 30,
    // backgroundColor: "#FFFFFF",
    // height: "100%",
    flexDirection: "row",
  },

});