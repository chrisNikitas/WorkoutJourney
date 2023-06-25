import { View, Text, StyleSheet } from "react-native";

const ExerciseSummaryCard = ({ workoutData }) => {
  return (
    <View style={styles.exerciseHistoryContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.timeDataText}>
          {new Date(workoutData.timeData.startTime).toLocaleDateString()}
        </Text>
        <Text style={styles.timeDataText}>
          {new Date(workoutData.timeData.startTime).toLocaleTimeString()}
        </Text>
      </View>
      {workoutData.exerciseData.map((el, edIndex) => (
        <View key={edIndex}>
          <Text style={styles.exerciseName}>{el.exerciseName + " "}</Text>
          {el.sets.map((set, setIndex) => {
            return <Text key={setIndex}>{set[0] + "kg " + set[1] + " "}</Text>;
          })}
          {/* <Text>{el.sets.map((set) => set[0] + "kg " + set[1] + " ")}</Text> */}
        </View>
      ))}
      {/* <Text style={{ flexDirection: "row" }}>
        {itemData.item.exerciseData.map((el) => el.exerciseName + " ")}
      </Text> */}
    </View>
  );
};

styles = StyleSheet.create({
  exerciseName: { fontSize: 20 },
  exerciseHistoryContainer: {
    backgroundColor: "lightgrey",
    padding: 8,
    flex: 1,
    margin: 2,
    borderRadius: 5,
    width: "80%",
    marginHorizontal: "10%",
    // flexDirection: "row",
  },
  mainContent: {
    flex: 1,
    // alignItems: "center",
  },
  timeDataText: { textAlign: "left" },
});

export default ExerciseSummaryCard;
