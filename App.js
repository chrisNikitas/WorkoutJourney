import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { DataTable } from "react-native-paper";
import { KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import WorkoutScreen from "./screens/workout/StartWorkoutScreen";
import HistoryScreen from "./screens/history/HistoryScreen";
import GoalSpecificScreen from "./screens/history/GoalSpecificScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";

import FactorsScreen from "./screens/workout/FactorsScreen";
import NewWorkoutScreen from "./screens/workout/NewWorkoutScreen";

import WorkoutDataProvider from "./store/WorkoutData.js";

import { firebase } from "@react-native-firebase/database";

const reference = firebase
  .app()
  .database(
    "https://fitness-app-cc6bd-default-rtdb.europe-west1.firebasedatabase.app/"
  )
  .ref("/users/123");

const WorkoutScreenStackNav = createNativeStackNavigator();
const HistoryTab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();

function WorkoutScreenStack() {
  return (
    <WorkoutScreenStackNav.Navigator
      screenOptions={{ animation: "slide_from_right", headerShown: true }}
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
  );
}

function HistoryScreenTab() {
  return (
    <HistoryTab.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName="PrevWorkouts"
    >
      <HistoryTab.Screen
        name="PrevWorkouts"
        options={{ headerTitle: "PrevWorkouts" }}
        component={HistoryScreen}
      />
      <HistoryTab.Screen
        options={{ headerTitle: "Goal Specific" }}
        name="GoalSpecific"
        component={GoalSpecificScreen}
      />
    </HistoryTab.Navigator>
  );
}

// function getHeaderTitle(route) {
//   // If the focused route is not found, we need to assume it's the initial screen
//   // This can happen during if there hasn't been any navigation inside the screen
//   // In our case, it's "Feed" as that's the first screen inside the navigator
//   const routeName = getFocusedRouteNameFromRoute(route);

//   switch (routeName) {
//     case "StartWorkout":
//       return "Start Your Workout";
//     case "Factors":
//       return "Factors";
//     case "NewWorkout":
//       return "New Workout";
//     default:
//       return "";
//   }
// }

export default function App() {
  return (
    <>
      <WorkoutDataProvider>
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
                return (
                  <FontAwesome5 name={iconName} size={size} color={color} />
                );
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={({ route }) => ({
                title: "Your Goals",
              })}
            ></Tab.Screen>
            <Tab.Screen
              name="Workout"
              component={WorkoutScreenStack}
              options={({ route }) => ({
                title: "Workout",
                headerShown: false,
              })}
            ></Tab.Screen>
            <Tab.Screen
              name="History"
              component={HistoryScreenTab}
            ></Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </WorkoutDataProvider>
    </>
  );
}
