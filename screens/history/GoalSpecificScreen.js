import {
  Button,
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import FloatingCollapsible from "../../components/global/FloatingCollapsible";
import globalStyle from "../../components/global/globalStyle";
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
  const [helpView, setHelpView] = useState(false);

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
          noGoals.current = true;
          setSelectedGoalIndex(-1);
          setSelectedGoal({});
        } else {
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
            console.log("ERROR in gsg effect");
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
      setPieChartData([]);
      return;
    }
    pieChartDataVar = allWorkouts[index]["exerciseData"].map((exData, i) => {
      return {
        x: i + 1,
        exNames: exData.exerciseName,
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

  if (loading == false && allWorkouts.length != 0 && goals.length != 0) {
    return (
      <>
        <FloatingCollapsible
          title={"Help?"}
          expandedViewContent={
            <Text>
              The first grapsh shows you how much training volume you've done in
              your workouts.
              {"\n"}
              {"\u2022 "}The{" "}
              <Text style={{ fontWeight: 700 }}>Total Volume</Text> is
              calculated by multiplying the weight by the number of sets and
              repetitions of all exercises in a session. {"\n"}
              {"\u2022 "}
              <Text style={{ fontWeight: 700 }}>Specific Volume</Text> is
              training volume that directly helps you achieve your selected
              goal. This is calculated by looking at which muscles require
              development for your goals and which muscles each exercise works.
              {"\n\n"}
              Once you tap on any of the bars the
              <Text style={{ fontWeight: 700 }}> pie chart</Text> appears. This
              shows all the exercises performed in that session.
              {"\n"}
              {"\u2022 "}The <Text style={{ fontWeight: 700 }}>area</Text> shows
              the volume of each exercise.
              {"\n"}
              {"\u2022 "}The{" "}
              <Text style={{ fontWeight: 700 }}>intensity of the colour </Text>
              shows how much that exercise trains similar muscles as your
              selected goal exercise.
            </Text>
          }
        />
        <View style={styles.goalSelectorContainer}>
          <Text
            style={{
              margin: 8,
              padding: 3,
              fontSize: 18,
              color: "black",
              fontWeight: "700",
              borderBottomWidth: 1,
              // backgroundColor: "lightgrey",
              borderBottomColor: "lightgrey",
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
  } else
    return (
      <>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={2}
            style={globalStyle.emptyPageText}
          >
            {"Add at least one goal and one workout to reveal this page"}
          </Text>
        </View>
        <View style={{ flex: 1 }} />
      </>
    );
};

styles = StyleSheet.create({
  goalSelectorContainer: {
    // flexDirection: "row",
    marginBottom: 5,
    backgroundColor: "rgba(176, 176, 176, 1)",
    padding: 5,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
});

export default GoalSpecificScreen;
