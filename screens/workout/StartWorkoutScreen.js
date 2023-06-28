import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { Button } from "@rneui/base";
import { WorkoutDataContext } from "../../store/WorkoutData.js";
import MyButton from "../../components/global/MyButton.js";

export default function WorkoutScreen({ navigation }) {
  const [workoutsLogged, setWorkoutsLogged] = useState(0);

  workoutDataContext = useContext(WorkoutDataContext);
  useEffect(() => {
    workoutDataContext.getAllWorkouts().then((v) => {
      setWorkoutsLogged(v.length);
    });
  }, []);

  function onStartWorkout() {
    navigation.navigate("Factors");
    date = new Date();
    // console.log("Date ", date.toLocaleString());
    workoutDataContext.setStartTime(date);
  }

  const addDummyWorkout = () => {
    workoutDataContext.addDummyWorkout();
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
      <MyButton title="Add Dummy Workout" onPress={addDummyWorkout}></MyButton>
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
