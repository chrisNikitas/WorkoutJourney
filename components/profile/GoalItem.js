import {
  Animated,
  Text,
  StyleSheet,
  View,
  Pressable,
  Alert,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";

const GoalItem = ({ goal, removeGoal }) => {
  const onDelete = () => {
    Alert.alert(
      "Confirm",
      "Delete Goal?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => removeGoal(goal),
          style: "destructive",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <>
      <Pressable onLongPress={onDelete}>
        <View style={styles.container}>
          <View style={styles.name_cont}>
            {/* <Text></Text> */}
            <Text style={styles.name_text}>{goal.exercise.name}</Text>
          </View>
          <View
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={styles.sets_reps_cont}
          >
            <Text style={styles.sets_reps_titles}>Seps</Text>
            <Text style={styles.sets_reps_values}>{goal.sets}</Text>
          </View>
          <View style={styles.sets_reps_cont}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={styles.sets_reps_titles}
            >
              Reps
            </Text>
            <Text style={styles.sets_reps_values}>{goal.reps}</Text>
          </View>

          <View style={styles.sets_reps_cont}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={styles.sets_reps_titles}
            >
              Weight
            </Text>
            <Text style={styles.sets_reps_values}>{goal.weight}kg</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "lightgrey",
    margin: 20,
    padding: 10,
    paddingVertical: 20,
    flexDirection: "row",
    // height: 50,
    alignItems: "center",
  },
  name_cont: { flex: 5 },
  name_text: { fontSize: 25, fontWeight: 500 },
  sets_reps_cont: { flex: 3 },
  sets_reps_titles: { fontSize: 20, fontWeight: 500 },
  sets_reps_cont: { flex: 3 },
  sets_reps_values: { fontSize: 20 },
});

export default GoalItem;
