import { StyleSheet, Text, View } from "react-native";
import React, { Children } from "react";
import ReactNativeModal from "react-native-modal";
import { CommonColor } from "../../constants/colors";

const CommonModal = ({ isVisible, onClose, children, isBottom }) => {
  const styles = styling({ isBottom });
  console.log(isBottom);
  return (
    <ReactNativeModal
      isVisible={isVisible}
      swipeDirection="down"
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      {children}
    </ReactNativeModal>
  );
};

export default CommonModal;

const styling = ({ isBottom }) =>
  StyleSheet.create({
    modal: {
      justifyContent: isBottom ? "flex-end" : "center",
      marginBottom: 50,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
  });
