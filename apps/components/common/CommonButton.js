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
}) => {
  const styles = styling(type);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {leftSource && <Image source={leftSource} style={styles.leftIcon} />}
        {rightSource && <Image source={rightSource} style={styles.right} />}
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommonButton;

const styling = (theme) =>
  //   console.log(theme);
  StyleSheet.create({
    container: {
      width: 250,
      height: 44,
      backgroundColor:
        theme === "lightbtn" ? CommonColor.textColorLight : CommonColor.primary,
      borderRadius: 30,
      color: CommonColor.textColorLight,
      borderWidth: theme === "lightbtn" ? 1 : 0,
      borderColor: theme === "lightbtn" ? CommonColor.primary : "transparent",
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
        theme === "lightbtn"
          ? CommonColor.primaryText
          : CommonColor.primaryLight,
      fontFamily: "Poppins",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    leftIcon: {
      position: "absolute",
      top: 7,
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
