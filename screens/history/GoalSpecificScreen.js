import { Text } from "react-native";
import { useState, useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { WorkoutDataContext } from "../../store/WorkoutData.js";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import GoalSpecificGraph from "../../components/history/GoalSpecificGraph.js";

const GoalSpecificScreen = () => {
  const [barGraphData, setBarGraphData] = useState([
    { dates: new Date(), totalVolumes: 5 },
  ]);
  const [data, setData] = useState([]);
  const [tickValues, setTickValues] = useState([null]);
  const [loading, setLoading] = useState(true);

  const workoutDataContext = useContext(WorkoutDataContext);

  useEffect(() => {
    workoutDataContext
      .getAllWorkouts()
      .then((v) => {
        setData(v);
        totalVolumes = [];
        dates = [];
        v.forEach((exerciseSession) => {
          totalVolume = 0;
          exerciseSession["exerciseData"].forEach((element) => {
            totalVolume += element.volume;
          });
          // console.log("Total Volume: ", totalVolume);
          date = exerciseSession["timeData"]["startTime"];

          totalVolumes.push(totalVolume);
          dates.push(new Date(date));
        });
        // const dataVar = dates.map((x, i) => ({ x, y: totalVolumes[i] }));
        // console.log("Date: ", dates);
        setTickValues(dates);
        setBarGraphData(
          dates.map((x, i) => ({
            date: new Date(x),
            y: totalVolumes[i],
            x: i + 1,
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.log("Rejection");
        console.log(error);
      });
  }, [useIsFocused()]);

  if (loading == false) {
    return (
      <>
        <GoalSpecificGraph
          data={data}
          barGraphData={barGraphData}
          tickValues={tickValues}
        />
      </>
    );
  }
};
export default GoalSpecificScreen;
