import { useState, useEffect, createContext, useRef } from "react";
import uuid from "react-native-uuid";
import * as LocalStore from "./LocalStore";

export const AllWorkoutsDataContext = createContext(null);

export default function AllWorkoutsDataProvider({ children }) {
  const [allWorkouts, setAllWorkouts] = useState([]);
  const allWorkoutsRetrieved = useRef(false);

  useEffect(() => {
    getAllWorkouts();
  }, []);

  const addDummyWorkout = () => {
    let now = Date.now();
    let startTime = new Date(now - 1 * 60000);
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

    LocalStore.storeData("allWorkouts", newAllWorkouts);
  };

  const getAllWorkouts = async () => {
    if (!allWorkoutsRetrieved.current) {
      allWorkoutsRetrieved.current = true;

      data = LocalStore.getData("allWorkouts");
      data.then((v) => {
        let toStore = v ? v : [];
        console.log("AllWorkouts ", toStore);
        setAllWorkouts(toStore);
      });
      return data;
    } else {
      return allWorkouts;
    }
  };

  const finishWorkout = (newWorkoutData) => {
    newAllWorkouts = [...allWorkouts, newWorkoutData];
    setAllWorkouts(newAllWorkouts);

    LocalStore.storeData("allWorkouts", newAllWorkouts);
  };

  const removeWorkout = (key) => {
    newAllWorkouts = allWorkouts.filter((wo) => wo.key !== key);
    setAllWorkouts(newAllWorkouts);
    LocalStore.storeData("allWorkouts", newAllWorkouts);
  };

  const removeAllData = () => {
    LocalStore.storeData("allWorkouts", []);
    setAllWorkouts([{}]);
  };
  const test = () => {
    console.log("test");
  };

  const value = {
    finishWorkout: finishWorkout,
    addDummyWorkout: addDummyWorkout,
    test: test,
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
