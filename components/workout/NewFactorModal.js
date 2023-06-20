import {
  View,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  Pressable,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";

import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";

import CancelButton from "../global/CancelButton";
import IconSelectionModal from "../global/IconsModal";
import allFactors from "../../data/FactorsList.json";

const NewFactorModal = ({ isVisible, setIsVisible }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState(null);
  const [icon, setIcon] = useState("help");
  const [iconModalIsVisible, setIconModalIsVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [types, setTypes] = useState([
    { label: "True/False", value: "bool" },
    { label: "Slider", value: "1-5" },
  ]);

  const closeModal = () => {
    setIsVisible(false);
  };

  const toggleIcons = () => {
    setIconModalIsVisible(!iconModalIsVisible);
  };

  const selectIcon = (iconName) => {
    console.log(iconName);
    setIcon(iconName);
  };

  const addNewFactor = () => {
    //save to file
    allFactors.push({
      name: name,
      type: type,
      desc: desc,
      icon: icon,
    });
    closeModal();
  };
  //   txt = icon === "help" ? "Add Icon" : "";
  return (
    <>
      <Modal
        style={styles.modalContainer}
        animationType="slide"
        visible={isVisible}
      >
        <View style={styles.mainContent}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>{icon === "help" ? "Add Icon" : ""}</Text>
            <Pressable
              onPress={toggleIcons}
              style={{
                backgroundColor: icon == "help" ? "lightgrey" : "white",
                borderRadius: 5,
              }}
            >
              <Ionicons name={icon} size={100} />
            </Pressable>
          </View>
          <View style={styles.textContainer}>
            <TextInput
              style={[
                styles.factorName,
                name == "" ? styles.input_empty : styles.input_filled,
              ]}
              onChangeText={setName}
              value={name}
              placeholder="Name"
              keyboardType="default"
            />
            <TextInput
              style={[
                styles.factorDesc,
                desc == "" ? styles.input_empty : styles.input_filled,
              ]}
              multiline={true}
              onChangeText={setDesc}
              value={desc}
              placeholder="Description (Optional)"
              keyboardType="default"
            />
            <DropDownPicker
              placeholder="Select a factor type"
              showArrowIcon={false}
              containerStyle={styles.factorTypeContainer}
              dropDownContainerStyle={
                type == null ? styles.input_empty : styles.input_filled
              }
              // zIndex={1}
              style={type == null ? styles.input_empty : styles.input_filled}
              textStyle={{ textAlign: "center" }}
              open={open}
              value={type}
              items={types}
              setOpen={setOpen}
              setValue={setType}
              setItems={setTypes}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              disabled={
                name != null && type != null && desc != null && icon != "help"
                  ? false
                  : true
              }
              title="Add"
              onPress={addNewFactor}
            />
            <CancelButton callback={closeModal} />
          </View>
        </View>
      </Modal>
      <IconSelectionModal
        onClose={toggleIcons}
        isVisible={iconModalIsVisible}
        selectIcon={selectIcon}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  mainContent: {
    // backgroundColor: "lightgrey",
    paddingTop: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "90%",
    flex: 1,
    // flexDirection: "column",
    // alignItems: "",
    // justifyContent: "space-between",
  },
  buttonContainer: {
    zIndex: -1,
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
  factorDesc: {
    marginBottom: 10,
    height: 100,
  },
  factorTypeContainer: {
    // alignItems: "center",
  },
  input_empty: {
    backgroundColor: "lightgrey",
    textAlign: "center",
    padding: 8,
    borderRadius: 5,
    borderWidth: 0,
  },
  input_filled: {
    backgroundColor: "white",
    textAlign: "center",
    padding: 8,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 0.4,
  },
});

export default NewFactorModal;
