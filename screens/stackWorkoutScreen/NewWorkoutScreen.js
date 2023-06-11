import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Button } from "@rneui/base";
import { useState, useContext } from "react";
import ExerciseTable from "../../components/ExerciseTable";
import ExerciseScreen from "../../components/ExerciseScreenModal";
import { WorkoutDataContext } from "../../store/WorkoutData.js";

export default function WorkoutScreen({ navigation }) {
  const [exerciseScreenModalIsVisible, setExerciseScreenModalIsVisible] =
    useState(false);

  const workoutDataContext = useContext(WorkoutDataContext);

  function toggleExerciseScreenModal() {
    setExerciseScreenModalIsVisible(!exerciseScreenModalIsVisible);
  }

  function addExercise(exercise) {
    toggleExerciseScreenModal();
    workoutDataContext.addExercise(exercise);
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView>
        {workoutDataContext.workoutData.map((item, idx) => (
          <ExerciseTable
            key={idx}
            tableIdx={idx}
            exerciseName={item.exerciseName}
          ></ExerciseTable>
        ))}
      </ScrollView>
      <Button title="Add Exercise" onPress={toggleExerciseScreenModal}></Button>

      <ExerciseScreen
        onSelect={addExercise}
        isVisible={exerciseScreenModalIsVisible}
        onCancel={toggleExerciseScreenModal}
      ></ExerciseScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 0,
    flex: 1,
  },
});
