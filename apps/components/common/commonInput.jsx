import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import Icon, { Icons } from "../../constants/Icons";
import { CommonColor } from "../../constants/colors";

const CommonInput = ({
  rightSource,
  leftSource,
  placeholder,
  passwordInput,
  hide,
  value,
  onChange,
  rightSideText,
  onTextPress,
  isEditable,
  name,
  onRightPress,
  keyboardType,
  isErr,
  onFocus,
  placeholderTextColor,
}) => {
  const [isHide, setIsHide] = React.useState(false);
  const styles = styling({ isErr });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={passwordInput}
        onChange={onChange}
        name={name}
        editable={isEditable}
        value={value}
        keyboardType={keyboardType}
        onFocus={onFocus}
        placeholderTextColor={placeholderTextColor}
      />

      {leftSource && <Image source={leftSource} style={styles.leftIcon} />}
      {rightSource && (
        <TouchableOpacity
          style={styles.right}
          onPress={onRightPress}
          disabled={isEditable}
        >
          <Image source={rightSource} />
        </TouchableOpacity>
      )}
      {rightSideText && (
        <TouchableOpacity
          onPress={onTextPress}
          style={styles.right}
          disabled={!isEditable}
        >
          <Text style={styles.text}>
            {rightSideText ? rightSideText : hide ? "show" : "hide"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommonInput;

const styling = ({ isErr }) =>
  StyleSheet.create({
    container: {
      width: 250,
      height: 42,
      position: "relative",
      marginVertical: 10,
      borderRightWidth: isErr ? 5 : 0,
      borderColor: "red",
      borderRadius: 5,
    },
    input: {
      flex: 1,
      backgroundColor: "white",
      borderRadius: 5,
      paddingHorizontal: 40,
      fontWeight: "700",
      fontSize: 15,
      lineHeight: 15,
      elevation: 10,
      color: "black",
    },
    leftIcon: {
      position: "absolute",
      top: 10,
      left: 10,
    },
    right: {
      position: "absolute",
      top: 11,
      right: 10,
      alignItems: "center",
    },
    text: {
      color: CommonColor.primary,
      fontWeight: "900",
      fontSize: 10,
    },
  });
