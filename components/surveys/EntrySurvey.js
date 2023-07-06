import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as RootNavigation from "../../RootNavigation";
import * as LocalStore from "../../store/LocalStore";

import { useState } from "react";
import { Text, TextInput, useTheme } from "react-native-paper";

import DropDownPicker from "react-native-dropdown-picker";
import MyButton from "../global/MyButton";

const EntrySurvey = () => {
  const [openPicker, setOpenPicker] = useState(null);

  const [genders, setGenders] = useState([
    { label: "Woman", value: "woman" },
    { label: "Man", value: "man" },
    { label: "Non-Binary", value: "non-binary" },
    { label: "Prefer not to disclose", value: "prefer-not-disclose" },
    { label: "Prefer not to self-describe", value: "prefer-not-self-describe" },
  ]);

  const [q1Options, setQ1Options] = useState([
    { label: "less than 1 year", value: "<1y" },
    { label: "1 year - 2 years", value: "1 - 2y" },
    { label: "more than 2 years", value: "> 2y" },
  ]);

  const [q2Options, setQ2Options] = useState([
    { label: "Bodybuilding", value: "bodybuilding" },
    { label: "Powerlifting", value: "powerlifting" },
    { label: "Calisthenics", value: "calisthenics" },
    { label: "Olympic Weightlifting", value: "olympic" },
    { label: "Other (Please Specify)", value: "other" },
  ]);

  const [q3Options, setQ3Options] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "7+", value: "7+" },
  ]);
  const [q4Options, setQ4Options] = useState([
    { label: "Around 30 minutes", value: "30m" },
    { label: "30 minutes to an hour", value: "30m-1h" },
    { label: "1 hour to 1 and a half hours", value: "1h-1.5h" },
    { label: "1 and a half hours or more", value: "1.5h+" },
  ]);

  const [q5Options, setQ5Options] = useState([
    { label: "Full Body", value: "fb" },
    { label: "Push Pull Legs", value: "ppl" },
    { label: "Upper Lower", value: "ul" },
    { label: "Other (Please Specify)", value: "other" },
  ]);

  const [q6Options, setQ6Options] = useState([
    { label: "No", value: "no" },
    { label: "With an app", value: "app" },
    { label: "With a notebook", value: "notebook" },
    { label: "Other (Please Specify)", value: "other" },
  ]);

  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(0);
  const [q1, setQ1] = useState();
  const [q2, setQ2] = useState();
  const [q2Other, setQ2Other] = useState();
  const [q3, setQ3] = useState();
  const [q4, setQ4] = useState();
  const [q5, setQ5] = useState();
  const [q5Other, setQ5Other] = useState();
  const [q6, setQ6] = useState();
  const [q6Other, setQ6Other] = useState();
  const [q7, setQ7] = useState();
  const [q8, setQ8] = useState();

  const theme = useTheme();
  const noEmptyFields = () => {
    if (
      age &&
      gender &&
      q1 &&
      q2 &&
      (q2 == "other" ? (q2Other ? true : false) : true) &&
      q3 &&
      q4 &&
      q5 &&
      (q5 == "other" ? (q5Other ? true : false) : true) &&
      q6 &&
      (q6 == "other" ? (q6Other ? true : false) : true) &&
      q7 &&
      q8
    )
      return true;
    else {
      alert("Please complete all fields");
      return false;
    }
  };
  const submitSurvey = () => {
    if (!noEmptyFields()) return;
    // send to firebase
    console.log("Sent!");
    let answers = {
      age: age,
      gender: gender,
      q1: q1,
      q2: q2,
      q2Other: q2Other,
      q3: q3,
      q4: q4,
      q5: q5,
      q6: q6,
      q7: q7,
      q8: q8,
    };
    LocalStore.storeData("entryQuestionnaire", answers);
    LocalStore.storeData("entryQuestionnaireDone", true);
    RootNavigation.navigate("MainContent");
  };

  const onOpenPicker = (id) => {
    console.log("Called");
    setOpenPicker(id);
  };

  return (
    <>
      {/* <ScrollView> */}
      {/* <KeyboardAvoidingView behavior="position"> */}
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.section, { zIndex: 10 }]}>
          <Text style={styles.sectionHeading}>Demographic Questions</Text>

          <Text style={styles.question}>Gender</Text>
          <View style={{ zIndex: 10000 }}>
            <DropDownPicker
              dropDownDirection={"BOTTOM"}
              zIndex={100000}
              zIndexInverse={40000}
              listMode="SCROLLVIEW"
              placeholder="Select your gender"
              containerStyle={styles.factorTypeContainer}
              style={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              dropDownContainerStyle={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              textStyle={{ textAlign: "center" }}
              open={openPicker == "gender"}
              value={gender}
              items={genders}
              onOpen={() => onOpenPicker("gender")}
              onClose={() => onOpenPicker(null)}
              setValue={setGender}
            />
          </View>
          <Text style={styles.question}>Age</Text>
          <TextInput
            style={styles.answerField}
            onChangeText={(value) => {
              setAge(value);
            }}
            keyboardType="numeric"
          ></TextInput>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Workout Related Questions</Text>

          <Text style={styles.question}>
            How long have you been performing resistance training? (This
            includes activities such as bodybuilding, powerlifting,
            calisthenics, Olympic weightlifting and any that involve contracting
            a muscle under resistance)
          </Text>
          <View style={{ zIndex: 9000 }}>
            <DropDownPicker
              dropDownDirection={"BOTTOM"}
              zIndex={90000}
              listMode="SCROLLVIEW"
              placeholder="Select a time period"
              containerStyle={styles.factorTypeContainer}
              style={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              dropDownContainerStyle={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              textStyle={{ textAlign: "center" }}
              open={openPicker == "q1"}
              value={q1}
              items={q1Options}
              onOpen={() => onOpenPicker("q1")}
              onClose={() => onOpenPicker(null)}
              setValue={setQ1}
            />
          </View>

          <Text style={styles.question}>
            What type of resistance training do you mainly perform
            (bodybuilding, powerlifting, calisthenics, Olympic weightlifting).
            It doesn't have to be any specific sport, you can also just say
            “weight-lifting at the gym”.
          </Text>
          <View style={{ zIndex: 8000 }}>
            <DropDownPicker
              dropDownDirection={"BOTTOM"}
              zIndexInverse={50000}
              zIndex={80000}
              listMode="SCROLLVIEW"
              placeholder="Select a type of resistence training"
              containerStyle={styles.factorTypeContainer}
              style={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              dropDownContainerStyle={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              textStyle={{ textAlign: "center" }}
              open={openPicker == "q2"}
              value={q2}
              items={q2Options}
              onOpen={() => onOpenPicker("q2")}
              onClose={() => onOpenPicker(null)}
              setValue={setQ2}
            />
          </View>
          {q2 == "other" && (
            <TextInput
              style={styles.answerField}
              onChangeText={(value) => {
                setQ2Other(value);
              }}
              keyboardType="default"
            />
          )}

          <Text style={styles.question}>
            How many times a week do resistance training?
          </Text>
          <View style={{ zIndex: 7000 }}>
            <DropDownPicker
              dropDownDirection={"BOTTOM"}
              zIndex={70000}
              zIndexInverse={60000}
              listMode="MODAL"
              placeholder="Select how many times a week"
              // containerStyle={{ maxHeight: 1500 }
              style={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              dropDownContainerStyle={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              textStyle={{ textAlign: "center" }}
              open={openPicker == "q3"}
              value={q3}
              items={q3Options}
              onOpen={() => onOpenPicker("q3")}
              onClose={() => onOpenPicker(null)}
              setValue={setQ3}
            />
          </View>

          <Text style={styles.question}>
            How long does each workout last approximately?
          </Text>
          <View style={{ zIndex: 6000 }}>
            <DropDownPicker
              dropDownDirection={"BOTTOM"}
              zIndex={60000}
              zIndexInverse={70000}
              listMode="SCROLLVIEW"
              placeholder="Select time"
              // containerStyle={{ maxHeight: 1500 }
              style={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              dropDownContainerStyle={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              textStyle={{ textAlign: "center" }}
              open={openPicker == "q4"}
              value={q4}
              items={q4Options}
              onOpen={() => onOpenPicker("q4")}
              onClose={() => onOpenPicker(null)}
              setValue={setQ4}
            />
          </View>

          <Text style={styles.question}>
            What split do you do? (eg. Full-body, Upper-Lower, Push-Pull-Legs){" "}
          </Text>
          <View style={{ zIndex: 5000 }}>
            <DropDownPicker
              dropDownDirection={"BOTTOM"}
              listMode="SCROLLVIEW"
              placeholder="Select time"
              // containerStyle={{ maxHeight: 1500 }
              style={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              dropDownContainerStyle={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              textStyle={{ textAlign: "center" }}
              open={openPicker == "q5"}
              value={q5}
              items={q5Options}
              onOpen={() => onOpenPicker("q5")}
              onClose={() => onOpenPicker(null)}
              setValue={setQ5}
            />
          </View>
          {q5 == "other" && (
            <TextInput
              style={styles.answerField}
              onChangeText={(value) => {
                setQ5Other(value);
              }}
              keyboardType="default"
            />
          )}

          <Text style={styles.question}>
            Do you record your progress in any way?{" "}
          </Text>
          <View style={{ zIndex: 4000 }}>
            <DropDownPicker
              dropDownDirection={"BOTTOM"}
              zIndex={40000}
              zIndexInverse={90000}
              listMode="SCROLLVIEW"
              placeholder="Select answer"
              // containerStyle={{ maxHeight: 1500 }
              style={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              dropDownContainerStyle={[
                styles.dropdown,
                { backgroundColor: theme.colors.background },
              ]}
              textStyle={{ textAlign: "center" }}
              open={openPicker == "q6"}
              value={q6}
              items={q6Options}
              onOpen={() => onOpenPicker("q6")}
              onClose={() => onOpenPicker(null)}
              setValue={setQ6}
            />
          </View>
          {q6 == "other" && (
            <TextInput
              style={styles.answerField}
              onChangeText={(value) => {
                setQ6Other(value);
              }}
              keyboardType="default"
            />
          )}

          <Text style={styles.question}>Are you making progress?</Text>
          <TextInput
            style={styles.answerField}
            onChangeText={(value) => {
              setQ7(value);
            }}
            keyboardType="default"
          />

          <Text style={styles.question}>
            Do you think there is anything about your workouts that is
            slowing\barring progress?
          </Text>
          <TextInput
            style={styles.answerField}
            onChangeText={(value) => {
              setQ8(value);
            }}
            keyboardType="default"
          />
        </View>
        <MyButton title={"Submit"} onPress={submitSurvey}></MyButton>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}

      {/* </ScrollView> */}
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 0.5,
  },
  sectionHeading: { fontWeight: 700, fontSize: 30, padding: 5, zIndex: -1 },
  section: { borderBottomWidth: 1, paddingVertical: 10, zIndex: -1 },
  question: { zIndex: -1, padding: 10, fontSize: 20 },
  answerField: { zIndex: -1 },
});

export default EntrySurvey;
