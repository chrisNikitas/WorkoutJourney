import {
  Text,
  Button,
  View,
  Modal,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import CancelButton from "../global/CancelButton";
import ExerciseScreen from "../components/ExerciseScreenModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [addGoalModalIsVisible, setAddGoalModalIsVisible] = useState(false);
  const [exerciseScreenModalIsVisible, setExerciseScreenModalIsVisible] =
    useState(false);
  const [goal, setGoal] = useState({
    exercise: "",
    reps: "",
    sets: "",
    weight: "",
  });
  const [goalExercise, setGoalExercise] = useState(null);
  const [goalReps, setGoalReps] = useState(null);
  const [goalSets, setGoalSets] = useState(null);
  const [goalWeight, setGoalWeight] = useState(null);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("goal", value);
      console.log("Saved");
    } catch (e) {
      // saving error
      console.log("Error saving");
    }
  };

  const getData = async () => {
    try {
      return await AsyncStorage.getItem("goal");
    } catch (e) {
      // error reading value
      console.log("Error getting");
    }
  };
  let v = getData();

  const toggleAddGoalScreenModal = () => {
    setAddGoalModalIsVisible(!addGoalModalIsVisible);
  };
  function toggleExerciseScreenModal() {
    setExerciseScreenModalIsVisible(!exerciseScreenModalIsVisible);
  }

  const onExerciseSelect = (exercise) => {
    setExerciseScreenModalIsVisible(false);
    setGoalExercise(exercise.name);
  };

  const addGoal = () => {
    setGoal({
      exercise: goalExercise,
      reps: goalReps,
      sets: goalSets,
      weight: goalWeight,
    });
    toggleAddGoalScreenModal();
    storeData("2");
  };

  console.log(v);

  return (
    <>
      <View>
        <Text>Your Goals</Text>
        <Button title="Add a goal" onPress={toggleAddGoalScreenModal} />
        <Modal animationType="slide" visible={addGoalModalIsVisible}>
          <Pressable onPress={toggleExerciseScreenModal}>
            <Text>
              {goalExercise == null ? "Select Exercise" : goalExercise}
            </Text>
          </Pressable>
          <View style={styles.input}>
            <Text style={styles.inputText}>
              Add the number of reps you want to achieve
            </Text>
            <TextInput
              style={styles.inputValue}
              // value={goalReps}
              placeholder="reps"
              keyboardType="numeric"
              onChangeText={setGoalReps}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputText}>
              Add the number of sets you want to achieve
            </Text>
            <TextInput
              style={styles.inputValue}
              placeholder="sets"
              keyboardType="numeric"
              // value={goalSets}
              onChangeText={setGoalSets}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputText}>Add your goal weight</Text>
            <TextInput
              style={styles.inputValue}
              placeholder="kg"
              keyboardType="numeric"
              onChangeText={setGoalWeight}
            />
          </View>
          <Button title={"Add"} onPress={addGoal} />
          <CancelButton callback={toggleAddGoalScreenModal} />
          <ExerciseScreen
            isVisible={exerciseScreenModalIsVisible}
            onCancel={toggleExerciseScreenModal}
            onSelect={onExerciseSelect}
          />
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  inputText: {
    flex: 5,
  },
  inputValue: {
    flex: 1,
  },
});
