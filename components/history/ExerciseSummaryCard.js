import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ExerciseSummaryCard = ({ workoutData }) => {
  const FactorSummary = ({ factor }) => {
    let factorVal;

    if (factor.type == "1-5") {
      factorVal = factor.value;
    } else if (factor.type == "bool") {
      if (factor.value == true) factorVal = "✓";
      else factorVal = "✗";
    }
    return (
      <>
        <View style={styles.factorSummary}>
          <Ionicons style={styles.factorIcon} name={factor.icon} size={25} />
          <Text style={styles.factorValue}>{factorVal}</Text>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.timeDataText}>
            {new Date(workoutData.timeData.startTime).toLocaleDateString()}
          </Text>
          <Text style={styles.timeDataText}>
            {new Date(workoutData.timeData.startTime).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.factorSummaryContainer}>
          {workoutData.factorData.map((factor, i) => {
            return <FactorSummary key={i} factor={factor} />;
          })}
        </View>
        {workoutData.exerciseData.map((el, edIndex) => (
          <View style={styles.singleExercise} key={edIndex}>
            <Text style={styles.exerciseName}>{el.exerciseName + " "}</Text>
            {el.sets.map((set, setIndex) => {
              return (
                <Text style={styles.exerciseData} key={setIndex}>
                  {set[0] + "kg " + set[1] + " "}
                </Text>
              );
            })}
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    padding: 10,
    flex: 1,
    margin: 10,
    borderRadius: 5,
    width: "80%",
    marginHorizontal: "10%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 10,
  },
  exerciseName: { fontSize: 20 },

  timeDataText: { textAlign: "left" },
  singleExercise: {
    marginBottom: 10,
  },
  exerciseData: {
    // textAlign:"r"
  },
  factorSummaryContainer: {
    flexDirection: "row",
  },
  factorSummary: {
    padding: 1,
    // borderWidth: 1,
    backgroundColor: "rgb(227, 227, 227)",
    borderRadius: 3,
    justifyContent: "center",
    flexDirection: "row",

    marginRight: 5,
  },
  factorIcon: { padding: 2 },
  factorValue: {
    fontWeight: 500,
    borderLeftWidth: 1,
    textAlignVertical: "center",
    textAlign: "center",
    padding: 2,
  },
});

export default ExerciseSummaryCard;
