import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { Button } from "@rneui/base";
import { WorkoutDataContext } from "../../store/WorkoutData.js";

export default function WorkoutScreen({ navigation }) {
  const [workoutsLogged, setWorkoutsLogged] = useState(0);

  workoutDataContext = useContext(WorkoutDataContext);
  useEffect(() => {
    workoutDataContext.getAllWorkouts().then((v) => {
      setWorkoutsLogged(v.length);
    });
  }, [useIsFocused()]);

  function onStartWorkout() {
    navigation.navigate("Factors");
    date = new Date();
    // console.log("Date ", date.toLocaleString());
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
      </View>
      <Button title="Start Workout" onPress={onStartWorkout}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 0,
    flex: 1,
  },
  woCounterContainer: { margin: 20 },
  woCounterText: {
    textAlign: "center",
    fontSize: 20,
  },
  woCounter: { fontSize: 60 },
});
