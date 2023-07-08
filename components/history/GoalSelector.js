import { Pressable, Text, View, StyleSheet } from "react-native";
import globalStyle from "../global/globalStyle";
const GoalSelector = ({ goalName, goalIndex, onSelect, selected }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, , selected ? styles.selected : null]}
        onPress={() => onSelect(goalIndex)}
      >
        <Text style={styles.text}>{goalName}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    marginHorizontal: 3,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "grey",
  },
  text: {
    flexWrap: "nowrap",
    overflow: "hidden",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  selected: { backgroundColor: "black" },
});

export default GoalSelector;
