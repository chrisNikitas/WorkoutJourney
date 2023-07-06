import { WorkoutDataContext } from "../../store/WorkoutData.js";
import ExerciseTable from "./ExerciseTable.js";
import { ScrollView } from "react-native";
import { useContext, memo } from "react";

const MemoedTable = memo(ExerciseTable);

const ExerciseTableList = () => {
  const workoutDataContext = useContext(WorkoutDataContext);

  return (
    <ScrollView>
      {workoutDataContext.exerciseData.map((item, idx) => {
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
