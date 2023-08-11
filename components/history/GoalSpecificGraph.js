import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryPie,
  VictoryLabel,
  VictoryLegend,
  VictoryGroup,
} from "victory-native";
import { Svg } from "react-native-svg";
import { GoalDataContext } from "../../store/GoalData";
import { View, ScrollView, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect, useContext } from "react";
import { similarityOfExercises } from "./specificityCalculation/specificityCalculation";
import Collapsible from "react-native-collapsible";

const GoalSpecificGraph = ({
  data,
  barGraphData,
  pieChartDataProp,
  selectedGoalIndex,
  selectedGoal,
  noGoals,
  onBarPressProp,
}) => {
  const [selectedBar, setSelectedBar] = useState(-1);
  const [barWidth, setBarWidth] = useState(25);
  const [helpView, setHelpView] = useState(false);

  const goalDataContext = useContext(GoalDataContext);

  const onBarPress = () => {
    return [
      {
        target: "data",
        mutation: (props) => {
          let index = props.datum.x - 1;

          setSelectedBar(index);
          onBarPressProp(index);
        },
      },
    ];
  };

  const GoalSpecificPieChart = () => {
    if (pieChartDataProp.length == 0) {
      return;
    }
    let legend = pieChartDataProp.map((ex) => {
      return {
        name: "" + ex.x + " :" + ex.exNames + "",
        symbol: { fill: "none" },
      };
    });
    return (
      <>
        <Text style={styles.explanatoryText}>
          The bolder the color of the area, the more carry-over that exercise
          has on your selected goal
        </Text>

        <View>
          <VictoryPie
            // x={0}
            // y={140}
            data={pieChartDataProp}
            // labelRadius={({ innerRadius }) => 20}
            // radius={({ datum }) => 50 + (datum.y * 1) / 7}
            // labelPosition={({ index }) => "centroid"}
            // labelPlacement={({ index }) => "perpendicular"}
            // labels} // split each label by spaces
            padAngle={({ datum }) => 3}
            innerRadius={80}
            style={{
              data: {
                // fill: ({ index }) => "black",

                fill: ({ index }) => {
                  let a = pieChartDataProp[index]["colorIntensity"] + 0.1;
                  return "rgba(255, 99, 71," + a + " )";
                },
              },
            }}
          />
          <VictoryLegend data={legend} />
        </View>
      </>
    );
  };

  return (
    <>
      <ScrollView>
        <View style={styles.graphContainer}>
          <VictoryChart
            height={310}
            domainPadding={{ x: [20, 20] }}
            padding={{ bottom: 70, top: 40, left: 59, right: 30 }}
            containerComponent={<VictoryZoomContainer zoomDimension="x" />}
          >
            <VictoryAxis
              label={"Date (Past to Present)"}
              style={{
                axisLabel: {
                  fontWeight: 500,
                  // angle: 90,
                },
                tickLabels: { fontWeight: 600 },
              }}
              // tickCount={4}
              // invertAxis={true}
              tickFormat={(x, i) => {
                return barGraphData[x - 1]
                  ? barGraphData[x - 1].date.getDate() +
                      "/" +
                      (barGraphData[x - 1].date.getMonth() + 1)
                  : null;
              }}
            />
            <VictoryAxis
              dependentAxis
              label={"Volume/kg"}
              style={{
                tickLabels: { fontWeight: 600 },
                axisLabel: {
                  padding: 53,
                  fontWeight: 500,
                  angle: 0,
                  dy: -115,
                  dx: 33,
                },
              }}
            />
            <VictoryBar
              data={barGraphData}
              y="totalVolume"
              style={{
                data: {
                  fill: ({ index }) =>
                    index === selectedBar ? "#ff634792" : "grey",
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
              labelComponent={<VictoryLabel dy={30} />}
              labels={({ datum }) => datum.y}
              barWidth={barWidth}
            />
            {!noGoals.current && selectedGoalIndex != -1 && (
              <VictoryBar
                data={barGraphData}
                y={(d) => {
                  return d.specificVolume[selectedGoalIndex]
                    ? d.specificVolume[selectedGoalIndex]
                    : 0;
                }} // 😊😊
                style={{
                  data: {
                    fill: ({ index }) =>
                      index === selectedBar ? "#ff6347b9" : "black",
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
            )}
            <VictoryLegend
              x={60}
              y={285}
              // title="Legend"
              centerTitle
              orientation="horizontal"
              gutter={20}
              // style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
              data={[
                {
                  name: "Total Volume",
                  symbol: { fill: "grey", type: "square" },
                },
                {
                  name: "Specific Volume",
                  symbol: { fill: "black", type: "square" },
                },
              ]}
            />
          </VictoryChart>
          <Text style={styles.explanatoryText}>
            <Text style={{ fontWeight: 700 }}>Tap</Text> on any of the bars to
            view a breakdown
          </Text>
        </View>
        <View style={styles.graphContainer}>
          <GoalSpecificPieChart></GoalSpecificPieChart>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  explanatoryText: {
    padding: 15,
    // // shadowColor: "red",
    // textShadowOffset: { width: 1, height: 2 },
    // textShadowColor: "grey",
    // textShadowRadius: 3,

    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: {width: -1, height: 1},
    // letterSpacing: 0.1,
    // lineHeight: 15,
    fontSize: 16,
  },
  graphContainer: {
    backgroundColor: "rgba(226, 226, 226, 1)",
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 5,
  },
});
export default GoalSpecificGraph;
