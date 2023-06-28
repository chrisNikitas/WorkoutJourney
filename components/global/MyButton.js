import { Pressable, Text, StyleSheet } from "react-native";

const defaultButton = {
  marginHorizontal: 3,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderRadius: 5,
  elevation: 3,
  backgroundColor: "black",
};

const MyButton = ({
  title,
  onPress,
  containerStyle,
  rippleColor = "tomato",
}) => {
  button = {
    ...defaultButton,
    ...containerStyle,
  };

  return (
    <Pressable
      android_ripple={{ color: rippleColor }}
      style={button}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    flexWrap: "nowrap",
    overflow: "hidden",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  selected: { color: "tomato" },
});

export default MyButton;
