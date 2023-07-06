import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as LocalStore from "./store/LocalStore";
import uuid from "react-native-uuid";
import allFactors from "./data/FactorsList.json";
import * as RootNavigation from "./RootNavigation.js";
import messaging from "@react-native-firebase/messaging";

// import * as Notifications from "expo-notifications";

const init = async () => {
  try {
    initAppUUID();
    checkEntryQuestionnaire();
    checkExitQuestionnaire();
    initInitialFactors();
    registerForPushNotificationsAsync();
    // LocalStore.clearAll();
  } catch (e) {
    // handle error
    console.log(e);
  }
};

// Requesting permission to show notifications
// async function requestPermissions() {
//   const { status } = await Notifications.requestPermissionsAsync();
// }

const checkEntryQuestionnaire = () => {
  LocalStore.getData("entryQuestionnaireDone").then((b) => {
    if (b) return;
    else RootNavigation.navigate("SurveyContent", { screen: "EntrySurvey" });
  });
};

const scheduleNotification = async () => {
  // var t = new Date();
  // t.setMinutes(t.getMinutes() + 2);
  // Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: "Look at that notification",
  //     body: "10 minutes",
  //   },
  //   trigger: t,
  // });
};

const checkExitQuestionnaire = () => {
  // LocalStore.removeData("endDate");
  LocalStore.getData("endDate").then((v) => {
    console.log();
    console.log(Date.now());
    if (!v) {
      var endDate = new Date(Date.now() + 12096e5);
      LocalStore.storeData("endDate", endDate);
    } else if (Date.now() > new Date(v).getTime()) {
      console.log("Study Ended");
    } else if (Date.now() < new Date(v).getTime()) {
      console.log("Within Study Time");
    }
  });
};

async function registerForPushNotificationsAsync() {
  let status;

  status = await Notifications.getPermissionsAsync();
  if (status.status !== "granted") {
    status = await Notifications.requestPermissionsAsync();
    if (status.status !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const token = await messaging().getToken();
  LocalStore.storeData("fcmToken", token);
  return token;
}

const initInitialFactors = async () => {
  const currentData = await LocalStore.getData("factors");
  // If there is no data, then we set the initial data
  if (!currentData) {
    const initialData = allFactors;

    await LocalStore.storeData("factors", initialData);
  }
};

const initAppUUID = () => {
  LocalStore.getData("appID").then((id) => {
    if (id == null) {
      // first time opening app
      console.log("Creating first time id");
      LocalStore.storeData("appID", uuid.v1()).then((newId) => {
        global.appID = newId;
      });
    } else {
      global.appID = id;
    }
  });
};

export default init;
