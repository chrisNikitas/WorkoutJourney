import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
import CancelButton from "./CancelButton";

const IconSelectionModal = ({
  navigation,
  isVisible,
  onSelectIcon,
  onClose,
  selectIcon,
}) => {
  const icons = [
    "sad",
    "bed",
    "cafe",
    "leaf",
    "headset",
    "nutrition",
    "people",
    "star",
    "thermometer",
    "alarm",
    "tennisball",
    "snow",
    "sunny",
    "bicycle",
  ];
  const [iconSearch, setIconSearch] = useState("");
  const [displayedIcons, setDisplayedIcons] = useState(icons);

  const [selectedIcon, setSelectedIcon] = useState("");

  const handleIconSelect = (iconName) => {
    // selectIcon(iconName);
    navigation.navigate("NewFactorModal", iconName);
    // onClose();
  };

  function searchIcon(s) {
    setIconSearch(s);
    let res = icons.filter((icon) =>
      icon.toLowerCase().includes(s.toLowerCase())
    );
    setDisplayedIcons(res);
  }

  const renderIcon = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.icon}
        key={itemData.item}
        onPress={() => handleIconSelect(itemData.item)}
      >
        <Ionicons
          name={itemData.item}
          size={60}
          // style={styles.icon}
          // color={selectedIcon === iconName ? "blue" : "black"}
        />
      </TouchableOpacity>
    );
  };

  const handleConfirm = () => {
    onSelectIcon(selectedIcon);
    onClose();
  };
  return (
    <View style={styles.appContainer}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          padding: 8,
          textAlignVertical: "center",
          textAlign: "center",
          flex: 1,
        }}
      >
        Select an icon:
      </Text>
      <View style={styles.iconsDrawer}>
        <FlatList
          numColumns={5}
          data={icons}
          renderItem={renderIcon}
        ></FlatList>
      </View>
      <View style={{ marginBottom: 30 }}>
        <CancelButton
          title="cancel"
          callback={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  iconsDrawer: {
    flex: 4,
    flexDirection: "row",
    // flexWrap: "wrap",
    height: "100%",
    // padding: 20,
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  icon: { alignItems: "center", width: "20%" },
});

export default IconSelectionModal;
