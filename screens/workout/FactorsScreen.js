import { Ionicons } from "@expo/vector-icons";
import { useState, useContext } from "react";
import { Button, FlatList, Pressable, StyleSheet, View } from "react-native";
import IconSelectionModal from "../../components/global/IconsModal";
import FactorModal from "../../components/workout/FactorModal";
import NewFactorModal from "../../components/workout/NewFactorModal";
import allFactors from "../../data/FactorsList.json";
import { WorkoutDataContext } from "../../store/WorkoutData.js";

const FactorsScreen = ({ navigation }) => {
  const [factorModalIsVisible, setFactorModalIsVisible] = useState(false);
  const [newFactorModalIsVisible, setNewFactorModalIsVisible] = useState(false);
  const [iconModalIsVisible, setIconModalIsVisible] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState({
    name: "",
    type: "",
  });
  const [factors, setFactors] = useState([]);
  const workoutDataContext = useContext(WorkoutDataContext);

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
    // newFactor
    if (selectedFactor["type"] == "1-5") {
      newFactor = {
        ...selectedFactor,
        value: factorVal,
      };
    } else if (selectedFactor["type"] == "bool") {
      newFactor = {
        ...selectedFactor,
        value: "true",
      };
    }
    setSelectedFactor(newFactor);

    // add to factors, but remove if it already exists
    newFactors = [...factors];
    newFactors = newFactors.filter((el) => {
      console.log("EL ", el);
      console.log("NF ", newFactor);
      return el["name"] != newFactor["name"];
    });
    console.log("newFactors", newFactors);
    newFactors = [
      ...newFactors,
      { name: newFactor["name"], value: newFactor["value"] },
    ];
    setFactors(newFactors);

    workoutDataContext.addFactors(newFactors);
    setFactorModalIsVisible(false);
    // console.log(factors);
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
            console.log("S ", selectedFactor);
            console.log("A ", factors);
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
