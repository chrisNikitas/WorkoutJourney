import { View, Modal, FlatList, StyleSheet, Button } from "react-native";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";

const FactorsScreen = (props) => {
  return (
    <View style={styles.modal}>
      <View style={styles.factor}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { margin: 6, fontSize: 16, fontWeight: "bold", textAlign: "center" },
  modal: { flex: 1, padding: 20, alignItems: "stretch" },
  factor: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "red",
  },
});

export default FactorsScreen;
