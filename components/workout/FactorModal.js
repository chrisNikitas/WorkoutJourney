import { View, Text, Button, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Slider } from "@miblanchard/react-native-slider";

const FactorModal = ({
  isVisible,
  setIsVisible,
  selectedFactor,
  addFactorData,
}) => {
  let factorVal;

  switch (selectedFactor["type"]) {
    case "1-5":
      // code block
      factorVal = 3;
      break;
    case "bool":
      if (selectedFactor.prevVal == -1) factorVal = true;
      else factorVal = !selectedFactor.prevVal;
      // code block
      break;
  }

  const FactorDataEntry = () => {
    if (selectedFactor["type"] == "1-5") {
      return (
        <>
          <Slider
            value={factorVal}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={([value]) => {
              factorVal = value;
            }}
          />
          <Button
            title="Add"
            onPress={() => {
              addFactorData(factorVal);
            }}
          />
        </>
      );
    }
    if (selectedFactor["type"] == "bool") {
      return (
        <Button
          title={factorVal == true ? "Add" : "Remove"}
          onPress={() => {
            addFactorData(factorVal);
          }}
        />
      );
      return;
    }
  };

  return (
    <Modal
      style={styles.modalContainer}
      animationType="slide"
      visible={isVisible}
    >
      <View style={styles.mainContent}>
        <Ionicons name={selectedFactor["icon"]} size={100} />
        <View style={styles.textContainer}>
          <Text style={styles.factorName}>
            {selectedFactor["name"].charAt(0).toUpperCase() +
              selectedFactor["name"].slice(1)}
          </Text>
          <View style={styles.factorDesc}>
            <Text>{selectedFactor["desc"]}</Text>
          </View>
        </View>
        <View style={styles.factorDataEntryContainer}>
          <FactorDataEntry></FactorDataEntry>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={"Cancel"} onPress={() => setIsVisible(false)}></Button>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  mainContent: {
    paddingTop: 0,
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { alignItems: "center", justifyContent: "space-between" },
  factorDataEntryContainer: {
    marginVertical: 50,
    width: "90%",
    alignItems: "stretch",
  },
  buttonContainer: {
    flex: 1,
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
  },
  factorName: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 10,
  },
  factorDesc: { alignItems: "center", width: "80%" },
});

export default FactorModal;
