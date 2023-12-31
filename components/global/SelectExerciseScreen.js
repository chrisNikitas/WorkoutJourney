import {
  View,
  Modal,
  FlatList,
  Text,
  StyleSheet,
  Button,
  SectionList,
} from "react-native";
import * as LocalStore from "../../store/LocalStore";
import { SearchBar } from "@rneui/themed";
import { useState, useEffect } from "react";
import allExerciseList from "../../exercise_list/new_exercises.json";
import ExerciseItem from "../workout/ExerciseItem";
import MyButton from "./MyButton";

const SelectExerciseScreen = ({
  navigation,
  route,
  isVisible,
  onSelect,
  onCancel,
}) => {
  const [search, setSearch] = useState("");
  const [exerciseList, setExerciseList] = useState(allExerciseList);
  const [allRecentExerciseList, setAllRecentExerciseList] = useState([]);
  const [recentExerciseList, setRecentExerciseList] = useState([]);
  useEffect(() => {
    LocalStore.getData("recentExerciseList").then((l) => {
      if (l) {
        setAllRecentExerciseList(l);
        setRecentExerciseList(l);
      } else {
        setAllRecentExerciseList([]);
        setRecentExerciseList([]);
      }
    });
  }, []);

  const addToRecent = (exercise) => {
    if (
      allRecentExerciseList.filter((re) => re.name == exercise.name).length == 0
    ) {
      let newRecentExerciseList = [exercise, ...allRecentExerciseList];
      if (newRecentExerciseList.length > 10) newRecentExerciseList.pop();

      LocalStore.storeData("recentExerciseList", newRecentExerciseList);
    }
  };

  function addExercise(exercise) {
    addToRecent(exercise);

    navigation.navigate(route.params, exercise);
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
    let exL = allExerciseList.filter((ex) =>
      ex.name.toLowerCase().includes(s.toLowerCase())
    );
    setExerciseList(exL);
    let rExL = allRecentExerciseList.filter((ex) =>
      ex.name.toLowerCase().includes(s.toLowerCase())
    );
    setRecentExerciseList(rExL);
  }

  let sectionedData = [
    {
      title: "Recent",
      data: recentExerciseList,
    },
    {
      title: "All",
      data: exerciseList,
    },
  ];

  return (
    // <Modal visible={isVisible} animationType="slide">
    <View style={styles.modal}>
      <SearchBar
        inputContainerStyle={{ backgroundColor: "lightgray" }}
        lightTheme={true}
        style={{ textAlign: "center" }}
        placeholder="Enter Exercise"
        value={search}
        onChangeText={searchExercises}
      />
      <MyButton title="Cancel" onPress={navigation.goBack}></MyButton>

      <SectionList
        sections={sectionedData}
        renderItem={renderExerciseItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      ></SectionList>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { margin: 6, fontSize: 16, fontWeight: "bold", textAlign: "center" },
  modal: { flex: 1, alignItems: "stretch" },
  header: {
    fontSize: 32,
    textAlign: "center",
  },
});

export default SelectExerciseScreen;
