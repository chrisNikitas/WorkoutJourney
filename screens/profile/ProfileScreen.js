import {
  Text,
  Button,
  View,
  Modal,
  Pressable,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import CancelButton from "../../components/global/CancelButton";
import SelectExerciseModal from "../../components/global/SelectExerciseModal";
import * as LocalStore from "../../store/LocalStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoalItem from "../../components/profile/GoalItem";

export default function ProfileScreen() {
  const [addGoalModalIsVisible, setAddGoalModalIsVisible] = useState(false);
  const [exerciseScreenModalIsVisible, setExerciseScreenModalIsVisible] =
    useState(false);
  const [goals, setGoals] = useState([]);
  const [goalExercise, setGoalExercise] = useState(null);
  const [goalReps, setGoalReps] = useState("");
  const [goalSets, setGoalSets] = useState("");
  const [goalWeight, setGoalWeight] = useState("");

  const getGoals = async () => {
    LocalStore.getData("goals").then((val) => setGoals(val));
  };

  removeGoal = async (goal) => {
    let newGoals = goals.filter((g) => g != goal);
    LocalStore.storeData("goals", newGoals);
    getGoals();
  };

  const toggleAddGoalScreenModal = () => {
    setAddGoalModalIsVisible(!addGoalModalIsVisible);
  };
  function toggleExerciseScreenModal() {
    setExerciseScreenModalIsVisible(!exerciseScreenModalIsVisible);
  }

  const onExerciseSelect = (exercise) => {
    setExerciseScreenModalIsVisible(false);
    setGoalExercise(exercise);
  };

  const addGoal = () => {
    let newGoals = [
      ...goals,
      {
        exercise: goalExercise,
        reps: goalReps,
        sets: goalSets,
        weight: goalWeight,
      },
    ];
    setGoals(newGoals);
    console.log("State Goals: ", newGoals);
    toggleAddGoalScreenModal();

    LocalStore.storeData("goals", newGoals);
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <>
      <FlatList
        data={goals}
        renderItem={(itemData) => (
          <GoalItem removeGoal={removeGoal} goal={itemData.item} />
        )}
      />
      <Button title="Add a goal" onPress={toggleAddGoalScreenModal} />

      <Modal
        style={styles.modalContainer}
        animationType="slide"
        visible={addGoalModalIsVisible}
      >
        <View style={styles.mainContent}>
          <View style={styles.textContainer}>
            <Pressable
              style={[
                styles.selectExercise,
                goalExercise == null ? styles.input_empty : styles.input_filled,
              ]}
              onPress={toggleExerciseScreenModal}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 500,
                  color: goalExercise == null ? "#4e4e4e" : "black",
                  textTransform: "capitalize",
                }}
              >
                {goalExercise == null ? "Select Exercise" : goalExercise.name}
              </Text>
            </Pressable>
            <View style={styles.input}>
              <Text style={styles.inputText}>
                Add the number of reps you want to achieve
              </Text>
              <TextInput
                style={[
                  styles.inputValue,
                  goalReps == "" ? styles.input_empty : styles.input_filled,
                ]}
                value={goalReps}
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
                style={[
                  styles.inputValue,
                  goalSets == "" ? styles.input_empty : styles.input_filled,
                ]}
                placeholder="sets"
                keyboardType="numeric"
                value={goalSets}
                onChangeText={setGoalSets}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputText}>Add your goal weight</Text>
              <TextInput
                value={goalWeight}
                style={[
                  styles.inputValue,
                  goalWeight == "" ? styles.input_empty : styles.input_filled,
                ]}
                placeholder="kg"
                keyboardType="numeric"
                onChangeText={setGoalWeight}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              disabled={
                goalReps != "" &&
                goalSets != "" &&
                goalWeight != "" &&
                goalExercise != null
                  ? false
                  : true
              }
              title={"Add"}
              onPress={addGoal}
            />
            <CancelButton callback={toggleAddGoalScreenModal} />
          </View>
        </View>
        <SelectExerciseModal
          isVisible={exerciseScreenModalIsVisible}
          onCancel={toggleExerciseScreenModal}
          onSelect={onExerciseSelect}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  inputText: {
    padding: 8,
    flex: 5,
  },
  inputValue: {
    flex: 1,
    padding: 8,
  },
  input_empty: {
    backgroundColor: "lightgrey",
    borderRadius: 5,
    borderWidth: 0,
  },
  input_filled: {
    backgroundColor: "white",
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 0.5,
  },
  mainContent: {
    // backgroundColor: "lightgrey",
    paddingTop: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectExercise: {
    padding: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    zIndex: -1,
    flex: 1,
    width: "80%",
    marginLeft: " 10%",
    marginRight: "10%",
  },
  textContainer: {
    width: "90%",
    justifyContent: "center",
    flex: 1,
  },
});
