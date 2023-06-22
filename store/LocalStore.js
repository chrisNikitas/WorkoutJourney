import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    // console.log("Data Saved: ", jsonValue);
  } catch (e) {
    // saving error
    // console.log("Error saving");
  }
};

export const getData = async (key) => {
  try {
    const res = await AsyncStorage.getItem(key);
    if (res != null) {
      // console.log("Data Retrieved: ", res);
      return JSON.parse(res);
    }
  } catch (e) {
    // error reading value
    // console.log("Error getting");
    // console.log(e);
  }
};

//   removeData = async (goal) => {
//     try {
//       // await AsyncStorage.removeItem("goals");
//       // setGoals([]);
//     } catch (e) {
//       // remove error
//     }
//     let newItems = goals.filter((g) => g != goal);
//     console.log("Removing: ", goal);
//     console.log("Goals: ", goals);
//     console.log("NewItems: ", newItems);
//     console.log();
//     storeGoals(newItems);
//     getGoals();
//   };
