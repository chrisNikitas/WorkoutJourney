import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import allFactors from "../../data/FactorsList.json";

import { useState } from "react";

const FactorsScreen = ({ navigation }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState({
    name: "",
    type: "",
  });

  function onPressNext() {
    navigation.navigate("NewWorkout");
  }

  function factorPress(props) {
    console.log("Factor", props.name, "Press");
    setSelectedFactor({
      name: props.name,
      type: props.type,
    });
    setModalIsVisible(true);
    // open modal and pass type
    // display correct datatype according to type
    // header: factor name
  }

  function renderFactor(itemData) {
    return <Factor itemData={itemData}></Factor>;
  }

  const Factor = (props) => {
    return (
      <View style={styles.factor}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => factorPress(props.itemData.item)}
        >
          <Text>{props.itemData.item.name}</Text>
        </Pressable>
      </View>
    );
  };

  const FactorDataEntry = () => {
    if (selectedFactor["type"] == "bool")
      return (
        <View>
          <View>
            <Text>Im A factor entry</Text>
            <Text>Add data for {selectedFactor["name"]}</Text>
          </View>
          <Button title="Add"></Button>
        </View>
      );
  };

  const FactorModal = () => {
    return (
      <Modal animationType="slide" visible={modalIsVisible}>
        <FactorDataEntry></FactorDataEntry>
        <Button
          title={"Cancel"}
          onPress={() => setModalIsVisible(false)}
        ></Button>
      </Modal>
    );
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.factors}>
        <FlatList
          numColumns={3}
          data={allFactors}
          renderItem={renderFactor}
        ></FlatList>
      </View>
      <View>
        <Button title="Next" onPress={onPressNext}></Button>
      </View>
      <FactorModal></FactorModal>
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
    // flex: 1,
    alignItems: "center",
    margin: 5,
    width: "30%",
    height: "30%",
    aspectRatio: 1,
    borderRadius: 500,
    backgroundColor: "grey",
  },
});

export default FactorsScreen;
