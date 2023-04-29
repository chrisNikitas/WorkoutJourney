import { View, Modal, FlatList, StyleSheet, Button } from "react-native";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import allExerciseList from "../exercises/exercises2.json";
import ExerciseItem from "../components/ExerciseItem";

const ExerciseScreen = (props) => {
  const [search, setSearch] = useState("");
  const [exerciseList, setExerciseList] = useState(allExerciseList);

  function addExercise(exercise) {
    props.addExercise(exercise);
  }

  function renderExerciseItem(itemData) {
    return (
      <ExerciseItem
        addExercise={addExercise}
        item={itemData.item}
      ></ExerciseItem>
    );
  }
  function searchExercises(s) {
    setSearch(s);
    exercises = ["pullups", "pushups"];
    console.log(Array.isArray(exercises));
    let res = allExerciseList.filter((ex) =>
      ex.name.toLowerCase().includes(s.toLowerCase())
    );
    setExerciseList(res);
    // console.log(res);
  }

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
        <Button title="Cancel" onPress={props.onCancel}></Button>

        <FlatList
          data={exerciseList}
          renderItem={renderExerciseItem}
        ></FlatList>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: { margin: 6, fontSize: 16, fontWeight: "bold", textAlign: "center" },
  appContainer: {
    paddingTop: 0,
    flex: 1,
  },
  modal: { flex: 1, alignItems: "stretch" },
});

export default ExerciseScreen;
