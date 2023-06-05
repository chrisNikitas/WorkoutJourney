import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Button } from "@rneui/base";
import { useState } from "react";
import ExerciseTable from "../components/ExerciseTable";
import ExerciseScreen from "../components/ExerciseScreenModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkoutScreen({ navigation }) {
  const [exerciseScreenModalIsVisible, setExerciseScreenModalIsVisible] =
    useState(false);
  const [workoutData, setWorkoutData] = useState([]);
  const [setsData, setSetsData] = useState({});

  //   const storeData = async (value) => {
  //     try {
  //       await AsyncStorage.setItem("@exerciseData", value);
  //     } catch (e) {
  //       console.log("saving error");
  //     }
  //   };

  function toggleExerciseScreenModal() {
    //select exercise screen
    setExerciseScreenModalIsVisible(!exerciseScreenModalIsVisible);
  }

  function addExercise(exercise) {
    toggleExerciseScreenModal();
    setWorkoutData((currentWorkoutData) => [
      ...currentWorkoutData,
      { exerciseName: exercise.name, sets: [] },
    ]);
    console.log("Adding Exercise");
    console.log("Workout Data: ", workoutData);
  }

  function addSet(exerciseName, newSet, idx) {
    // Add to sets of exercise name
    // console.log(workoutData[idx]);
    // exerciseSets = workoutData[exerciseName];
    // exerciseSets.push(sets);
    newSets = [...workoutData[idx]["sets"], newSet];
    setWorkoutData(
      workoutData.map((v, i) => {
        if (i == idx) {
          return { ...v, sets: newSets };
        } else {
          return v;
        }
      })
    );

    // setSetsData(...workoutData, exerciseSets);
    // console.log(workoutData);
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView>
        {workoutData.map((item, idx) => (
          <ExerciseTable
            key={idx}
            tableIdx={idx}
            exerciseName={item.exerciseName}
            addSet={addSet}
          ></ExerciseTable>
        ))}
      </ScrollView>
      <Button title="Add Exercise" onPress={toggleExerciseScreenModal}></Button>

      <ExerciseScreen
        addExercise={addExercise}
        isVisible={exerciseScreenModalIsVisible}
        onCancel={toggleExerciseScreenModal}
      ></ExerciseScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // text: { margin: 6, fontSize: 16, fontWeight: "bold", textAlign: "center" },
  appContainer: {
    paddingTop: 0,
    flex: 1,
  },
  // modal: { flex: 1, alignItems: "stretch" },
});
