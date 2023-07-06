import { Button, View, StyleSheet, Text, FlatList } from "react-native";
import { useState, useContext, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as LocalStore from "../../store/LocalStore";
import { WorkoutDataContext } from "../../store/WorkoutData.js";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import GoalSpecificGraph from "../../components/history/GoalSpecificGraph.js";
import {
  similarityOfExercises,
  calculateSessionSpecificVolumeVsGoal,
} from "../../components/history/specificityCalculation/specificityCalculation.js";

import GoalSelector from "../../components/history/GoalSelector";
import { AllWorkoutsDataContext } from "../../store/AllWorkoutsData";
import { GoalDataContext } from "../../store/GoalData";

const GoalSpecificScreen = () => {
  const [barGraphData, setBarGraphData] = useState([
    { dates: new Date(), totalVolumes: 5 },
  ]);
  const [pieChartData, setPieChartData] = useState([]);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState({});
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);
  const [selectedBar, setSelectedBar] = useState(-1);

  const [allWorkouts, setAllWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [goalsLoading, setGoalsLoading] = useState(true);

  // const workoutDataContext = useContext(WorkoutDataContext);
  const allWorkoutsDataContext = useContext(AllWorkoutsDataContext);
  const goalDataContext = useContext(GoalDataContext);

  const noGoals = useRef(true);

  useEffect(() => {
    // setSelectedGoalIndex(-1);

    goalDataContext
      .getGoals()
      .then((gs) => {
        setGoals(gs);

        if (gs.length == 0) {
          console.log("No Goals");
          noGoals.current = true;
          setSelectedGoalIndex(-1);
          setSelectedGoal({});
        } else {
          console.log("Yes Goals");

          noGoals.current = false;

          setSelectedGoalIndex(0);
          setSelectedGoal(gs[0].exercise);
        }
        allWorkoutsDataContext
          .getAllWorkouts()
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
              gs.forEach((g) => {
                specificVolumesPerGoal.push(
                  calculateSessionSpecificVolumeVsGoal(exerciseSession, g)
                );
              });

              date = exerciseSession["timeData"]["startTime"];

              totalVolumes.push(totalVolume);
              specificVolumes.push(specificVolumesPerGoal);

              dates.push(new Date(date));
            });

            setBarGraphData(
              dates.map((x, i) => ({
                date: new Date(x),
                totalVolume: totalVolumes[i],
                specificVolume: specificVolumes[i],
                x: i + 1,
              }))
            );

            setLoading(false);
          })
          .catch((error) => {
            console.log();
            ("ERROR in gsg effect");
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [allWorkoutsDataContext.allWorkouts, goalDataContext.goals]);

  useEffect(() => {
    setSingleWorkoutGraphData(selectedBar);
  }, [selectedGoal, goalDataContext.goals]);

  const setSingleWorkoutGraphData = (index) => {
    if (
      noGoals.current ||
      index == -1 ||
      selectedGoalIndex == -1 ||
      allWorkouts.length == 0
    ) {
      console.log("No Pie Chart");
      setPieChartData([]);
      return;
    }
    console.log("Yes Pie Chart");
    pieChartDataVar = allWorkouts[index]["exerciseData"].map((exData, i) => {
      console.log("ExData: ", exData);
      console.log("SelectedGoal: ", selectedGoal);
      return {
        x: exData.exerciseName,
        y: exData.volume,
        colorIntensity: similarityOfExercises(selectedGoal, exData.exercise),
      };
    });

    setPieChartData(pieChartDataVar);
  };

  const onBarPress = (index) => {
    setSelectedBar(index);
    setSingleWorkoutGraphData(index);
  };

  const onGoalSelect = (i) => {
    setSelectedGoalIndex(i);
    setSelectedGoal(goals[i].exercise);
  };

  if (loading == false) {
    return (
      <>
        <View
          style={{
            // flexDirection: "row",
            marginBottom: 5,
            backgroundColor: "grey",
            padding: 5,
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
            // marginHorizontal: 5,
          }}
        >
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              color: "white",
              fontWeight: "700",
              // textAlign: "center",
            }}
          >
            Select a goal:
          </Text>
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
          pieChartDataProp={pieChartData}
          selectedGoalIndex={selectedGoalIndex}
          selectedGoal={selectedGoal}
          noGoals={noGoals}
          onBarPressProp={onBarPress}
        />
      </>
    );
  }
};

styles = StyleSheet.create({
  // goalButtonContainer: { alignItems: "center" },
});

export default GoalSpecificScreen;
