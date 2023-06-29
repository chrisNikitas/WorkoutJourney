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
import SelectExerciseModal from "./components/global/SelectExerciseModal";
import SelectExerciseScreen from "./components/global/SelectExerciseScreen";

import WorkoutDataProvider from "./store/WorkoutData.js";
import AllWorkoutsDataProvider from "./store/AllWorkoutsData";

import { firebase } from "@react-native-firebase/database";

const reference = firebase
  .app()
  .database(
    "https://fitness-app-cc6bd-default-rtdb.europe-west1.firebasedatabase.app/"
  )
  .ref("/users/123");

const WorkoutScreenStackNav = createNativeStackNavigator();
const StatsTabNav = createMaterialTopTabNavigator();
const TabNav = createBottomTabNavigator();
const ProfileScreenStackNav = createNativeStackNavigator();

function WorkoutScreenStack() {
  return (
    <WorkoutDataProvider>
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
        <WorkoutScreenStackNav.Screen
          options={{ headerTitle: "Select Exercise" }}
          name="SelectExerciseScreen"
          component={SelectExerciseScreen}
        />
      </WorkoutScreenStackNav.Navigator>
    </WorkoutDataProvider>
  );
}

function StatsScreenTab() {
  return (
    <StatsTabNav.Navigator
      screenOptions={{ headerShown: true, swipeEnabled: false }}
      initialRouteName="GoalSpecific"
    >
      <StatsTabNav.Screen
        name="History"
        options={{ headerTitle: "History" }}
        component={HistoryScreen}
      />
      <StatsTabNav.Screen
        options={{ headerTitle: "Goal Specific" }}
        name="Goal Specific"
        component={GoalSpecificScreen}
      />
    </StatsTabNav.Navigator>
  );
}

function ProfileScreenStack() {
  return (
    <ProfileScreenStackNav.Navigator
      screenOptions={{ animation: "slide_from_right", headerShown: false }}
      initialRouteName="GoalsScreen"
    >
      <ProfileScreenStackNav.Screen
        name="ProfileScreen"
        options={{ headerTitle: "Your Gosals" }}
        component={ProfileScreen}
      />
    </ProfileScreenStackNav.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AllWorkoutsDataProvider>
        <NavigationContainer>
          <TabNav.Navigator
            initialRouteName="Workout"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Workout") {
                  iconName = "dumbbell";
                } else if (route.name === "Stats") {
                  iconName = "chart-bar";
                } else if (route.name === "Profile") {
                  iconName = "bullseye";
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
            <TabNav.Screen
              name="Profile"
              component={ProfileScreenStack}
              options={({ route }) => ({
                title: "Your Goals",
              })}
            ></TabNav.Screen>
            <TabNav.Screen
              name="Workout"
              component={WorkoutScreenStack}
              options={({ route }) => ({
                title: "Workout",
                headerShown: false,
              })}
            ></TabNav.Screen>
            <TabNav.Screen
              name="Stats"
              component={StatsScreenTab}
            ></TabNav.Screen>
          </TabNav.Navigator>
        </NavigationContainer>
      </AllWorkoutsDataProvider>
    </>
  );
}
