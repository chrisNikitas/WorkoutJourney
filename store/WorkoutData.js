import { useState, useEffect, createContext } from "react";
import uuid from "react-native-uuid";
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

  const addDummyWorkout = () => {
    let now = Date.now();
    let startTime = new Date(now - 1 * 60000);
    console.log("Here");
    let endTime = new Date();

    workoutData = {
      key: uuid.v4(),
      exerciseData: [
        {
          exercise: {
            name: "Pullups",
            force: "pull",
            mechanic: "compound",
            primaryMuscles: ["lats"],
            secondaryMuscles: ["biceps", "middle back"],
            category: "strength",
          },

          exerciseName: "Pullups",
          sets: [
            [2, 4],
            [2, 5],
            [2, 5],
            [2, 5],
            [2, 5],
          ],
          volume: 48,
        },
        {
          exerciseName: "Pushups",
          exercise: {
            name: "Pushups",
            force: "push",
            mechanic: "compound",
            primaryMuscles: ["chest"],
            secondaryMuscles: ["shoulders", "triceps"],
            category: "strength",
          },
          sets: [
            [10, 10],
            [10, 10],
            [10, 10],
          ],
          volume: 300,
        },

        {
          exercise: {
            name: "Advanced Kettlebell Windmill",
            force: "push",
            mechanic: "isolation",
            primaryMuscles: ["abdominals"],
            secondaryMuscles: ["glutes", "hamstrings", "shoulders"],
            category: "strength",
          },
          exerciseName: "Advanced Kettlebell Windmill",
          sets: [
            [10, 20],
            [10, 20],
            [10, 20],
            [10, 20],
          ],
          volume: 800,
        },
      ],
      factorData: [],
      timeData: {
        endTime: endTime,
        startTime: startTime,
      },
    };

    newAllWorkouts = [...allWorkouts, workoutData];
    setAllWorkouts(newAllWorkouts);
    console.log("AllWorkouts", newAllWorkouts);
    LocalStore.storeData("AllWorkouts", newAllWorkouts);
    clearWorkout();
  };

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
    console.log(workoutData);
  };

  function addFactors(factors) {
    // console.log("Adding Factors to Context", factors);
    setFactorData(factors);
  }

  function addExercise(exercise) {
    newExerciseData = (currentExerciseData) => [
      ...currentExerciseData,
      { exercise: exercise, exerciseName: exercise.name, sets: [] },
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

  const removeAllData = () => {
    console.log("Removing");
    LocalStore.storeData("AllWorkouts", []);
    setAllWorkouts([]);
  };

  const removeWorkout = (key) => {
    newAllWorkouts = allWorkouts.filter((wo) => wo.key !== key);
    console.log("Old Workouts ", allWorkouts.length);
    console.log("New Workouts ", newAllWorkouts.length);
    setAllWorkouts(newAllWorkouts);
    LocalStore.storeData("AllWorkouts", newAllWorkouts);
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
    removeAllData: removeAllData,
    removeWorkout: removeWorkout,
    addDummyWorkout: addDummyWorkout,
  };
  // removeAllData();
  return (
    <WorkoutDataContext.Provider value={value}>
      {children}
    </WorkoutDataContext.Provider>
  );
}
