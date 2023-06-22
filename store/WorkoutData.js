import { useState, useEffect, createContext } from "react";
import * as LocalStore from "../store/LocalStore";

export const WorkoutDataContext = createContext(null);

export default function WorkoutDataProvider({ children }) {
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [factorData, setFactorData] = useState([]);
  const [timeData, setTimeData] = useState({
    startTime: null,
    endTime: null,
  });

  useEffect(() => {
    LocalStore.getData("AllWorkouts").then((val) => {
      return setAllWorkouts(val);
    });
  }, []);

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
    workoutData = { exerciseData, factorData, timeData: newTimeData };

    newAllWorkouts = [...allWorkouts, workoutData];
    setAllWorkouts(newAllWorkouts);

    // console.log("Workout Added!");
    // console.log("First Workout:", newAllWorkouts[0]);

    // workoutVol = 0;
    // console.log("WO DAtra ", workoutData);
    // workoutData["exerciseData"]["sets"].forEach((set) => {
    //   console.log(set);
    // });

    LocalStore.storeData("AllWorkouts", newAllWorkouts);
    clearWorkout();
  };

  function addFactors(factors) {
    // console.log("Adding Factors to Context", factors);
    setFactorData(factors);
  }

  function addExercise(exercise) {
    newExerciseData = (currentExerciseData) => [
      ...currentExerciseData,
      { exerciseName: exercise.name, sets: [] },
    ];
    setExerciseData(newExerciseData);
    // console.log("Adding Exercise From Context... yay");
    // console.log("Exercise Data: ", exerciseData);
  }

  const removeExercise = (tableIdx) => {
    // console.log("Old Exercise Data ", exerciseData);

    newExerciseData = exerciseData.filter((e, i) => {
      if (i !== tableIdx) return true;
      return false;
    });
    setExerciseData(newExerciseData);
    // console.log("New Exercise Data ", newExerciseData);
  };

  function addSet(newSet, exIdx) {
    // Add to sets of exercise name
    newSets = [...exerciseData[exIdx]["sets"], newSet];

    newVolume = 0;
    newSets.forEach((set) => {
      console.log(set);
      newVolume += set[0] * set[1];
    });
    // console.log("Volume ", newVolume);

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
    // console.log("Removing set", setIdx);
    // console.log("New Sets ", newSets);
    // console.log("Old Exercise Data ", exerciseData);
    newSets = exerciseData[exIdx]["sets"].filter((set, idx) => idx !== setIdx);
    newExerciseData = exerciseData.map((e, i) => {
      if (i == exIdx) {
        return { ...e, sets: newSets };
      } else return e;
    });
    // console.log("New Exercise Data ", newExerciseData);
    // console.log();

    setExerciseData(newExerciseData);
    //i want instead of exerciseData[exIdx]["sets"], newSets
  };

  const setStartTime = (date) => {
    // console.log("Setting Start Time to: ", date);
    setTimeData({
      ...timeData,
      startTime: date,
    });
  };
  const setEndTime = (date) => {
    // console.log("Setting End Time to: ", date);
    setTimeData({
      ...timeData,
      endTime: date,
    });
  };

  const getAllWorkouts = async () => {
    if (allWorkouts.length == 0) {
      // console.log("Zerp");
      data = LocalStore.getData("AllWorkouts");
      data.then((v) => {
        setAllWorkouts(v);
      });
      return LocalStore.getData("AllWorkouts");
    } else {
      // console.log("NON zErp");
      return allWorkouts;
    }
  };
  const value = {
    allWorkouts: allWorkouts,
    exerciseData: exerciseData,
    addSet: addSet,
    addExercise: addExercise,
    addWorkout: finishWorkout,
    addFactors: addFactors,
    removeSet: removeSet,
    removeExercise: removeExercise,
    setStartTime: setStartTime,
    setEndTime: setEndTime,
    getAllWorkouts: getAllWorkouts,
  };

  return (
    <WorkoutDataContext.Provider value={value}>
      {children}
    </WorkoutDataContext.Provider>
  );
}
