import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { DataTable } from "react-native-paper";
import { KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import WorkoutScreen from "./screens/WorkoutScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Workout"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Workout") {
              iconName = "dumbbell";
            } else if (route.name === "History") {
              iconName = "history";
            } else if (route.name === "Profile") {
              iconName = "user";
            }

            // You can return any component that you like here!
            // return <Ionicons name={iconName} size={size} color={color} />;
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen}></Tab.Screen>
        <Tab.Screen name="Workout" component={WorkoutScreen}></Tab.Screen>
        <Tab.Screen name="History" component={HistoryScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
