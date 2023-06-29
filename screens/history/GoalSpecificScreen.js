import { Button, View, StyleSheet, Text, FlatList } from "react-native";
import { useState, useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as LocalStore from "../../store/LocalStore";
import { WorkoutDataContext } from "../../store/WorkoutData.js";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import GoalSpecificGraph from "../../components/history/GoalSpecificGraph.js";
import {
  calculateSessionSpecificVolume,
  calculateSessionSpecificVolumeVsGoal,
} from "../../components/history/specificityCalculation/specificityCalculation.js";
import GoalSelector from "../../components/history/GoalSelector";
import { AllWorkoutsDataContext } from "../../store/AllWorkoutsData";

const GoalSpecificScreen = () => {
  const [barGraphData, setBarGraphData] = useState([
    { dates: new Date(), totalVolumes: 5 },
  ]);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState({});
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);

  const [allWorkouts, setAllWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goalsLoading, setGoalsLoading] = useState(true);

  // const workoutDataContext = useContext(WorkoutDataContext);
  const allWorkoutsDataContext = useContext(AllWorkoutsDataContext);

  useEffect(() => {
    // console.log("AW", workoutDataContext.allWorkouts);
    if (goalsLoading)
      LocalStore.getData("goals").then((gs) => {
        console.log("Loading Goals");
        setGoals(gs);
        setGoalsLoading(false);
      });
    if (!goalsLoading) {
      LocalStore.getData("AllWorkouts")
        .then((v) => {
          setAllWorkouts(v);
          totalVolumes = [];
          specificVolumes = [];
          dates = [];
          v.forEach((exerciseSession) => {
            totalVolume = 0;
            exerciseSession["exerciseData"].forEach((element) => {
              totalVolume += element.volume;
            });

            specificVolumesPerGoal = [];
            goals.forEach((g) => {
              specificVolumesPerGoal.push(
                calculateSessionSpecificVolumeVsGoal(exerciseSession, g)
              );
            });

            date = exerciseSession["timeData"]["startTime"];

            totalVolumes.push(totalVolume);
            specificVolumes.push(specificVolumesPerGoal);

            dates.push(new Date(date));
            console.log("V: ", v[0].exerciseData);
          });

          setBarGraphData(
            dates.map((x, i) => ({
              date: new Date(x),
              totalVolume: totalVolumes[i],
              specificVolume: specificVolumes[i],
              x: i + 1,
            }))
          );

          setSelectedGoal(goals[selectedGoalIndex].exercise);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log("Effect Graph");
  }, [goalsLoading, allWorkoutsDataContext.allWorkouts]);

  const onGoalSelect = (i) => {
    setSelectedGoalIndex(i);
    setSelectedGoal(goals[i].exercise);
  };

  if (loading == false) {
    return (
      <>
        <View style={{ marginVertical: 5 }}>
          <FlatList
            data={goals}
            horizontal={true}
            // numColumns={3}
            keyExtractor={(item, index) => index}
            renderItem={(itemData) => {
              return (
                <GoalSelector
                  goalName={itemData.item.exercise.name}
                  goalIndex={itemData.index}
                  onSelect={onGoalSelect}
                  selected={itemData.index == selectedGoalIndex}
                />
              );
            }}
          />
        </View>
        <GoalSpecificGraph
          data={allWorkouts}
          barGraphData={barGraphData}
          selectedGoalIndex={selectedGoalIndex}
          selectedGoal={selectedGoal}
        />
      </>
    );
  }
};

styles = StyleSheet.create({
  // goalButtonContainer: { alignItems: "center" },
});

export default GoalSpecificScreen;
