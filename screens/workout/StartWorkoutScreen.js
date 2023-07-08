import { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MyButton from "../../components/global/MyButton.js";
import { AllWorkoutsDataContext } from "../../store/AllWorkoutsData.js";
import { WorkoutDataContext } from "../../store/WorkoutData.js";
import globalStyle from "../../components/global/globalStyle.js";

export default function WorkoutScreen({ navigation }) {
  const [workoutsLogged, setWorkoutsLogged] = useState(0);

  const workoutDataContext = useContext(WorkoutDataContext);
  const allWorkoutDataContext = useContext(AllWorkoutsDataContext);

  useEffect(() => {
    // setTimeout(() => {
    allWorkoutDataContext.getAllWorkouts().then((v) => {
      if (v) setWorkoutsLogged(v.length);
      else setWorkoutsLogged(0);
    });
    // }, 1000);
  }, [allWorkoutDataContext.allWorkouts]);

  function onStartWorkout() {
    navigation.navigate("Factors");
    date = new Date();
    workoutDataContext.setStartTime(date);
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.woCounterContainer}>
        <Text style={styles.woCounterText}>
          <Text>{"You've logged\n"}</Text>
          <Text style={styles.woCounter}> {workoutsLogged} </Text>
          <Text> {"\nworkouts"}</Text>
        </Text>
        {workoutsLogged == 0 && (
          <Text style={[globalStyle.emptyPageText, { marginTop: 20 }]}>
            Start by adding your first goal and logging your first workout
          </Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <MyButton title="Start Workout" onPress={onStartWorkout}></MyButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 0,
    flex: 1,
  },
  woCounterContainer: {
    margin: 20,
    flex: 1,
    justifyContent: "center",
  },
  woCounterText: {
    textAlign: "center",
    fontSize: 20,
  },
  woCounter: { fontSize: 60, color: "tomato" },
});
