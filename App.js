import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { DataTable } from "react-native-paper";
import { KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome5 } from "@expo/vector-icons";

import WorkoutScreen from "./screens/StartWorkoutScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";

import FactorsScreen from "./screens/stackWorkoutScreen/FactorsScreen";
import NewWorkoutScreen from "./screens/stackWorkoutScreen/NewWorkoutScreen";

import WorkoutDataProvider from "./store/WorkoutData.js";

const WorkoutScreenStackNav = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function WorkoutScreenStack() {
  return (
    <WorkoutDataProvider>
      <WorkoutScreenStackNav.Navigator initialRouteName="StartWorkout">
        <WorkoutScreenStackNav.Screen
          name="StartWorkout"
          component={WorkoutScreen}
          options={{ headerShown: false }}
        />
        <WorkoutScreenStackNav.Screen
          name="Factors"
          component={FactorsScreen}
          options={{ headerShown: true }}
        />
        <WorkoutScreenStackNav.Screen
          name="NewWorkout"
          component={NewWorkoutScreen}
          options={{ headerShown: true }}
        />
      </WorkoutScreenStackNav.Navigator>
    </WorkoutDataProvider>
  );
}

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
        <Tab.Screen name="Workout" component={WorkoutScreenStack}></Tab.Screen>
        <Tab.Screen name="History" component={HistoryScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
