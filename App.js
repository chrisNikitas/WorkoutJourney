import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { DataTable } from "react-native-paper";
import { KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { FontAwesome5 } from "@expo/vector-icons";

import WorkoutScreen from "./screens/StartWorkoutScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";

import FactorsScreen from "./screens/stackWorkoutScreen/factorsScreen/FactorsScreen";
import NewWorkoutScreen from "./screens/stackWorkoutScreen/NewWorkoutScreen";

import WorkoutDataProvider from "./store/WorkoutData.js";

const WorkoutScreenStackNav = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function WorkoutScreenStack() {
  return (
    <WorkoutDataProvider>
      <WorkoutScreenStackNav.Navigator
        screenOptions={{ animation: "none", headerShown: true }}
        initialRouteName="StartWorkout"
      >
        <WorkoutScreenStackNav.Screen
          name="StartWorkout"
          options={{ headerTitle: "Workout" }}
          component={WorkoutScreen}
        />
        <WorkoutScreenStackNav.Screen
          options={{ headerTitle: "Add your factors" }}
          name="Factors"
          component={FactorsScreen}
        />
        <WorkoutScreenStackNav.Screen
          options={{ headerTitle: "Current Workout" }}
          name="NewWorkout"
          component={NewWorkoutScreen}
        />
      </WorkoutScreenStackNav.Navigator>
    </WorkoutDataProvider>
  );
}

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case "StartWorkout":
      return "Start Your Workout";
    case "Factors":
      return "Factors";
    case "NewWorkout":
      return "New Workout";
    default:
      return "";
  }
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
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
          <Tab.Screen
            name="Workout"
            component={WorkoutScreenStack}
            options={({ route }) => ({
              title: getHeaderTitle(route),
              headerShown: false,
            })}
          ></Tab.Screen>
          <Tab.Screen name="History" component={HistoryScreen}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
