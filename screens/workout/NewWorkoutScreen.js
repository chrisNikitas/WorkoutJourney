import { StyleSheet, SafeAreaView, ScrollView, FlatList } from "react-native";
import { Button } from "@rneui/base";
import { useState, useContext, useEffect, memo } from "react";
import ExerciseTable from "../../components/workout/ExerciseTable";
import SelectExerciseScreen from "../../components/global/SelectExerciseScreen";
import { WorkoutDataContext } from "../../store/WorkoutData.js";
import MyButton from "../../components/global/MyButton";
import ExerciseTableList from "../../components/workout/ExerciseTableList";

const MemoedExerciseTableList = memo(ExerciseTableList);

export default function WorkoutScreen({ route, navigation }) {
  const workoutDataContext = useContext(WorkoutDataContext);

  useEffect(() => {
    if (route.params) {
      addExercise(route.params);
    }
  }, [route.params]);

  function toggleExerciseScreenModal() {
    // setExerciseScreenModalIsVisible(!exerciseScreenModalIsVisible);
    navigation.navigate("SelectExerciseScreen", "NewWorkout");
  }

  function addExercise(exercise) {
    // toggleExerciseScreenModal();
    workoutDataContext.addExercise(exercise);
  }

  const finishWorkout = () => {
    date = new Date();
    workoutDataContext.finishWorkout();
    navigation.navigate("StartWorkout");
  };

  return (
    <SafeAreaView style={styles.appContainer}>
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
          // console.log("This");
          return (
            <ExerciseTable
              key={idx}
              tableIdx={idx}
              exerciseName={item.exerciseName}
            ></ExerciseTable>
          );
        })}
      </ScrollView>
      {/* <MemoedExerciseTableList /> */}
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
