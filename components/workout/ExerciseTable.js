import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Button,
  Keyboard,
} from "react-native";
import { useState, useContext, useEffect, useRef } from "react";
import { DataTable } from "react-native-paper";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { WorkoutDataContext } from "../../store/WorkoutData.js";

export default function ExerciseTable(props) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const workoutDataContext = useContext(WorkoutDataContext);

  const viewRef = useRef();

  const removeSetButton = (exIdx, setIdx) => {
    Alert.alert("Confirm", "Delete set " + (setIdx + 1) + "?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => workoutDataContext.removeSet(exIdx, setIdx),
      },
    ]);
  };

  const removeExercise = () => {
    Alert.alert(
      "Confirm",
      "Remove " + props.exerciseName + " from your workout ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => workoutDataContext.removeExercise(props.tableIdx),
        },
      ]
    );
  };

  const addSet = () => {
    if (weight !== "" && reps !== "") {
      workoutDataContext.addSet([weight, reps], props.tableIdx);
    }
  };

  return (
    <View
      ref={viewRef}
      style={{ flex: 1, padding: 10 }}
      onLayout={({ nativeEvent }) => {}}
    >
      <Text style={{ fontSize: 12 }}>
        Long press on the exercise name to remove it from your workout
      </Text>
      <DataTable style={styles.container}>
        <View style={styles.content}>
          <Pressable
            android_ripple={{
              color: "rgba(237, 237, 237, 0.553)",
              borderless: true,
            }}
            style={{
              // backgroundColor: "rgba(237, 237, 237, 0.553)",
              borderRadius: 6,
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onLongPress={() => {
              removeExercise();
            }}
          >
            <Text style={styles.title}>
              {props.exerciseName.charAt(0).toUpperCase() +
                props.exerciseName.slice(1)}
            </Text>
          </Pressable>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text>Weight</Text>
              <TextInput
                keyboardShouldPersistTaps={"always"}
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
                keyboardShouldPersistTaps={"always"}
                style={styles.input}
                onChangeText={setReps}
                value={reps}
                placeholder="Reps"
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
            <View style={styles.plusButton}>
              {/* Text only for styling */}
              <Text />
              <FontAwesome5.Button
                name={"plus"}
                iconStyle={styles.plusIcon}
                backgroundColor="black"
                onPress={() => {
                  Keyboard.dismiss();
                  addSet();
                }}
              />
            </View>
          </View>
        </View>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={[styles.headerTitle, { flex: 5 }]}>
            Set
          </DataTable.Title>
          <DataTable.Title style={[styles.headerTitle, { flex: 3 }]}>
            Weight
          </DataTable.Title>
          <DataTable.Title style={[styles.headerTitle, { flex: 3 }]}>
            Rep
          </DataTable.Title>
          <DataTable.Title
            style={[styles.headerTitle, { flex: 1 }]}
          ></DataTable.Title>
        </DataTable.Header>
        {workoutDataContext.exerciseData[props.tableIdx]["sets"].map(
          (set, i) => (
            <DataTable.Row key={i} style={styles.row}>
              <DataTable.Cell style={[styles.cell, { flex: 5 }]}>
                {i + 1}
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { flex: 3 }]}>
                {set[0]}
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { flex: 3 }]}>
                {set[1]}
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { flex: 1 }]}>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => removeSetButton(props.tableIdx, i)}
                  hitSlop={20}
                >
                  <Ionicons size={14} name="remove-circle" color={"darkred"} />
                </Pressable>
              </DataTable.Cell>
            </DataTable.Row>
          )
        )}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    padding: 15,
    backgroundColor: "#DCDCDC",
    borderRadius: 6,
    margin: 5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    // justifyContent: "center",
  },
  // cell: { justifyContent: "center" },
  title: {
    fontSize: 20,
    flex: 1,
    textAlign: "center",
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
    backgroundColor: "#ffffff",
    height: 40,
    width: 60,

    marginTop: 3,
    borderRadius: 5,
    padding: 10,
  },
  plusButton: {
    alignItems: "center",
    // justifyContent: "center",
  },
  plusIcon: {
    // zIndex: 10000,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
