import firestore from "@react-native-firebase/firestore";
import { View, Text } from "react-native";
import React, { useState } from "react";
const doc = firestore().collection("Stuff").doc("Hello");

export default function App() {
  const [text, setText] = useState("..loading");

  React.useEffect(() => {
    doc
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          setText(JSON.stringify(docSnapshot.data(), null, 2));
        } else {
          setText("dont exists, reate in firestore and try again");
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  }, []);
  return (
    <View>
      <Text>All good</Text>
      <Text>{text}</Text>
    </View>
  );
}
