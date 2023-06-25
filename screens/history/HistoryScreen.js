import { useEffect, useContext, useState, useCallback } from "react";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  Alert,
} from "react-native";
import { WorkoutDataContext } from "../../store/WorkoutData.js";
import ExerciseSummaryCard from "../../components/history/ExerciseSummaryCard.js";
export default function HistoryScreen() {
  const [data, setData] = useState([]);
  const [rerender, setRerender] = useState(false);
  workoutDataContext = useContext(WorkoutDataContext);

  useEffect(() => {
    workoutDataContext.getAllWorkouts().then((v) => {
      setData(v);
    });
    console.log("Called");
  }, [useIsFocused(), rerender]);

  const removeAllData = () => {
    workoutDataContext.removeAllData();
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
          workoutDataContext.removeWorkout(key);
          setRerender(!rerender);
        },
      },
    ]);
  };
  // console.log("Data", data[0]["exerciseData"]);
  return (
    <>
      <View style={styles.mainContent}>
        <Button title={"Remove All Data"} onPress={removeAllData}></Button>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Pressable on onLongPress={() => removeWorkout(item.key)}>
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
