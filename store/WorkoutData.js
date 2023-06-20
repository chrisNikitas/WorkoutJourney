import { useState, createContext } from "react";
import * as LocalStore from "../store/LocalStore";

export const WorkoutDataContext = createContext(null);

export default function WorkoutDataProvider({ children }) {
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [workoutData, setWorkoutData] = useState(null);
  const [factorData, setFactorData] = useState([]);

  const clearWorkout = () => {
    setWorkoutData([]);
    setExerciseData([]);
    setFactorData([]);
  };

  const addWorkout = () => {
    // This is where data is moved to allWorkouts
    console.log("WO data ", workoutData);
    if (!("exerciseData" in workoutData)) {
      alert("Cannot save empty workout");
      return;
    }

    newAllWorkouts = [...allWorkouts, workoutData];
    setAllWorkouts(newAllWorkouts);
    console.log("Workout Added!");
    console.log("All Workouts:", allWorkouts);
    console.log("First Workout:", allWorkouts[0]);

    clearWorkout();
  };

  function addFactors(factors) {
    console.log("Adding Factors to Context", factors);
    setFactorData(factors);

    // Move to workout data
    setWorkoutData({
      ...workoutData,
      factorData: factors,
    });
  }

  function addExercise(exercise) {
    newExerciseData = (currentExerciseData) => [
      ...currentExerciseData,
      { exerciseName: exercise.name, sets: [] },
    ];
    setExerciseData(newExerciseData);
    console.log("Adding Exercise From Context... yay");
    console.log("Exercise Data: ", exerciseData);

    // Move to workout data
    setWorkoutData({
      ...workoutData,
      exerciseData: newExerciseData,
    });
  }

  const removeExercise = (tableIdx) => {
    console.log("Old Exercise Data ", exerciseData);

    newExerciseData = exerciseData.filter((e, i) => {
      if (i !== tableIdx) return true;
      return false;
    });
    setExerciseData(newExerciseData);
    console.log("New Exercise Data ", newExerciseData);
  };

  function addSet(newSet, exIdx) {
    // Add to sets of exercise name
    newSets = [...exerciseData[exIdx]["sets"], newSet];
    newExerciseData = exerciseData.map((v, i) => {
      if (i == exIdx) {
        return { ...v, sets: newSets };
      } else {
        return v;
      }
    });
    setExerciseData(newExerciseData);

    // Move to workout data
    setWorkoutData({
      ...workoutData,
      exerciseData: newExerciseData,
    });
  }

  const removeSet = (exIdx, setIdx) => {
    console.log("Removing set", setIdx);
    console.log("New Sets ", newSets);
    console.log("Old Exercise Data ", exerciseData);
    newSets = exerciseData[exIdx]["sets"].filter((set, idx) => idx !== setIdx);
    newExerciseData = exerciseData.map((e, i) => {
      if (i == exIdx) {
        return { ...e, sets: newSets };
      } else return e;
    });
    console.log("New Exercise Data ", newExerciseData);
    console.log();

    setExerciseData(newExerciseData);
    //i want instead of exerciseData[exIdx]["sets"], newSets
  };

  const value = {
    exerciseData: exerciseData,
    addSet: addSet,
    addExercise: addExercise,
    addWorkout: addWorkout,
    addFactors: addFactors,
    removeSet: removeSet,
    removeExercise: removeExercise,
  };

  return (
    <WorkoutDataContext.Provider value={value}>
      {children}
    </WorkoutDataContext.Provider>
  );
}
