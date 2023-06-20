import { Button, View } from "react-native";

const CancelButton = ({ callback }) => {
  return (
    <View>
      <Button title="cancel" onPress={callback}></Button>
    </View>
  );
};

export default CancelButton;
