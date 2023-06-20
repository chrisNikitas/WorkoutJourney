import { StyleSheet, Text, View, Pressable } from "react-native";
export default function ExerciseItem(props) {
  function addExercise() {
    props.addExercise(props.item);
  }

  return (
    <Pressable onPress={addExercise}>
      <View style={styles.container}>
        <View style={styles.entry}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 300,
              textTransform: "capitalize",
            }}
          >
            {props.item.name}
          </Text>
          <Text>{props.item.primaryMuscles.map((muscle) => muscle + " ")}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  entry: {
    flex: 1,
    paddingVertical: 40,
    paddingLeft: 20,
    marginHorizontal: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});
