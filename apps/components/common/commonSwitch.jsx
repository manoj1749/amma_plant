import React, { useState } from "react";

import { ActivityIndicator, Text, View, TouchableOpacity } from "react-native";

const CommonSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
  isLoadingLocation,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = (val) => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          color: "#C47A5E",
          fontWeight: "bold",
          marginHorizontal: 5,
          marginVertical: 10,
        }}
      >
        Live Location{" "}
      </Text>
      {isLoadingLocation ? (
        <ActivityIndicator size="small" color="#00ff00" />
      ) : (
        <View
          style={{
            height: 24,
            width: 64,
            backgroundColor: "white",
            borderRadius: getRoundCorner ? 20 : 0,
            borderWidth: 1,
            borderColor: selectionColor,
            flexDirection: "row",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => updatedSwitchData(1)}
            style={{
              flex: 1,

              backgroundColor: getSelectionMode == 1 ? selectionColor : "white",
              borderRadius: getRoundCorner ? 20 : 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: getSelectionMode == 1 ? "white" : selectionColor,
                fontSize: 10,
              }}
            >
              {option1}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            TouchableOpacity
            activeOpacity={1}
            onPress={() => updatedSwitchData(2)}
            style={{
              flex: 1,

              backgroundColor: getSelectionMode == 2 ? selectionColor : "white",
              borderRadius: getRoundCorner ? 20 : 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: getSelectionMode == 2 ? "white" : selectionColor,
                fontSize: 10,
              }}
            >
              {option2}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default CommonSwitch;
