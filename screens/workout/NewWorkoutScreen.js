import { StyleSheet, SafeAreaView, ScrollView, FlatList } from "react-native";
import { Button } from "@rneui/base";
import { useState, useContext, useRef } from "react";
import ExerciseTable from "../../components/workout/ExerciseTable";
import SelectExerciseModal from "../../components/global/SelectExerciseModal";
import { WorkoutDataContext } from "../../store/WorkoutData.js";
import MyButton from "../../components/global/MyButton";

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
      <SelectExerciseModal
        onSelect={addExercise}
        isVisible={exerciseScreenModalIsVisible}
        onCancel={toggleExerciseScreenModal}
      ></SelectExerciseModal>
      {/* <FlatList
        data={workoutDataContext.exerciseData}
        renderItem={(itemData) => {
          console.log(itemData);
          console.log("fl ", itemData.index);
          return (
            <ExerciseTable
              key={itemData.index}
              tableIdx={itemData.index}
              exerciseName={itemData.item.exerciseName}
              e
            />
          );
        }}
      /> */}
      <ScrollView>
        {workoutDataContext.exerciseData.map((item, idx) => {
          console.log("This");
          return (
            <ExerciseTable
              key={idx}
              tableIdx={idx}
              exerciseName={item.exerciseName}
            ></ExerciseTable>
          );
        })}
      </ScrollView>
      <MyButton
        title="Add Exercise"
        onPress={toggleExerciseScreenModal}
        containerStyle={{
          marginVertical: 10,
          width: "90%",
          alignSelf: "center",
        }}
      />
      <MyButton
        title="Finish"
        onPress={finishWorkout}
        containerStyle={{
          marginBottom: 10,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 0,
    flex: 1,
  },
});
