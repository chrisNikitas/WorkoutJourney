import { useEffect, useContext, useState, useCallback } from "react";
import { FlatList, View, Button, Pressable, Alert, Text } from "react-native";
// import { WorkoutDataContext } from "../../store/WorkoutData.js";
import ExerciseSummaryCard from "../../components/history/ExerciseSummaryCard.js";
import globalStyle from "../../components/global/globalStyle.js";
import { AllWorkoutsDataContext } from "../../store/AllWorkoutsData.js";

export default function HistoryScreen() {
  const [data, setData] = useState([]);
  const [rerender, setRerender] = useState(false);
  // workoutDataContext = useContext(WorkoutDataContext);
  const allWorkoutsDataContext = useContext(AllWorkoutsDataContext);
  useEffect(() => {
    allWorkoutsDataContext.getAllWorkouts().then((v) => {
      setData(v);
    });
  }, [rerender, allWorkoutsDataContext.allWorkouts]);

  const removeAllData = () => {
    Alert.alert("Confirm", "Missclick?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          allWorkoutsDataContext.removeAllData();
          setRerender(!rerender);
        },
      },
    ]);
  };

  const removeWorkout = (key) => {
    Alert.alert("Confirm", "Delete workout " + "?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          allWorkoutsDataContext.removeWorkout(key);
          setRerender(!rerender);
        },
      },
    ]);
  };

  const MainContent = () => {
    if (data.length == 0) {
      return (
        <>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={globalStyle.emptyPageText}
            >
              {"Populate this screen with your workouts"}
            </Text>
          </View>
          <View style={{ flex: 1 }} />
        </>
      );
    } else {
      return (
        <FlatList
          data={data}
          inverted
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          renderItem={({ item }) => (
            <Pressable onLongPress={() => removeWorkout(item.key)}>
              <ExerciseSummaryCard workoutData={item}></ExerciseSummaryCard>
            </Pressable>
          )}
          keyExtractor={(item, index) => {
            return item.key;
          }}
        />
      );
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <MainContent></MainContent>
      </View>
    </>
  );
}
