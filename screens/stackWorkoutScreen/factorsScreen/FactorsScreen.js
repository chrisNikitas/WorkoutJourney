import { View, StyleSheet, Button, Pressable, FlatList } from "react-native";
import allFactors from "../../../data/FactorsList.json";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import IconSelectionModal from "./Icons";
import FactorModal from "./FactorModal";
import NewFactorModal from "./NewFactorModal";

const FactorsScreen = ({ navigation }) => {
  const [factorModalIsVisible, setFactorModalIsVisible] = useState(false);
  const [newFactorModalIsVisible, setNewFactorModalIsVisible] = useState(false);
  const [iconModalIsVisible, setIconModalIsVisible] = useState(false);
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
      desc: props.desc,
      icon: props.icon,
    });
    setFactorModalIsVisible(true);
  }

  const addFactorData = (factorVal = -1) => {
    if (selectedFactor["type"] == "1-5") {
      setSelectedFactor({
        ...selectedFactor,
        value: factorVal,
      });
    } else if (selectedFactor["type"] == "bool") {
      setSelectedFactor({
        ...selectedFactor,
        value: "true",
      });
    }
    setFactorModalIsVisible(false);
    console.log(selectedFactor);
  };

  function renderFactor(itemData) {
    return <Factor itemData={itemData}></Factor>;
  }

  const Factor = (props) => {
    return (
      <View style={styles.factor}>
        <Pressable
          style={{ flex: 1, justifyContent: "center" }}
          onPress={() => factorPress(props.itemData.item)}
        >
          <Ionicons name={props.itemData.item.icon} size={64}></Ionicons>
        </Pressable>
        {/* <Text>{props.itemData.item.name}</Text> */}
      </View>
    );
  };

  const toggleNewFactorModal = () => {
    setNewFactorModalIsVisible(!newFactorModalIsVisible);
  };

  const toggleIcons = () => {
    setIconModalIsVisible(!iconModalIsVisible);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.factors}>
        <FlatList
          numColumns={3}
          data={allFactors}
          renderItem={renderFactor}
        ></FlatList>
        <View style={styles.plusFactor}>
          <Pressable
            style={{ flex: 1, justifyContent: "center" }}
            onPress={toggleNewFactorModal}
          >
            <Ionicons color={"white"} name={"add"} size={64}></Ionicons>
          </Pressable>
          {/* <Text>{props.itemData.item.name}</Text> */}
        </View>
      </View>
      <View>
        {/* Log Button */}
        <Button
          title="Log"
          onPress={() => {
            console.log(selectedFactor);
          }}
        ></Button>
        <Button title="Next" onPress={onPressNext}></Button>
        <Button title="Icons" onPress={toggleIcons}></Button>
      </View>
      <FactorModal
        isVisible={factorModalIsVisible}
        setIsVisible={setFactorModalIsVisible}
        selectedFactor={selectedFactor}
        addFactorData={addFactorData}
      />
      <NewFactorModal
        isVisible={newFactorModalIsVisible}
        setIsVisible={setNewFactorModalIsVisible}
      />
      <IconSelectionModal
        onClose={toggleIcons}
        isVisible={iconModalIsVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },

  factors: {
    flex: 1,
    flexDirection: "column",
    // flexWrap: "wrap",
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
    backgroundColor: "grey",
  },
  plusFactor: {
    alignItems: "center",
    margin: 5,
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderRadius: 500,
    backgroundColor: "grey",
  },
  factorName: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 10,
  },
  factorDesc: { alignItems: "center", width: "80%" },
});

export default FactorsScreen;
