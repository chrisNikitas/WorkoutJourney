import Collapsible from "react-native-collapsible";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
const FloatingCollapsible = ({
  title,
  expandedViewContent,
  floatingButtonStyle,
}) => {
  const [visible, setVisible] = useState(false);

  const defaultFloatingButtonStyle = {
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    bottom: 3,
    backgroundColor: "rgba(255, 255, 255, 1)",
    right: 0,
    // height: 60,
    // aspectRatio: visible ? undefined : 1,
    width: visible ? "100%" : "auto",
    borderRadius: 5,
  };
  const finalFloatingButtonStyle = {
    ...defaultFloatingButtonStyle,
    ...floatingButtonStyle,
  };
  return (
    <View style={finalFloatingButtonStyle}>
      <Pressable
        android_ripple={{ color: "lightgrey" }}
        style={{
          padding: 5,
        }}
        onPress={() => setVisible(!visible)}
      >
        <View>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </Pressable>
      <Collapsible
        collapsed={!visible}
        style={{
          position: "absolute",
          padding: 8,
        }}
      >
        <Text style={styles.expandedViewText}>{expandedViewContent}</Text>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  expandedViewText: {
    fontSize: 16,
  },
  titleText: {
    padding: 6,
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default FloatingCollapsible;
