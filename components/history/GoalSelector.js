import { Pressable, Text, View, StyleSheet } from "react-native";
import globalStyle from "../global/globalStyle";
const GoalSelector = ({ goalName, goalIndex, onSelect, selected }) => {
  return (
    <View style={styles.container}>
      <Pressable style={globalStyle.button} onPress={() => onSelect(goalIndex)}>
        <Text style={[styles.text, selected ? styles.selected : null]}>
          {goalName}
        </Text>
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
    backgroundColor: "black",
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
  selected: { color: "tomato" },
});

export default GoalSelector;
