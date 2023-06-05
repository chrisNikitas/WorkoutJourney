import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState } from "react";
import { DataTable } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ExerciseTable(props) {
  const [Weight, onChangeWeight] = useState("");
  const [Reps, onChangeReps] = useState("");
  const [ExerciseSets, onChangeExerciseSets] = useState([]);

  function addSet() {
    if (Weight != "" && Reps != "") {
      onChangeExerciseSets([...ExerciseSets, [Weight, Reps]]);
    }
    console.log("Adding Set: ", ExerciseSets);
    props.addSet(props.exercise_name, [Weight, Reps], props.tableIdx);
  }

  return (
    <DataTable style={{ padding: 15, backgroundColor: "#DCDCDC" }}>
      <View style={styles.content}>
        <Text style={{ fontSize: 20, flex: 1 }}>{props.exerciseName}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ alignItems: "flex-start", margin: 12 }}>
            <Text>Weight</Text>
            <TextInput
              style={styles.input}
              placeholder="Kg"
              onChangeText={onChangeWeight}
              value={Weight}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          <View style={{ alignItems: "flex-start", margin: 12 }}>
            <Text>Reps</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeReps}
              value={Reps}
              placeholder="Reps"
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text></Text>
            <FontAwesome5.Button
              name={"plus"}
              iconStyle={{ marginRight: 0 }}
              onPress={addSet}
            ></FontAwesome5.Button>
          </View>
        </View>
      </View>
      <DataTable.Header
        style={{ backgroundColor: "#DCDCDC", borderBottomColor: "darkgray" }}
      >
        <DataTable.Title style={{ flex: 2 }}>Set</DataTable.Title>
        <DataTable.Title style={{ flex: 1 }}>Weight</DataTable.Title>
        <DataTable.Title style={{ flex: 1 }}>Rep</DataTable.Title>
      </DataTable.Header>
      {ExerciseSets.map((set, i) => (
        <DataTable.Row key={i} style={{ borderBottomColor: "grey" }}>
          <DataTable.Cell style={{ flex: 2 }}>{i}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>{set[0]}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>{set[1]}</DataTable.Cell>
        </DataTable.Row>
        // <Text key={i}>{ + " " + set[1]}</Text>
      ))}
    </DataTable>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 60,
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
