import { WorkoutDataContext } from "../../store/WorkoutData.js";
import ExerciseTable from "./ExerciseTable.js";
import { ScrollView } from "react-native";
import { useContext, memo } from "react";

const MemoedTable = memo(ExerciseTable);

const ExerciseTableList = () => {
  const workoutDataContext = useContext(WorkoutDataContext);
  console.log("Here");
  console.log(workoutDataContext.exerciseData);
  return (
    <ScrollView>
      {workoutDataContext.exerciseData.map((item, idx) => {
        // console.log("This");
        return (
          <MemoedTable
            key={idx}
            tableIdx={idx}
            exerciseName={item.exerciseName}
          ></MemoedTable>
        );
      })}
    </ScrollView>
  );
};

export default ExerciseTableList;
