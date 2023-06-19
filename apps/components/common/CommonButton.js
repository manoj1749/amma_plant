import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { CommonColor } from "../../constants/colors";

const CommonButton = ({
  type,
  title,
  navigation,
  name,
  onPress,
  rightSource,
  leftSource,
  size,
  disabled,
}) => {
  const styles = styling({ type, size, disabled });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disabled}
      >
        {leftSource && <Image source={leftSource} style={styles.leftIcon} />}
        {rightSource && <Image source={rightSource} style={styles.right} />}
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommonButton;

const styling = ({ type, size, disabled }) =>
  //   console.log(type);
  StyleSheet.create({
    container: {
      width: size === "small" ? 150 : 250,
      height: 44,
      backgroundColor: disabled
        ? "grey"
        : type === "lightbtn"
        ? CommonColor.textColorLight
        : CommonColor.primary,
      borderRadius: 30,
      color: CommonColor.textColorLight,
      borderWidth: type === "lightbtn" ? 1 : 0,
      borderColor: type === "lightbtn" ? CommonColor.primary : "transparent",
      shadowColor: "#00000020",
      elevation: 25,
      marginVertical: 15,
    },
    button: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    text: {
      color:
        type === "lightbtn"
          ? CommonColor.primaryText
          : CommonColor.primaryLight,
      fontFamily: "Poppins",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: size === "small" ? 12 : 15,
      marginLeft: 10,
    },
    leftIcon: {
      position: "absolute",
      top: 9,
      left: 10,
      //   paddingHorizontal: 8,
    },
    right: {
      position: "absolute",
      top: 15,
      right: 10,
      //   paddingHorizontal: 8,
    },
  });
