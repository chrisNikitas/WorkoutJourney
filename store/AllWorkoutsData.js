import { useState, useEffect, createContext, useRef } from "react";
import uuid from "react-native-uuid";
import * as LocalStore from "./LocalStore";

export const AllWorkoutsDataContext = createContext(null);

export default function AllWorkoutsDataProvider({ children }) {
  const [allWorkouts, setAllWorkouts] = useState([]);
  // const [allWorkoutsRetrieved, setAllWorkoutsRetrieved] = useState(false);
  const allWorkoutsRetrieved = useRef(false);

  useEffect(() => {
    getAllWorkouts();
  }, []);

  const test = () => {
    console.log("Test Success, from allworkouts context");
  };

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
  };

  const getAllWorkouts = async () => {
    if (!allWorkoutsRetrieved.current) {
      allWorkoutsRetrieved.current = true;
      console.log("Non-Optimised first time retrieval");
      data = LocalStore.getData("AllWorkouts");
      data.then((v) => {
        setAllWorkouts(v);
      });
      return data;
    } else {
      console.log("Optimised retrieval");
      return allWorkouts;
    }
  };

  const finishWorkout = (newWorkoutData) => {
    console.log("From New");
    newAllWorkouts = [...allWorkouts, newWorkoutData];
    setAllWorkouts(newAllWorkouts);

    // console.log("Workout Added!");
    // console.log("First Workout:", newAllWorkouts[0]);

    // workoutVol = 0;
    // console.log("WO DAtra ", workoutData);
    // workoutData["exerciseData"]["sets"].forEach((set) => {
    //   console.log(set);
    // });

    LocalStore.storeData("AllWorkouts", newAllWorkouts);
    console.log(newWorkoutData);
  };

  const removeWorkout = (key) => {
    newAllWorkouts = allWorkouts.filter((wo) => wo.key !== key);
    console.log("Old Workouts ", allWorkouts.length);
    console.log("New Workouts ", newAllWorkouts.length);
    setAllWorkouts(newAllWorkouts);
    LocalStore.storeData("AllWorkouts", newAllWorkouts);
  };

  const removeAllData = () => {
    console.log("Removing");
    LocalStore.storeData("AllWorkouts", []);
    setAllWorkouts([{}]);
  };

  const value = {
    test: test,

    finishWorkout: finishWorkout,
    addDummyWorkout: addDummyWorkout,

    allWorkouts: allWorkouts,
    getAllWorkouts: getAllWorkouts,

    removeWorkout: removeWorkout,
    removeAllData: removeAllData,
  };

  return (
    <AllWorkoutsDataContext.Provider value={value}>
      {children}
    </AllWorkoutsDataContext.Provider>
  );
}
