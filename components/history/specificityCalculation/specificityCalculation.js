import * as LocalStore from "../../../store/LocalStore";
export const similarityOfExercises = (goalExercise, exercise) => {
  goalPrimaryMuscles = goalExercise.primaryMuscles;
  goalSecondaryMuscles = goalExercise.secondaryMuscles;

  ppmatches = exercise["primaryMuscles"].filter((muscle) =>
    goalPrimaryMuscles.includes(muscle)
  );
  psmatches = exercise["primaryMuscles"].filter((muscle) =>
    goalSecondaryMuscles.includes(muscle)
  );
  spmatches = exercise["secondaryMuscles"].filter((muscle) =>
    goalPrimaryMuscles.includes(muscle)
  );
  ssmatches = exercise["secondaryMuscles"].filter((muscle) =>
    goalSecondaryMuscles.includes(muscle)
  );

  // Volume Towards Current Goal is Calculated here
  similarityOfGoalToExercise =
    exercise.name == goalExercise.name
      ? 1
      : (ppmatches.length +
          (psmatches.length + spmatches.length) * 0.75 +
          ssmatches.length * 0.56) /
        (ppmatches.length +
          psmatches.length +
          spmatches.length +
          ssmatches.length);

  if (goalExercise.force != exercise.force)
    similarityOfGoalToExercise = similarityOfGoalToExercise / 4;

  similarityOfGoalToExercise = isNaN(similarityOfGoalToExercise)
    ? 0
    : similarityOfGoalToExercise;
  // Primary matches
  //   console.log(
  //     exercise.name +
  //       " similarity to goal " +
  //       goalExercise.name +
  //       ": " +
  //       similarityOfGoalToExercise
  //   );
  return similarityOfGoalToExercise;
};

export const calculateSessionSpecificVolume = (sessionData) => {
  return LocalStore.getData("goals").then((gs) => {
    gs.forEach((g) => {
      // for each goal
      goalPrimaryMuscles = g.exercise.primaryMuscles;
      goalSecondaryMuscles = g.exercise.secondaryMuscles;
      specificVolume = 0;
      sessionData["exerciseData"].forEach((ex) => {
        // for each exerise

        similarityOfGoalToExercise = similarityOfExercises(
          g.exercise,
          ex.exercise
        );

        specificVolume += ex.volume * similarityOfGoalToExercise;
      });
      return specificVolume;
    });
  });
};

export const calculateSessionSpecificVolumeVsGoal = (sessionData, goal) => {
  // for each goal
  goalPrimaryMuscles = goal.exercise.primaryMuscles;
  goalSecondaryMuscles = goal.exercise.secondaryMuscles;
  specificVolume = 0;
  sessionData["exerciseData"].forEach((ex) => {
    // for each exerise

    similarityOfGoalToExercise = similarityOfExercises(
      goal.exercise,
      ex.exercise
    );

    specificVolume += ex.volume * similarityOfGoalToExercise;
  });
  return specificVolume;
};
