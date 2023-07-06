import { useState, useEffect, createContext, useRef } from "react";
import * as LocalStore from "./LocalStore";

export const GoalDataContext = createContext(null);

export default function GoalDataProvider({ children }) {
  const [goals, setGoals] = useState([]);

  const goalsRetrieved = useRef(false);

  useEffect(() => {
    getGoals();
  }, []);

  const addGoal = (newGoal) => {
    let newGoals = [...goals, newGoal];
    setGoals(newGoals);
    LocalStore.storeData("goals", newGoals);
  };

  const removeGoal = (goal) => {
    let newGoals = goals.filter((g) => g != goal);
    setGoals(newGoals);
    LocalStore.storeData("goals", newGoals);
  };

  const getGoals = async () => {
    if (!goalsRetrieved.current) {
      goalsRetrieved.current = true;
      data = LocalStore.getData("goals");
      data.then((v) => {
        let toStore = v ? v : [];
        console.log("Goals ", toStore);
        setGoals(toStore);
      });
      return data;
    } else {
      return goals;
    }
  };

  const value = {
    goals: goals,
    getGoals: getGoals,
    addGoal: addGoal,
    removeGoal,
  };

  return (
    <GoalDataContext.Provider value={value}>
      {children}
    </GoalDataContext.Provider>
  );
}
