<View
  style={{
    // flex: 1,
    height: 40,
    borderBottomColor: "grey",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <View
    style={{
      flex: 2,
    }}
  ></View>
  {/* <DataTable.Cell style={{ flex: 2 }}></DataTable.Cell> */}
  <View
    style={{
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    }}
  >
    <TextInput
      dense="true"
      mode="outlined"
      placeholder=""
      style={{ backgroundColor: "transparent", height: 30 }}
      onChangeText={onChangeWeight}
      value={Weight}
    />
  </View>

  <View
    style={{
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    }}
  >
    {/* <View style={{ marginTop: 20 }}> */}
    <TextInput
      dense="false"
      mode="outlined"
      placeholder=""
      onChangeText={onChangeReps}
      value={Reps}
      style={{
        backgroundColor: "transparent",
        height: 30,
      }}
    />
    {/* </View> */}
  </View>
  <View
    style={{
      alignItems: "flex-start",
      flex: 1,
      justifyContent: "flex-start",
    }}
  >
    <Button title="+" onPress={addSet} />
  </View>
</View>;
