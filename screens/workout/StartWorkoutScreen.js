import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Button } from "@rneui/base";

export default function WorkoutScreen({ navigation }) {
  function onStartWorkout() {
    navigation.navigate("Factors");
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <Button title="Start Workout" onPress={onStartWorkout}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 0,
    flex: 1,
  },
});
