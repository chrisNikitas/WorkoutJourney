import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";

export default function App() {
  const [Weight, onChangeWeight] = useState("Useless Text");
  const [Reps, onChangeReps] = useState("");
  const [ExerciseSets, onChangeExerciseSets] = useState([]);

  function addSet() {
    console.log("Adding Set");
    onChangeExerciseSets((currentExerciseSets) => [
      ...currentExerciseSets,
      [Weight, Reps],
    ]);
    console.log(ExerciseSets);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeWeight}
        placeholder="Weight"
        value={Weight}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeReps}
        value={Reps}
        placeholder="Repetitions"
        keyboardType="numeric"
      />
      <Button title="Add" onPress={addSet} />
      <View>
        {ExerciseSets.map((set) => (
          <Text>{set}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
