import AsyncStorage from "@react-native-async-storage/async-storage";
import database, { firebase } from "@react-native-firebase/database";
const databaseURL =
  "https://fitness-app-cc6bd-default-rtdb.europe-west1.firebasedatabase.app";

export const storeData = async (key, value) => {
  try {
    const rootDatabasePath = "/" + global.appID + "/";
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    firebase
      .app()
      .database(databaseURL)
      .ref(rootDatabasePath + key)
      .set(jsonValue);
    console.log("Storing");
  } catch (e) {
    // saving error
    console.log("Error saving");
    console.log(e);
  }
};

export const getData = async (key) => {
  try {
    const res = await AsyncStorage.getItem(key);
    if (res != null) {
      return JSON.parse(res);
    }
  } catch (e) {
    // error reading value
    console.log("Error getting");
    console.log(e);
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.log(e);
  }
};

export const readAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    result.map((req, i) => {
      console.log("Key: ", keys[i]);
      req.forEach((r) => console.log(r));
      console.log();
    });
  } catch (error) {
    console.error(error);
  }
};

export const clearAll = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error("Error clearing app data.");
  }
};
