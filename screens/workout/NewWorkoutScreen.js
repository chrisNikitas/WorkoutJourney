import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Button } from "@rneui/base";
import { useState, useContext } from "react";
import ExerciseTable from "../../components/workout/ExerciseTable";
import SelectExerciseModal from "../../components/global/SelectExerciseModal";
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

  const finishWorkout = () => {
    date = new Date();
    workoutDataContext.addWorkout();
    navigation.navigate("StartWorkout");
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView>
        {workoutDataContext.exerciseData.map((item, idx) => (
          <ExerciseTable
            key={idx}
            tableIdx={idx}
            exerciseName={item.exerciseName}
          ></ExerciseTable>
        ))}
      </ScrollView>
      <Button title="Add Exercise" onPress={toggleExerciseScreenModal}></Button>
      <Button title="Finish" onPress={finishWorkout}></Button>

      <SelectExerciseModal
        onSelect={addExercise}
        isVisible={exerciseScreenModalIsVisible}
        onCancel={toggleExerciseScreenModal}
      ></SelectExerciseModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 0,
    flex: 1,
  },
});
