import {
  View,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  Pressable,
  Text,
} from "react-native";
import { useState } from "react";

import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";

import CancelButton from "../../../global/CancelButton";
import IconSelectionModal from "./Icons";
import allFactors from "../../../data/FactorsList.json";

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
      <Modal style={styles.modalContainer} visible={isVisible}>
        <View style={styles.mainContent}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>{icon === "help" ? "Add Icon" : ""}</Text>
            <Pressable onPress={toggleIcons}>
              <Ionicons name={icon} size={100} />
            </Pressable>
          </View>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.factorName}
              onChangeText={setName}
              value={name}
              placeholder="Name"
              keyboardType="default"
            />
            <TextInput
              style={styles.factorDesc}
              onChangeText={setDesc}
              value={desc}
              placeholder="Description (Optional)"
              keyboardType="default"
            />
            <DropDownPicker
              placeholder="Select a factor type"
              containerStyle={styles.factorTypeContainer}
              // zIndex={1}
              open={open}
              value={type}
              items={types}
              setOpen={setOpen}
              setValue={setType}
              setItems={setTypes}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={addNewFactor} />
          <CancelButton callback={closeModal} />
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
    paddingTop: 0,
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  factorTypeContainer: {
    // marginVertical: 50,
    width: "90%",
    alignItems: "center",
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
    alignItems: "center",
    width: "80%",
    padding: 1,
    // borderWidth: 1,
    // borderRadius: 2,
  },
});

export default NewFactorModal;
