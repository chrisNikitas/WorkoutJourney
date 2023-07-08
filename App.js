import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import { createStackNavigator } from "@react-navigation/stack";

import { useEffect } from "react";

import { StatusBar } from "expo-status-bar";

import GoalSpecificScreen from "./screens/history/GoalSpecificScreen";
import HistoryScreen from "./screens/history/HistoryScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import WorkoutScreen from "./screens/workout/StartWorkoutScreen";

import NewGoalScreen from "./screens/profile/NewGoalScreen";
import SelectExerciseScreen from "./components/global/SelectExerciseScreen";
import FactorsScreen from "./screens/workout/FactorsScreen";
import NewWorkoutScreen from "./screens/workout/NewWorkoutScreen";

import FactorModal from "./components/workout/FactorModal";
import NewFactorModal from "./components/workout/NewFactorModal";

import AllWorkoutsDataProvider from "./store/AllWorkoutsData";
import WorkoutDataProvider from "./store/WorkoutData.js";
import GoalDataProvider from "./store/GoalData";

import ExitSurvey from "./components/surveys/ExitSurvey";
import EntrySurvey from "./components/surveys/EntrySurvey";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

import * as Notifications from "expo-notifications";
// import * as NotificationHandler from "./NotificationHandler";

import init from "./appInit";

const WorkoutScreenStackNav = createNativeStackNavigator();
const StatsTabNav = createMaterialTopTabNavigator();
const TabNav = createBottomTabNavigator();
const ProfileScreenStackNav = createNativeStackNavigator();
const SurveysStackNav = createNativeStackNavigator();
const AppStackNav = createNativeStackNavigator();

global.appID;
init();

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const hideOnScreens = ["NewGoalScreen"]; // put here name of screen where you want to hide tabBar
  return hideOnScreens.indexOf(routeName) <= -1;
};

function SurveysStack() {
  return (
    <SurveysStackNav.Navigator screenOptions={{ headerBackVisible: false }}>
      <SurveysStackNav.Screen name="EntrySurvey" component={EntrySurvey} />
      <SurveysStackNav.Screen name="ExitSurvey" component={ExitSurvey} />
    </SurveysStackNav.Navigator>
  );
}

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
        <WorkoutScreenStackNav.Group>
          <WorkoutScreenStackNav.Screen
            options={{ headerTitle: "Add your factors" }}
            name="Factors"
            component={FactorsScreen}
          />
          <WorkoutScreenStackNav.Screen
            options={{
              headerTitle: "Add factor",
              animation: "slide_from_bottom",
            }}
            name="FactorModal"
            component={FactorModal}
          />
          <WorkoutScreenStackNav.Screen
            options={{
              headerTitle: "Add new factor",
              animation: "slide_from_bottom",
            }}
            name="NewFactorModal"
            component={NewFactorModal}
          />
        </WorkoutScreenStackNav.Group>
        <WorkoutScreenStackNav.Screen
          options={{ headerTitle: "Current Workout" }}
          name="NewWorkout"
          component={NewWorkoutScreen}
        />
        {/* <WorkoutScreenStackNav.Screen
          options={{ headerTitle: "Select Exercise" }}
          name="SelectExerciseScreen"
          component={SelectExerciseScreen}
        /> */}
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
      screenOptions={{
        animation: "slide_from_right",
        headerShown: true,
      }}
      initialRouteName="ProfileScreen"
    >
      <ProfileScreenStackNav.Screen
        name="ProfileScreen"
        options={{ headerTitle: "Your Goals" }}
        component={ProfileScreen}
      />
      <ProfileScreenStackNav.Screen
        name="NewGoalScreen"
        options={{ headerTitle: "Add Goal", animation: "slide_from_bottom" }}
        component={NewGoalScreen}
      />
    </ProfileScreenStackNav.Navigator>
  );
}

function MainContentTab() {
  return (
    <TabNav.Navigator
      initialRouteName="Workout"
      screenOptions={({ route }) => ({
        tabBarStyle: { display: getTabBarVisibility(route) ? "flex" : "none" },
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
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <TabNav.Screen
        name="Profile"
        component={ProfileScreenStack}
        options={({ route }) => ({
          headerShown: false,
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
      <TabNav.Screen name="Stats" component={StatsScreenTab}></TabNav.Screen>
    </TabNav.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  // Register background handler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });

  return (
    <>
      <StatusBar style="auto" />
      <AllWorkoutsDataProvider>
        <GoalDataProvider>
          <NavigationContainer ref={navigationRef}>
            <AppStackNav.Navigator
              // screenOptions={{ headerShown: false }}
              initialRouteName="MainContent"
            >
              <AppStackNav.Screen
                options={{ headerShown: false }}
                name={"MainContent"}
                component={MainContentTab}
              />
              <AppStackNav.Screen
                options={{ headerShown: false }}
                name={"SurveyContent"}
                component={SurveysStack}
              />
              <AppStackNav.Screen
                options={{
                  headerTitle: "Select Exercise",
                  headerShown: true,
                  animation: "slide_from_bottom",
                }}
                name="SelectExerciseScreen"
                component={SelectExerciseScreen}
              />
            </AppStackNav.Navigator>
          </NavigationContainer>
        </GoalDataProvider>
      </AllWorkoutsDataProvider>
    </>
  );
}
