import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState, useContext } from "react";
import { DataTable } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { WorkoutDataContext } from "../store/WorkoutData.js";

export default function ExerciseTable(props) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const workoutDataContext = useContext(WorkoutDataContext);

  const addSet = () => {
    if (weight !== "" && reps !== "") {
      workoutDataContext.addSet(
        props.exerciseName,
        [weight, reps],
        props.tableIdx
      );
    }
  };

  return (
    <DataTable style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{props.exerciseName}</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text>Weight</Text>
            <TextInput
              style={styles.input}
              placeholder="Kg"
              onChangeText={setWeight}
              value={weight}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text>Reps</Text>
            <TextInput
              style={styles.input}
              onChangeText={setReps}
              value={reps}
              placeholder="Reps"
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          <View style={styles.plusButton}>
            <FontAwesome5.Button
              name={"plus"}
              iconStyle={styles.plusIcon}
              onPress={addSet}
            />
          </View>
        </View>
      </View>
      <DataTable.Header style={styles.header}>
        <DataTable.Title style={styles.headerTitle}>Set</DataTable.Title>
        <DataTable.Title style={styles.headerTitle}>Weight</DataTable.Title>
        <DataTable.Title style={styles.headerTitle}>Rep</DataTable.Title>
      </DataTable.Header>
      {workoutDataContext.workoutData[props.tableIdx]["sets"].map((set, i) => (
        <DataTable.Row key={i} style={styles.row}>
          <DataTable.Cell style={styles.cell}>{i}</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>{set[0]}</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>{set[1]}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#DCDCDC",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrapper: {
    alignItems: "flex-start",
    margin: 12,
  },
  input: {
    height: 40,
    width: 60,
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  plusButton: {
    alignItems: "center",
  },
});
