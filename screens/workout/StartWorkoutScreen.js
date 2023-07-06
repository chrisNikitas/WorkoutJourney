import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { Button } from "@rneui/base";
import { WorkoutDataContext } from "../../store/WorkoutData.js";
import { AllWorkoutsDataContext } from "../../store/AllWorkoutsData.js";
import MyButton from "../../components/global/MyButton.js";

export default function WorkoutScreen({ navigation }) {
  const [workoutsLogged, setWorkoutsLogged] = useState(0);

  const workoutDataContext = useContext(WorkoutDataContext);
  const allWorkoutDataContext = useContext(AllWorkoutsDataContext);

  useEffect(() => {
    allWorkoutDataContext.getAllWorkouts().then((v) => {
      if (v) setWorkoutsLogged(v.length);
      else setWorkoutsLogged(0);
    });
  }, [allWorkoutDataContext.allWorkouts]);

  function onStartWorkout() {
    navigation.navigate("Factors");
    date = new Date();
    workoutDataContext.setStartTime(date);
  }

  const addDummyWorkout = () => {
    allWorkoutDataContext.addDummyWorkout();
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.woCounterContainer}>
        <Text style={styles.woCounterText}>
          <Text>{"You've logged\n"}</Text>
          <Text style={styles.woCounter}> {workoutsLogged} </Text>
          <Text> {"\nworkouts"}</Text>
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <MyButton title="Start Workout" onPress={onStartWorkout}></MyButton>
      </View>
      {/* <MyButton title="Add Dummy Workout" onPress={addDummyWorkout}></MyButton>
      <MyButton
        title="Remove All Data"
        onPress={allWorkoutDataContext.removeAllData}
      ></MyButton>
      <MyButton
        title={"To entry"}
        onPress={() =>
          navigation.navigate("SurveyContent", { screen: "EntrySurvey" })
        }
      />
      <MyButton
        title={"To Exit"}
        onPress={() =>
          navigation.navigate("SurveyContent", { screen: "ExitSurvey" })
        }
      /> */}
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
