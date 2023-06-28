useEffect(() => {
  workoutDataContext
    .getAllWorkouts()
    .then((allWorkouts) => {
      setData(allWorkouts);
      totalVolumes = [];
      allSpecificVolumes = [];
      dates = [];

      allWorkouts.forEach((exerciseSession) => {
        totalVolume = 0;
        exerciseSession["exerciseData"].forEach((ex) => {
          totalVolume += ex.volume;
        });

        LocalStore.getData("goals")
          .then((gs) => {
            specificVolumesPerGoal = [];
            gs.forEach((g) => {
              specificVolume = calculateSessionSpecificVolumeVsGoal(
                exerciseSession,
                g
              );

              specificVolumesPerGoal.push(specificVolume);
            });
            console.log(specificVolumesPerGoal);
            return specificVolumesPerGoal;
          })
          .then((specificVolumesPerGoal) => {});
        // allSpecificVolumes.push(specificVolumes);
        date = exerciseSession["timeData"]["startTime"];

        totalVolumes.push(totalVolume);
        specificVolumes.push(specificVolume);
        dates.push(new Date(date));
      });
      // const dataVar = dates.map((x, i) => ({ x, y: totalVolumes[i] }));
      // console.log("Date: ", dates);
      setTickValues(dates);
      console.log();
      console.log();
      console.log();
      console.log();
      console.log("SVOLs  in GoalSpecScreen: ", specificVolumes);
      setBarGraphData(
        dates.map((x, i) => ({
          date: new Date(x),
          yTotal: totalVolumes[i],
          // add another y, to show specific volume
          ySpecific: specificVolumes[i],
          x: i + 1,
        }))
      );
      setLoading(false);
    })
    .catch((error) => {
      console.log("Rejection");
      console.log(error);
    });
}, [useIsFocused()]);
