import { useContext, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import MyButton from "../../components/global/MyButton";
import ExerciseTable from "../../components/workout/ExerciseTable";
import { WorkoutDataContext } from "../../store/WorkoutData.js";

export default function WorkoutScreen({ route, navigation }) {
  const workoutDataContext = useContext(WorkoutDataContext);
  const scrollViewRef = useRef();

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
    // scrollViewRef.current.scrollToEnd({ animated: false });

    workoutDataContext.addExercise(exercise);
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 500); // Adjust the delay as needed
  }

  const finishWorkout = () => {
    date = new Date();
    workoutDataContext.finishWorkout();
    navigation.navigate("StartWorkout");
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps={"handled"}>
        {workoutDataContext.exerciseData.map((item, idx) => {
          return (
            <ExerciseTable
              scrollViewRef={scrollViewRef}
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
