import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Button } from "@rneui/base";

import { useState } from "react";
import ExerciseTable from "../components/ExerciseTable";
import ExerciseScreen from "../components/ExerciseScreenModal";

export default function WorkoutScreen() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [workoutData, setWorkoutData] = useState([]);
  const [test, setTest] = useState(false);

  function toggleModal() {
    //select exercise screen
    setModalIsVisible(!modalIsVisible);
  }

  function addExercise(exercise) {
    toggleModal();
    setWorkoutData((currentWorkoutData) => [...currentWorkoutData, exercise]);
  }

  function testS() {
    setTest(!test);
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView>
        {workoutData.map((item, idx) => (
          <ExerciseTable key={idx} exercise_name={item.name}></ExerciseTable>
        ))}
      </ScrollView>
      <Button title="Add Exercise" onPress={toggleModal}></Button>
      {/* <Button title="test re-render" onPress={testS}></Button> */}
      <ExerciseScreen
        addExercise={addExercise}
        onCancel={toggleModal}
        isVisible={modalIsVisible}
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
