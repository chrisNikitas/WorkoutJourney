import { Ionicons } from "@expo/vector-icons";
import { useState, useContext, useEffect } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  Text,
  Alert,
} from "react-native";
import FloatingCollapsible from "../../components/global/FloatingCollapsible";
import IconSelectionModal from "../../components/global/IconsModal";
import FactorModal from "../../components/workout/FactorModal";
import NewFactorModal from "../../components/workout/NewFactorModal";
// import allFactors from "../../data/FactorsList.json";
import { WorkoutDataContext } from "../../store/WorkoutData.js";
import MyButton from "../../components/global/MyButton";
import * as LocalStore from "../../store/LocalStore";
import globalStyle from "../../components/global/globalStyle";

const FactorsScreen = ({ navigation, route }) => {
  const [allFactors, setAllFactors] = useState([]);
  const [selectedFactor, setSelectedFactor] = useState({
    name: "",
    type: "",
  });
  const [factorData, setFactorData] = useState([]);

  const workoutDataContext = useContext(WorkoutDataContext);

  const [newFactorModalIsVisible, setNewFactorModalIsVisible] = useState(false);
  const [iconModalIsVisible, setIconModalIsVisible] = useState(false);

  useEffect(() => {
    LocalStore.getData("factors").then((f) => {
      setAllFactors(f);
    });
  }, []);

  useEffect(() => {
    if (route.params) {
      addFactorData(route.params.factorVal);
    }
  }, [route.params]);

  const removeFactor = (factorToRemove) => {
    Alert.alert("Confirm", "Delete factor " + factorToRemove.name + "?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          const newAllFactors = allFactors.filter((f) => {
            return f.name != factorToRemove.name;
          });
          setAllFactors(newAllFactors);
          LocalStore.storeData("factors", newAllFactors);

          if (isFactorDataAlreadyAdded(factorToRemove.name)) {
            newFactors = factorData.filter((f) => {
              return f.name != factorToRemove.name;
            });
            setFactorData(newFactors);
            workoutDataContext.setWorkoutFactors(newFactors);
          }
        },
      },
    ]);
  };

  const addNewFactor = (newFactor) => {
    //save to file
    const newAllFactors = [...allFactors, newFactor];
    setAllFactors(newAllFactors);
    LocalStore.storeData("factors", newAllFactors);
  };

  const isFactorDataAlreadyAdded = (factorName) =>
    factorData.some((f) => {
      return f.name == factorName;
    });

  function onPressNext() {
    navigation.navigate("NewWorkout");
  }

  function factorPress(props) {
    prevVal = isFactorDataAlreadyAdded(props.name)
      ? factorData.filter((f) => f.name == props.name)[0].value
      : null;

    setSelectedFactor({
      name: props.name,
      type: props.type,
      desc: props.desc,
      icon: props.icon,
      prevVal: prevVal,
    });
    navigation.navigate("FactorModal", {
      name: props.name,
      type: props.type,
      desc: props.desc,
      icon: props.icon,
      prevVal: prevVal,
    });
  }

  const addFactorData = (factorVal = -1) => {
    console.log("adding factor");
    // newFactor
    if (selectedFactor["type"] == "1-5") {
      newFactor = {
        ...selectedFactor,
        value: factorVal,
      };
    } else if (selectedFactor["type"] == "bool") {
      newFactor = {
        ...selectedFactor,
        value: factorVal,
      };
    }
    setSelectedFactor(newFactor);

    // add to factors, but remove if it already exists
    newFactors = [...factorData];
    newFactors = newFactors.filter((el) => {
      return el["name"] != newFactor["name"];
    });

    newFactors = [
      ...newFactors,
      {
        name: newFactor["name"],
        value: newFactor["value"],
        type: newFactor["type"],
        icon: newFactor["icon"],
      },
    ];
    setFactorData(newFactors);

    workoutDataContext.setWorkoutFactors(newFactors);
    // setFactorModalIsVisible(false);
    //
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
          onLongPress={() => removeFactor(props.itemData.item)}
        >
          <Ionicons name={props.itemData.item.icon} size={64}></Ionicons>
        </Pressable>
        {isFactorDataAlreadyAdded(props.itemData.item.name) && (
          <Ionicons
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(225, 225, 225, 0.9)",
              borderRadius: 8,
            }}
            name={"checkmark"}
            color={"tomato"}
            size={30}
          />
        )}
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
      <FloatingCollapsible
        floatingButtonStyle={{ bottom: 90 }}
        title={"Help?"}
        expandedViewContent={
          <Text style={{ textAlign: "auto", padding: 8 }}>
            Here you can add factors that could be affecting your workout.
            {"\n\n"}
            Not sure if something is affecting your workout? Add it as a new
            factor and see if your performance is affected by it
          </Text>
        }
      />

      <Text style={globalStyle.explanatoryText}>
        Long press on a factor to remove it
      </Text>
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
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <View>
            <MyButton
              title="Next"
              onPress={onPressNext}
              containerStyle={
                {
                  // width: ",
                  // alignSelf: "flex-end",
                }
              }
            />
          </View>
        </View>
      </View>
      {/* <FactorModal
        isVisible={factorModalIsVisible}
        setIsVisible={setFactorModalIsVisible}
        selectedFactor={selectedFactor}
        addFactorData={addFactorData}
      /> */}
      <NewFactorModal
        isVisible={newFactorModalIsVisible}
        setIsVisible={setNewFactorModalIsVisible}
        addNewFactorProp={addNewFactor}
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
