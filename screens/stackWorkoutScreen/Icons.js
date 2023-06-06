import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const IconSelectionModal = ({ isVisible, onSelectIcon, onClose }) => {
  const [selectedIcon, setSelectedIcon] = useState("");

  const icons = ["rocket", "heart", "star", "user", "bell"];

  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName);
  };

  const handleConfirm = () => {
    onSelectIcon(selectedIcon);
    onClose();
  };

  return (
    <Modal visible={isVisible}>
      <View>
        <Text>Select an icon:</Text>
        {icons.map((iconName) => (
          <TouchableOpacity
            key={iconName}
            onPress={() => handleIconSelect(iconName)}
          >
            <FontAwesome5
              name={iconName}
              size={30}
              color={selectedIcon === iconName ? "blue" : "black"}
            />
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleConfirm}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default IconSelectionModal;
