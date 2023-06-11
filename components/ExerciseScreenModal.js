import { View, Modal, FlatList, StyleSheet, Button } from "react-native";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import allExerciseList from "../exercise_list/exercises.json";
import ExerciseItem from "../components/ExerciseItem";

const ExerciseScreen = ({ isVisible, onSelect, onCancel }) => {
  const [search, setSearch] = useState("");
  const [exerciseList, setExerciseList] = useState(allExerciseList);

  function addExercise(exercise) {
    onSelect(exercise);
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
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modal}>
        <SearchBar
          inputContainerStyle={{ backgroundColor: "lightgray" }}
          lightTheme={true}
          style={{ textAlign: "center" }}
          placeholder="Enter Exercise"
          value={search}
          onChangeText={searchExercises}
        />
        <Button title="Cancel" onPress={onCancel}></Button>

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
  modal: { flex: 1, alignItems: "stretch" },
});

export default ExerciseScreen;
