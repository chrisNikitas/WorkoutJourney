import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryZoomContainer,
  VictoryTheme,
  VictoryPie,
} from "victory-native";
import * as LocalStore from "../../store/LocalStore";
import { BarChart } from "react-native-chart-kit";
import { Text, View, ScrollView, Button } from "react-native";
import { useState } from "react";

const GoalSpecificGraph = ({ data, barGraphData, tickValues }) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [selectedBar, setSelectedBar] = useState(0);

  const plotSingleWorkoutGraph = (datum) => {
    index = datum.x - 1;
    console.log(data[index]);
    pieChartDataVar = data[index]["exerciseData"].map((exData, i) => ({
      x: exData.exerciseName,
      y: exData.volume,
    }));

    setPieChartData(pieChartDataVar);
  };

  const similarityOfExercises = (goalExercise, exercise) => {
    goalPrimaryMuscles = goalExercise.primaryMuscles;
    goalSecondaryMuscles = goalExercise.secondaryMuscles;

    ppmatches = exercise["primaryMuscles"].filter((muscle) =>
      goalPrimaryMuscles.includes(muscle)
    );
    psmatches = exercise["primaryMuscles"].filter((muscle) =>
      goalSecondaryMuscles.includes(muscle)
    );
    spmatches = exercise["secondaryMuscles"].filter((muscle) =>
      goalPrimaryMuscles.includes(muscle)
    );
    ssmatches = exercise["secondaryMuscles"].filter((muscle) =>
      goalSecondaryMuscles.includes(muscle)
    );

    // Volume Towards Current Goal is Calculated here
    similarityOfGoalToExercise =
      exercise.name == goalExercise.name
        ? 1
        : (ppmatches.length +
            (psmatches.length + spmatches.length) * 0.75 +
            ssmatches.length * 0.56) /
          (ppmatches.length +
            psmatches.length +
            spmatches.length +
            ssmatches.length);

    if (goalExercise.force != exercise.force)
      similarityOfGoalToExercise = similarityOfGoalToExercise / 4;

    similarityOfGoalToExercise = isNaN(similarityOfGoalToExercise)
      ? 0
      : similarityOfGoalToExercise;
    // Primary matches
    console.log(
      exercise.name +
        " similarity to goal " +
        goalExercise.name +
        ": " +
        similarityOfGoalToExercise
    );
    // console.log("SIm ", isNaN(similarityOfGoalToExercise));

    return similarityOfGoalToExercise;
  };

  const calculateSpecificVolume = (index) => {
    console.log();
    console.log("####################");
    console.log("Button Pressed");
    goals = LocalStore.getData("goals").then((gs) => {
      gs.forEach((g) => {
        // for each goal
        console.log("Goal: ", g);
        goalPrimaryMuscles = g.exercise.primaryMuscles;
        goalSecondaryMuscles = g.exercise.secondaryMuscles;

        data[index]["exerciseData"].forEach((ex) => {
          // for each exerise
          console.log(ex);

          console.log(
            ex.exercise["primaryMuscles"],
            ex.exercise["secondaryMuscles"]
          );

          similarityOfGoalToExercise = similarityOfExercises(
            g.exercise,
            ex.exercise
          );

          // ppmatches = ex.exercise["primaryMuscles"].filter((muscle) =>
          //   goalPrimaryMuscles.includes(muscle)
          // );
          // psmatches = ex.exercise["primaryMuscles"].filter((muscle) =>
          //   goalSecondaryMuscles.includes(muscle)
          // );
          // spmatches = ex.exercise["secondaryMuscles"].filter((muscle) =>
          //   goalPrimaryMuscles.includes(muscle)
          // );
          // ssmatches = ex.exercise["secondaryMuscles"].filter((muscle) =>
          //   goalSecondaryMuscles.includes(muscle)
          // );

          // // Volume Towards Current Goal is Calculated here
          // similarityOfGoalToExercise =
          //   ex.exerciseName == g.exercise.name
          //     ? 1
          //     : (ppmatches.length +
          //         (psmatches.length + spmatches.length) * 0.75 +
          //         ssmatches.length * 0.56) /
          //       (ppmatches.length +
          //         psmatches.length +
          //         spmatches.length +
          //         ssmatches.length);

          // if (g.exercise.force != ex.exercise.force)
          //   similarityOfGoalToExercise = similarityOfGoalToExercise / 4;

          // // Primary matches
          // console.log(
          //   ex.exerciseName +
          //     " similarity to goal " +
          //     g.exercise.name +
          //     ": " +
          //     similarityOfGoalToExercise
          // );
          // similarityOfGoalToExercise =
          //   similarityOfGoalToExercise == NaN ? 0 : similarityOfGoalToExercise;

          specificVolume = ex.volume * similarityOfGoalToExercise;
          console.log("Specific Vol ", specificVolume);

          // console.log();
          // console.log("PP", spmatches);
        });
      });
      // for each goal
      // get primary muscle,
      // if this workout had an exercise which trains this muscle
      // then calculate volume contrib
    });
  };

  return (
    <>
      <Button
        title="goals"
        onPress={() => calculateSpecificVolume(selectedBar)}
      ></Button>
      <ScrollView>
        <VictoryChart
          domainPadding={{ x: [20, 20] }}
          padding={{ bottom: 100, top: 100, left: 20, right: 20 }}
          containerComponent={
            <VictoryZoomContainer
              // responsive={false}
              zoomDimension="x"
              minimumZoom={{ x: 2 }}
              zoomDomain={{ x: [barGraphData.length - 4, barGraphData.length] }}
              // onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis
            label={"Date"}
            tickCount={4}
            invertAxis={true}
            // tickValues={tickValues}
            // tickFormat={(x, i) => x.getDate() + "/" + (x.getMonth() + 1)}
            //   {
            //   return data[i] ? x.getDate() + "/" + (x.getMonth() + 1) : null;
            // }}
            tickFormat={(x, i) => {
              return barGraphData[i]
                ? barGraphData[i].date.getDate() +
                    "/" +
                    (barGraphData[i].date.getMonth() + 1)
                : null;
            }}
          />
          {/* <VictoryAxis dependentAxis label={"Volume"} /> */}
          <VictoryStack>
            <VictoryBar
              data={barGraphData}
              style={{
                data: {
                  fill: ({ index }) =>
                    index === selectedBar ? "tomato" : "black",
                  // "#c43a31"
                },
              }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPressIn: () => {
                      console.log("Clicked");
                      return [
                        {
                          target: "data",
                          mutation: (props) => {
                            console.log(props.style.fill);
                            plotSingleWorkoutGraph(props.datum);
                            setSelectedBar(index);
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </VictoryStack>
        </VictoryChart>
        <VictoryPie data={pieChartData} />
      </ScrollView>
    </>
  );
};
export default GoalSpecificGraph;
