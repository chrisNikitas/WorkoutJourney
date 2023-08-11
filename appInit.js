import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
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
    checkExitQuestionnaire();
    checkEntryQuestionnaire();
    initInitialFactors();
    registerForPushNotificationsAsync();
    // LocalStore.clearAll();
  } catch (e) {
    // handle error
    console.log(e);
  }
};
async function scheduleNotificationForExitQ() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "2 Weeks Done!",
      body: "Click to complete the final questionnaire",
    },
    trigger: {
      seconds: 1209600,
    },
  });
}

const checkEntryQuestionnaire = () => {
  LocalStore.getData("entryQuestionnaireDone").then((b) => {
    if (b) return;
    else {
      RootNavigation.navigate("SurveyContent", { screen: "EntrySurvey" });
    }
  });
};

const checkExitQuestionnaire = () => {
  // LocalStore.removeData("endDate");
  LocalStore.getData("endDate").then((v) => {
    if (!v) {
      var endDate = new Date(Date.now() + 12096e5); //2 weeks
      // var endDate = new Date(Date.now() + 60000); // 1 minute
      LocalStore.storeData("endDate", JSON.stringify(endDate));
      return;
    }
    v = JSON.parse(v);

    if (Date.now() > new Date(v).getTime()) {
      LocalStore.getData("exitQuestionnaireDone").then(
        (exitQuestionnaireDone) => {
          console.log(exitQuestionnaireDone);
          if (exitQuestionnaireDone) return;
          else {
            Alert.alert(
              "Almost There!",
              "Thank you for completing two weeks of this study. This last step is a questionnaire about your experience with the application.",
              [
                {
                  text: "Ok",
                  style: "cancel",
                },
              ],
              {
                cancelable: true,
              }
            );
            RootNavigation.navigate("SurveyContent", { screen: "ExitSurvey" });
          }
        }
      );
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

const initAppUUID = async () => {
  LocalStore.getData("appID").then((id) => {
    if (id == null) {
      // first time opening app
      console.log("Creating first time id");
      newId = uuid.v1();
      global.appID = newId;
      LocalStore.storeData("appID", newId);
      scheduleNotificationForExitQ();
    } else {
      global.appID = id;
    }
  });
};

export default init;
