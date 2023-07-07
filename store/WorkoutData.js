import { useState, useEffect, createContext, useContext } from "react";
import uuid from "react-native-uuid";
import * as LocalStore from "../store/LocalStore";
import { AllWorkoutsDataContext } from "./AllWorkoutsData";

export const WorkoutDataContext = createContext(null);

export default function WorkoutDataProvider({ children }) {
  // const [allWorkouts, setAllWorkouts] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [factorData, setFactorData] = useState([]);
  const [timeData, setTimeData] = useState({
    startTime: null,
    endTime: null,
  });

  // useEffect(() => {
  //   LocalStore.getData("allWorkouts").then((val) => {
  //     return setAllWorkouts(val);
  //   });
  // }, []);

  const allWorkoutsDataContext = useContext(AllWorkoutsDataContext);

  const clearWorkout = () => {
    setExerciseData([]);
    setFactorData([]);
  };

  const finishWorkout = () => {
    if (exerciseData.length === 0) {
      alert("Cannot save empty workout");
      return;
    }

    let endTime = new Date();
    newTimeData = { ...timeData, endTime: endTime };
    workoutData = {
      key: uuid.v4(),
      exerciseData,
      factorData,
      timeData: newTimeData,
    };

    // newAllWorkouts = [...allWorkouts, workoutData];
    allWorkoutsDataContext.finishWorkout(workoutData);

    clearWorkout();
  };

  function setWorkoutFactors(factors) {
    setFactorData(factors);
  }

  function addExercise(exercise) {
    newExerciseData = (currentExerciseData) => [
      ...currentExerciseData,
      {
        exercise: exercise,
        exerciseName: exercise.name,
        sets: [],
        volume: 0,
      },
    ];
    setExerciseData(newExerciseData);
  }

  const removeExercise = (tableIdx) => {
    newExerciseData = exerciseData.filter((e, i) => {
      if (i !== tableIdx) return true;
      return false;
    });
    setExerciseData(newExerciseData);
  };

  function addSet(newSet, exIdx) {
    // Add to sets of exercise name
    newSets = [...exerciseData[exIdx]["sets"], newSet];

    newVolume = 0;
    newSets.forEach((set) => {
      newVolume += set[0] * set[1];
    });

    newExerciseData = exerciseData.map((v, i) => {
      if (i == exIdx) {
        return { ...v, sets: newSets, volume: newVolume };
      } else {
        return v;
      }
    });
    setExerciseData(newExerciseData);
  }

  const removeSet = (exIdx, setIdx) => {
    newSets = exerciseData[exIdx]["sets"].filter((set, idx) => idx !== setIdx);
    newExerciseData = exerciseData.map((e, i) => {
      if (i == exIdx) {
        return { ...e, sets: newSets };
      } else return e;
    });

    setExerciseData(newExerciseData);
    //i want instead of exerciseData[exIdx]["sets"], newSets
  };

  const setStartTime = (date) => {
    setTimeData({
      ...timeData,
      startTime: date,
    });
  };
  const setEndTime = (date) => {
    setTimeData({
      ...timeData,
      endTime: date,
    });
  };

  const value = {
    finishWorkout: finishWorkout,
    exerciseData: exerciseData,
    addSet: addSet,
    addExercise: addExercise,
    setWorkoutFactors: setWorkoutFactors,
    removeSet: removeSet,
    removeExercise: removeExercise,
    setStartTime: setStartTime,
    setEndTime: setEndTime,
  };
  // removeAllData();
  return (
    <WorkoutDataContext.Provider value={value}>
      {children}
    </WorkoutDataContext.Provider>
  );
}
