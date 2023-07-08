import { View, Text, Button, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyButton from "../global/MyButton";

import { Slider } from "@miblanchard/react-native-slider";
import { useState, useEffect } from "react";

const FactorDataEntry = ({
  factorVal,
  setFactorVal,
  addFactorData,
  selectedFactor,
}) => {
  if (selectedFactor["type"] == "1-5") {
    return (
      <>
        <Text style={styles.sliderVal}>{factorVal}</Text>
        <Slider
          value={factorVal}
          minimumValue={1}
          maximumValue={5}
          step={1}
          onValueChange={([value]) => {
            setFactorVal(value);
          }}
        />
        <MyButton
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
      <MyButton
        title={factorVal == true ? "Add" : "Remove"}
        onPress={() => {
          addFactorData(factorVal);
        }}
      />
    );
    return;
  }
};

const FactorModal = ({
  navigation,
  route,
  isVisible,
  setIsVisible,
  // selectedFactor,
}) => {
  const [factorVal, setFactorVal] = useState();
  const [selectedFactor, setSelectedFactor] = useState(route.params);
  useEffect(() => {
    switch (selectedFactor["type"]) {
      case "1-5":
        // code block
        setFactorVal(3);
        // factorVal = 3;
        break;
      case "bool":
        if (selectedFactor.prevVal == -1) setFactorVal(true);
        else setFactorVal(!selectedFactor.prevVal);
        // code block
        break;
    }
  }, []);

  const addFactorData = (fv) => {
    navigation.navigate("Factors", {
      selectedFactor: selectedFactor,
      factorVal: fv,
    });
  };

  return (
    <>
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
          <FactorDataEntry
            factorVal={factorVal}
            setFactorVal={setFactorVal}
            addFactorData={addFactorData}
            selectedFactor={selectedFactor}
          ></FactorDataEntry>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <MyButton
          title={"Cancel"}
          onPress={() => navigation.goBack()}
        ></MyButton>
      </View>
    </>
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
  sliderVal: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default FactorModal;
