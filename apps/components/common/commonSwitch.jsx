import React, { useState } from "react";

import { ActivityIndicator, Text, View, TouchableOpacity } from "react-native";

const CommonSwitch = ({
  selectionMode,
  option1,
  option2,
  selectionColor,
  isLoadingLocation,
  updatedSwitchData,
}) => {
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
            width: 84,
            backgroundColor: "white",
            borderRadius: 50,
            borderWidth: 1,
            borderColor: selectionColor,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {selectionMode === 0 && (
            <View
              style={{
                height: 21,
                width: 4,
                backgroundColor: "#C47A5E",
                borderRadius: 50,
                position: "absolute",
                zIndex: 5,
              }}
            />
          )}

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => updatedSwitchData(1)}
            style={{
              flex: 1,
              width: 40,
              height: "100%",
              backgroundColor: selectionMode === 1 ? selectionColor : "white",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              justifyContent: "center",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: selectionMode === 1 ? "white" : "#C47A5E",
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

              backgroundColor: "white",
              height: "100%",
              backgroundColor: selectionMode === 2 ? "#C47A5E" : "white",
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: selectionMode === 2 ? "white" : "#C47A5E",
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
