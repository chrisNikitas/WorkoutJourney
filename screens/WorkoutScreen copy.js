import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { Button } from "@rneui/base";

import { useState } from "react";
import { DataTable } from "react-native-paper";
import ExerciseTable from "../components/ExerciseTable";
import ExerciseItem from "../components/ExerciseItem";
import { SearchBar } from "@rneui/themed";
import exerciseList from "../exercises/exercises2.json";

export default function WorkoutScreen() {
  const [modalIsVisible, setModalIsVisible] = useState();
  const [workoutData, setWorkoutData] = useState("");
  const [search, setSearch] = useState("e");

  function toggleModal() {
    //select exercise screen
    setModalIsVisible(!modalIsVisible);
  }

  function addExercise(exercise) {
    toggleModal();
    setWorkoutData((currentWorkoutData) => [...currentWorkoutData, exercise]);
  }

  function renderExerciseItem(itemData) {
    return (
      <ExerciseItem
        addExercise={addExercise}
        item={itemData.item}
      ></ExerciseItem>
    );
  }

  const ExerciseTables = () => {
    return (
      <FlatList
        data={workoutData}
        renderItem={(itemData) => (
          <ExerciseTable exercise_name={itemData.item.name}></ExerciseTable>
        )}
      ></FlatList>
    );
  };

  function searchExercises(s) {
    setSearch(s);
    console.log(s);
    // let res = exerciseList.filter((ex) =>
    // ex.toLowerCase().includes(s.toLowerCase())
    // );
  }

  const ExerciseScreen = (props) => {
    return (
      <Modal visible={props.isVisible} animationType="slide">
        <View style={styles.modal}>
          <SearchBar
            inputContainerStyle={{ backgroundColor: "lightgray" }}
            lightTheme={true}
            style={{ textAlign: "center" }}
            placeholder="Enter Exercise"
            value={search}
            onChangeText={searchExercises}
          ></SearchBar>
          <Button title="Cancel" onPress={toggleModal}></Button>

          <FlatList
            data={exerciseList}
            renderItem={renderExerciseItem}
          ></FlatList>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <ExerciseTables></ExerciseTables>
      {/* <ExerciseTable exercise_name="Pullups"></ExerciseTable>
      <ExerciseTable exercise_name="Pushups"></ExerciseTable> */}
      <Button title="Add Exercise" onPress={toggleModal}></Button>
      <ExerciseScreen isVisible={modalIsVisible}></ExerciseScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: { margin: 6, fontSize: 16, fontWeight: "bold", textAlign: "center" },
  appContainer: {
    paddingTop: 0,
    flex: 1,
  },
  modal: { flex: 1, alignItems: "stretch" },
});
