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
import { FontAwesome } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";

const IconSelectionModal = ({ isVisible, onSelectIcon, onClose }) => {
  const [iconSearch, setIconSearch] = useState("");
  const [displayedIcons, setDisplayedIcons] = useState(
    Object.keys(FontAwesome["glyphMap"])
  );

  const [selectedIcon, setSelectedIcon] = useState("");

  // const icons = Object.keys(FontAwesome["glyphMap"]);

  const handleIconSelect = (iconName) => {
    console.log(iconName);
    // setSelectedIcon(iconName);
  };
  console.log(Object.keys(FontAwesome));

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
        <FontAwesome
          name={itemData.item}
          size={30}
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
    <Modal visible={isVisible}>
      <SearchBar
        inputContainerStyle={{ backgroundColor: "lightgray" }}
        lightTheme={true}
        style={{ textAlign: "center" }}
        placeholder="Search for icons"
        value={iconSearch}
        onChangeText={searchIcon}
      />
      <View style={styles.appContainer}>
        <Button title="cancel" onPress={onClose}></Button>
        <Text>Select an icon:</Text>
        <View style={styles.iconsDrawer}>
          <FlatList
            numColumns={10}
            data={displayedIcons}
            renderItem={renderIcon}
          ></FlatList>
        </View>
        <TouchableOpacity onPress={handleConfirm}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  iconsDrawer: {
    flex: 1,
    flexDirection: "row",
    // flexWrap: "wrap",
    height: "100%",
    // padding: 20,
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  icon: { alignItems: "center", width: "10%" },
});

export default IconSelectionModal;
