import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryPie,
} from "victory-native";

import { useIsFocused } from "@react-navigation/native";
import { View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { similarityOfExercises } from "./specificityCalculation/specificityCalculation";

const GoalSpecificGraph = ({
  data,
  barGraphData,
  selectedGoalIndex,
  selectedGoal,
}) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [selectedBar, setSelectedBar] = useState(-1);
  const [barWidth, setBarWidth] = useState(2);

  useEffect(() => {
    plotSingleWorkoutGraph(selectedBar);
  }, [selectedGoal]);

  const plotSingleWorkoutGraph = (index) => {
    if (index == -1) return;
    pieChartDataVar = data[index]["exerciseData"].map((exData, i) => {
      return {
        x: exData.exerciseName,
        y: exData.volume,
        colorIntensity: similarityOfExercises(selectedGoal, exData.exercise),
      };
    });

    setPieChartData(pieChartDataVar);
  };

  const onBarPress = () => {
    return [
      {
        target: "data",
        mutation: (props) => {
          let index = props.datum.x - 1;
          plotSingleWorkoutGraph(index);

          setSelectedBar(index);
        },
      },
    ];
  };

  return (
    <>
      <ScrollView style={{}}>
        <View
          style={{
            backgroundColor: "lightgrey",
            borderRadius: 5,
            marginHorizontal: 5,
          }}
        >
          <VictoryChart
            // domainPadding={{ x: [20, 20] }}
            // padding={{ bottom: 100, top: 100, left: 20, right: 20 }}
            containerComponent={
              <VictoryZoomContainer
                onZoomDomainChange={({ x, y }) => {
                  let xDiff = x[1] - x[0];
                  setBarWidth(100 / xDiff);
                }}
                zoomDimension="x"
                minimumZoom={{ x: 2 }}
                zoomDomain={{
                  x: [-1, 4],
                }}
              />
            }
          >
            <VictoryAxis
              label={"Date (Past to Present)"}
              // tickCount={4}
              // invertAxis={true}
              tickFormat={(x, i) => {
                return barGraphData[0]
                  ? barGraphData[0].date.getDate() +
                      "/" +
                      (barGraphData[0].date.getMonth() + 1)
                  : null;
              }}
            />
            <VictoryBar
              data={barGraphData}
              y="totalVolume"
              style={{
                data: {
                  fill: ({ index }) =>
                    index === selectedBar ? "tomato" : "grey",
                },
              }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPressIn: () => onBarPress(),
                  },
                },
              ]}
              barWidth={barWidth}
            />
            <VictoryBar
              data={barGraphData}
              y={"specificVolume[" + selectedGoalIndex + "]"} // 😊😊
              style={{
                data: {
                  fill: ({ index }) =>
                    index === selectedBar ? "#c43a31" : "black",
                },
              }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPressIn: () => onBarPress(),
                  },
                },
              ]}
              barWidth={barWidth}
            />
          </VictoryChart>
        </View>
        <VictoryPie
          data={pieChartData}
          style={{
            data: {
              // fill: ({ index }) => "black",
              fill: ({ index }) => {
                let a = pieChartData[index]["colorIntensity"] + 0.1;
                return "rgba(255, 99, 71," + a + " )";
              },
            },
          }}
        />
      </ScrollView>
    </>
  );
};
export default GoalSpecificGraph;
