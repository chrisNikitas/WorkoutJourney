import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MyButton from "../../components/global/MyButton";
import globalStyle from "../../components/global/globalStyle";
import GoalItem from "../../components/profile/GoalItem";
import { GoalDataContext } from "../../store/GoalData";

export default function ProfileScreen({ navigation, route }) {
  const [goals, setGoals] = useState([]);

  const goalDataContext = useContext(GoalDataContext);

  useEffect(() => {
    goalDataContext.getGoals().then((gs) => {
      setGoals(gs);
    });
  }, [goalDataContext.goals]);

  const removeGoal = (goal) => {
    goalDataContext.removeGoal(goal);
  };

  const MainContent = () => {
    if (goals && goals.length != 0) {
      return (
        <>
          <Text style={globalStyle.explanatoryText}>
            Long press on one of your goals to remove it
          </Text>
          <FlatList
            data={goals}
            renderItem={(itemData) => (
              <GoalItem removeGoal={removeGoal} goal={itemData.item} />
            )}
          />
        </>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            // justifyContent: "flex-end",
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={globalStyle.emptyPageText}
            >
              {
                "Is there anything your are working to achieve? \nPopulate this screen with your training goals."
              }
            </Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      );
    }
  };

  return (
    <>
      <MainContent />
      <MyButton
        title="Add a goal"
        onPress={() => navigation.navigate("NewGoalScreen")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  inputText: {
    padding: 8,
    flex: 5,
  },
  inputValue: {
    flex: 1,
    padding: 8,
  },
  input_empty: {
    backgroundColor: "lightgrey",
    borderRadius: 5,
    borderWidth: 0,
  },
  input_filled: {
    backgroundColor: "white",
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 0.5,
  },
  mainContent: {
    // backgroundColor: "lightgrey",
    paddingTop: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectExercise: {
    padding: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    zIndex: -1,
    flex: 1,
    width: "80%",
    marginLeft: " 10%",
    marginRight: "10%",
  },
  textContainer: {
    width: "90%",
    justifyContent: "center",
    flex: 1,
  },
});
