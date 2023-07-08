import { Button, View } from "react-native";
import MyButton from "./MyButton";

const CancelButton = ({ callback }) => {
  return (
    <View>
      <MyButton
        containerStyle={{ alignSelf: "center", width: "90%" }}
        title="Cancel"
        onPress={callback}
      ></MyButton>
    </View>
  );
};

export default CancelButton;
