import { useEffect, useContext, useState, useCallback } from "react";
import { FlatList, View, Button, Pressable, Alert } from "react-native";
// import { WorkoutDataContext } from "../../store/WorkoutData.js";
import ExerciseSummaryCard from "../../components/history/ExerciseSummaryCard.js";
import { useIsFocused } from "@react-navigation/native";
import { AllWorkoutsDataContext } from "../../store/AllWorkoutsData.js";

export default function HistoryScreen() {
  const [data, setData] = useState([]);
  const [rerender, setRerender] = useState(false);
  // workoutDataContext = useContext(WorkoutDataContext);
  const allWorkoutsDataContext = useContext(AllWorkoutsDataContext);
  useEffect(() => {
    allWorkoutsDataContext.getAllWorkouts().then((v) => {
      setData(v);
    });
    // workoutDataContext.getAllWorkouts().then((v) => {
    //   setData(v);
    // });
    console.log("Effect History");
  }, [rerender, allWorkoutsDataContext.allWorkouts]);

  const removeAllData = () => {
    Alert.alert("Confirm", "Missclick?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        // onPress: () => console.log("OK pressed"),
        onPress: () => {
          allWorkoutsDataContext.removeAllData();
          setRerender(!rerender);
        },
      },
    ]);
  };

  const removeWorkout = (key) => {
    // console.log("Removing ", key);
    Alert.alert("Confirm", "Delete workout " + "?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        // onPress: () => console.log("OK pressed"),
        onPress: () => {
          allWorkoutsDataContext.removeWorkout(key);
          // workoutDataContext.removeWorkout(key);
          setRerender(!rerender);
        },
      },
    ]);
  };
  // removeAllData();
  // console.log("Data", data[0]["exerciseData"]);
  return (
    <>
      <View>
        <Button title={"Remove All Data"} onPress={removeAllData}></Button>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Pressable onLongPress={() => removeWorkout(item.key)}>
              <ExerciseSummaryCard workoutData={item}></ExerciseSummaryCard>
            </Pressable>
          )}
          keyExtractor={(item, index) => {
            // console.log("From key ex: ", item.key);
            // console.log("From key ex: ", data[index]);
            return item.key;
          }}
        />
      </View>
    </>
  );
}
