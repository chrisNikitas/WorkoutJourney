import { VictoryBar } from "victory-native";
import { useEffect, useContext, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { WorkoutDataContext } from "../../store/WorkoutData.js";
import ExerciseSummaryCard from "../../components/history/ExerciseSummaryCard.js";
export default function HistoryScreen() {
  const [data, setData] = useState([]);
  workoutDataContext = useContext(WorkoutDataContext);

  useEffect(() => {
    workoutDataContext.getAllWorkouts().then((v) => {
      setData(v);
    });
  }, [useIsFocused()]);

  const renderExerciseCard = (workoutData) => {
    console.log(workoutData);
    return (
      <ExerciseSummaryCard workoutData={workoutData}></ExerciseSummaryCard>
    );
  };

  return (
    <>
      <View style={styles.mainContent}>
        <FlatList
          data={data}
          renderItem={(itemData) => renderExerciseCard(itemData.item)}
        />
      </View>
      {/* <VictoryBar /> */}
    </>
  );
}
