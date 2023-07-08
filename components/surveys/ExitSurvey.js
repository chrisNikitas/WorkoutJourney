import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Text, TextInput, useTheme } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import MyButton from "../global/MyButton";
import { Slider } from "@miblanchard/react-native-slider";
import * as RootNavigation from "../../RootNavigation";

import * as LocalStore from "../../store/LocalStore";

const ExitSurvey = ({ navigation }) => {
  const [openPicker, setOpenPicker] = useState(null);

  const [features, setFeatures] = useState([
    { label: "Volumes Bar Graph", value: "volume-graph" },
    { label: "Specific Pie Graph", value: "pie-graph" },
    { label: "History Page", value: "history" },
    { label: "Goal Page", value: "goal" },
    { label: "Other (Please Specify)", value: "other" },
  ]);

  const [q5Options, setQ5Options] = useState([
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ]);

  const [q1, setQ1] = useState();
  const [q2, setQ2] = useState();
  const [q3, setQ3] = useState();
  const [q3Other, setQ3Other] = useState();
  const [q4, setQ4] = useState();
  const [q4Other, setQ4Other] = useState();
  const [q5, setQ5] = useState();
  const [q6, setQ6] = useState();
  const [q7, setQ7] = useState();
  const [q8, setQ8] = useState();
  const [q9, setQ9] = useState();

  const [sus, setSus] = useState([3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);

  const theme = useTheme();

  const noEmptyFields = () => {
    if (
      q1 &&
      q2 &&
      q3 &&
      (q3 == "other" ? (q3Other ? true : false) : true) &&
      q4 &&
      (q4 == "other" ? (q4Other ? true : false) : true) &&
      q5 &&
      (q5 == "yes" ? (q6 && q7 && q8 ? true : false) : true) &&
      q9
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
    let answers = {
      q1: q1,
      q2: q2,
      q3: q3,
      q3Other: q3Other,
      q4: q4,
      q4Other: q4Other,
      q5: q5,
      q6: q6,
      q7: q7,
      q8: q8,
      q9: q9,
    };
    LocalStore.storeData("exitQuestionnaire", answers);
    LocalStore.storeData("exitQuestionnaireDone", true);

    console.log("Sent!");
    RootNavigation.navigate("MainContent");
  };

  const addSUSValue = (value, index) => {
    newSus = sus.map((v, i) => {
      if (i == index) return value;
      else return v;
    });
    // console.log(newSus);
    setSus(newSus);
  };

  const onOpenPicker = (id) => {
    console.log("Called");
    setOpenPicker(id);
  };
  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>App Feedback</Text>

          <Text style={styles.question}>
            How was your overall experience with the application?
          </Text>
          <TextInput
            style={styles.answerField}
            onChangeText={(value) => {
              setQ1(value);
            }}
            keyboardType="default"
          />

          <Text style={styles.question}>When did you use the application?</Text>
          <TextInput
            style={styles.answerField}
            onChangeText={(value) => {
              setQ2(value);
            }}
            keyboardType="default"
          />

          <Text style={styles.question}>What was your favourite feature?</Text>
          <View style={{ zIndex: 10000 }}>
            <DropDownPicker
              dropDownDirection={"BOTTOM"}
              listMode="SCROLLVIEW"
              placeholder="Select feature"
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
              open={openPicker == "q3"}
              value={q3}
              items={features}
              onOpen={() => onOpenPicker("q3")}
              onClose={() => onOpenPicker(null)}
              setValue={setQ3}
            />
          </View>
          {q3 == "other" && (
            <TextInput
              style={styles.answerField}
              onChangeText={(value) => {
                setQ3Other(value);
              }}
              keyboardType="default"
            />
          )}

          <Text style={styles.question}>
            What was your least favourite feature?
          </Text>
          <View style={{ zIndex: 9000 }}>
            <DropDownPicker
              dropDownDirection={"BOTTOM"}
              listMode="SCROLLVIEW"
              placeholder="Select feature"
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
              open={openPicker == "q4"}
              value={q4}
              items={features}
              onOpen={() => onOpenPicker("q4")}
              onClose={() => onOpenPicker(null)}
              setValue={setQ4}
            />
          </View>
          {q4 == "other" && (
            <TextInput
              style={styles.answerField}
              onChangeText={(value) => {
                setQ4Other(value);
              }}
              keyboardType="default"
            />
          )}

          <Text style={styles.question}>Were any factor identified?</Text>
          <View style={{ zIndex: 8000 }}>
            <DropDownPicker
              dropDownDirection={"BOTTOM"}
              listMode="SCROLLVIEW"
              placeholder="Yes/No"
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
              open={openPicker == "q5"}
              value={q5}
              items={q5Options}
              onOpen={() => onOpenPicker("q5")}
              onClose={() => onOpenPicker(null)}
              setValue={setQ5}
            />
          </View>
          {q5 == "yes" && (
            <>
              <Text style={styles.question}>
                Do you think that knowing that is a factor helps you achieve
                your goals?
              </Text>
              <TextInput
                style={styles.answerField}
                onChangeText={(value) => {
                  setQ6(value);
                }}
                keyboardType="default"
              />

              <Text style={styles.question}>
                How did you use the app to identify any factors?
              </Text>
              <TextInput
                style={styles.answerField}
                onChangeText={(value) => {
                  setQ7(value);
                }}
                keyboardType="default"
              />

              <Text style={styles.question}>
                Have you been able to make any changes to your training routine
                based on the insights provided by the app? If yes, what changes
                have you made?
              </Text>
              <TextInput
                style={styles.answerField}
                onChangeText={(value) => {
                  setQ8(value);
                }}
                keyboardType="default"
              />
            </>
          )}
          <Text style={styles.question}>
            What would you change or add to the app?
          </Text>
          <TextInput
            style={styles.answerField}
            onChangeText={(value) => {
              setQ9(value);
            }}
            keyboardType="default"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>SUS</Text>
          <Text style={{ fontSize: 20, padding: 6, fontWeight: 700 }}>
            Answer the following questions on a 1-5 scale, 1 being strongly
            disagree, and 5 being strongly agree
          </Text>

          <Text style={styles.question}>
            I think that I would like to use this system frequently.
          </Text>
          <Text style={styles.sliderVal}>{sus[0]}</Text>
          <Slider
            value={sus[0]}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={([value]) => {
              addSUSValue(value, 0);
            }}
          />

          <Text style={styles.question}>
            I found the system unnecessarily complex.
          </Text>
          <Text style={styles.sliderVal}>{sus[1]}</Text>
          <Slider
            value={sus[1]}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={([value]) => {
              addSUSValue(value, 1);
            }}
          />

          <Text style={styles.question}>
            I thought the system was easy to use.
          </Text>
          <Text style={styles.sliderVal}>{sus[2]}</Text>
          <Slider
            value={sus[2]}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={([value]) => {
              addSUSValue(value, 2);
            }}
          />

          <Text style={styles.question}>
            I think that I would need the support of a technical person to be
            able to use this system.
          </Text>
          <Text style={styles.sliderVal}>{sus[3]}</Text>
          <Slider
            value={sus[3]}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={([value]) => {
              addSUSValue(value, 3);
            }}
          />

          <Text style={styles.question}>
            I found the various functions in this system were well integrated.
          </Text>
          <Text style={styles.sliderVal}>{sus[4]}</Text>
          <Slider
            value={sus[4]}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={([value]) => {
              addSUSValue(value, 4);
            }}
          />

          <Text style={styles.question}>
            I thought there was too much inconsistency in this system.
          </Text>
          <Text style={styles.sliderVal}>{sus[5]}</Text>
          <Slider
            value={sus[5]}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={([value]) => {
              addSUSValue(value, 5);
            }}
          />

          <Text style={styles.question}>
            I would imagine that most people would learn to use this system very
            quickly.
          </Text>
          <Text style={styles.sliderVal}>{sus[6]}</Text>
          <Slider
            value={sus[6]}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={([value]) => {
              addSUSValue(value, 6);
            }}
          />

          <Text style={styles.question}>
            I found the system very cumbersome to use.
          </Text>
          <Text style={styles.sliderVal}>{sus[7]}</Text>
          <Slider
            value={sus[7]}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={([value]) => {
              addSUSValue(value, 7);
            }}
          />

          <Text style={styles.question}>
            I felt very confident using the system.
          </Text>
          <Text style={styles.sliderVal}>{sus[8]}</Text>
          <Slider
            value={sus[8]}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={([value]) => {
              addSUSValue(value, 8);
            }}
          />

          <Text style={styles.question}>
            I needed to learn a lot of things before I could get going with this
            system.
          </Text>
          <Text style={styles.sliderVal}>{sus[9]}</Text>
          <Slider
            value={sus[9]}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={([value]) => {
              addSUSValue(value, 9);
            }}
          />
        </View>
        <MyButton title={"Submit"} onPress={submitSurvey}></MyButton>
      </ScrollView>
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
  answerField: { colorzIndex: -1 },
  sliderVal: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default ExitSurvey;
