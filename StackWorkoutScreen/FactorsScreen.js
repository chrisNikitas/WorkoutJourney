import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";

const FactorsScreen = ({ navigation }) => {
  function onPressNext() {
    navigation.navigate("NewWorkout");
  }

  function factorPress(params) {
    console.log("Factor", {props.name}, "Press");
  }
  
  const Factor = (props) => {
    return (
      <View style={styles.factor}>
        <Pressable style={{ flex: 1 }} onPress={factorPress}>
          <Text>{props.name}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.factors}>
        <Factor name="Coffee" type="Bool"></Factor>
        <Factor></Factor>
        <Factor></Factor>
        <Factor></Factor>
      </View>
      <View>
        <Button title="Next" onPress={onPressNext}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 0,
    flex: 1,
  },
  text: { margin: 6, fontSize: 16, fontWeight: "bold", textAlign: "center" },
  factors: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
    padding: 20,
    alignItems: "stretch",
  },
  factor: {
    alignItems: "center",
    margin: 5,
    width: "30%",
    height: "30%",
    aspectRatio: 1,
    borderRadius: 500,
    backgroundColor: "red",
  },
});

export default FactorsScreen;
