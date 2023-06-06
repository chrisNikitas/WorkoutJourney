import { useState, createContext } from "react";

export const WorkoutDataContext = createContext(null);

export default function WorkoutDataProvider({ children }) {
  const [workoutData, setWorkoutData] = useState([]);

  function addExercise(exercise) {
    setWorkoutData((currentWorkoutData) => [
      ...currentWorkoutData,
      { exerciseName: exercise.name, sets: [] },
    ]);
    console.log("Adding Exercise From Context... yay");
    console.log("Workout Data: ", workoutData);
  }

  function addSet(exerciseName, newSet, idx) {
    // Add to sets of exercise name
    newSets = [...workoutData[idx]["sets"], newSet];
    console.log("Adding Set to Context");
    setWorkoutData(
      workoutData.map((v, i) => {
        if (i == idx) {
          return { ...v, sets: newSets };
        } else {
          return v;
        }
      })
    );
  }

  const value = {
    workoutData: workoutData,
    addSet: addSet,
    addExercise: addExercise,
  };

  return (
    <WorkoutDataContext.Provider value={value}>
      {children}
    </WorkoutDataContext.Provider>
  );
}
