import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import { CommonColor } from "../constants/colors";
import { Avatar } from "react-native-paper";
import CommonInput from "../components/common/commonInput";
import { OraganizationDetails, ProofOptions } from "../data/userGroupData";
import CommonButton from "../components/common/CommonButton";
import { avatarBoy, plant1 } from "../constants/image";
import CommonModal from "../components/common/commonModal";
import Icon, { Icons } from "../constants/Icons";
import useAadharVerify from "../hooks/useAadharVerifyHook";
import Toast from "react-native-toast-message";
import { formValidation } from "../helpers/validationForm";
import withCameraAndLibrary from "../HOC/withCameraAndLibrary";
import { useKeyboardVisible } from "../hooks/useKeyBoardVisible";
const intailState = () => {
  return {
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    idNumber: "",
    selectId: "",
    isErr: {
      fullName: false,
      email: false,
      mobile: false,
      password: false,
      idNumber: false,
      selectId: false,
      confirmPassword: false,
    },
    isEditEnable: {
      password: false,
      idNumber: false,
      selectId: false,
      confirmPassword: false,
    },
  };
};

const OrganizationLogin = ({ isRegisterUser, setOpenCamera, imageUri }) => {
  const [state, setState] = React.useState(intailState());
  const isKeyboardVisible = useKeyboardVisible();
  console.log(isKeyboardVisible);
  const {
    fullName,
    openPopup,
    selectId,
    idNumber,
    password,
    confirmPassword,
    email,
    mobile,
    isErr,
    isEditEnable,
    // openCamera,
    extendView,
  } = state;
  const styles = styling({ isRegisterUser, isKeyboardVisible });
  const [validate] = useAadharVerify();
  React.useEffect(() => {
    if (selectId !== "") {
      console.log(selectId);
      setState((prev) => ({
        ...prev,
        idNumber: "",
        password: "",
        confirmPassword: "",
        isEditEnable: {
          ...isEditEnable,
          idNumber: true,
          password: false,
          confirmPassword: false,
        },
      }));
    }
  }, [selectId]);
  // function for change the input value and store that value in state
  const handleChange = (name) => (event) => {
    event.persist();
    setState((prev) => ({
      ...prev,
      [name]: event?.nativeEvent?.text,
      isErr: {
        ...isErr,
        [name]: false,
      },
    }));

    console.log(event?.nativeEvent);
  };
  // function for open the popup whenever clicks the proofe dropdown
  const onHandleOpen = () => {
    setState((prev) => ({
      ...prev,
      openPopup: true,
    }));
  };
  // function for select the proof inside the popup
  const onSelectIdProof = (name) => {
    setState((prev) => ({
      ...prev,
      selectId: name,
    }));
    handleClosePopUp();
  };
  // function for close the popup
  const handleClosePopUp = () => {
    setState((prev) => ({
      ...prev,
      openPopup: false,
      // openCamera: false,
    }));
  };
  // verify given id proof
  const onVerifyIdProof = () => {
    if (idNumber === "") {
      setState((prev) => ({
        ...prev,
        isErr: {
          ...isErr,
          isNumber: true,
        },
      }));
    } else {
      if (validate(idNumber)) {
        setState((prev) => ({
          ...prev,
          isErr: {
            ...isErr,
            isNumber: true,
          },
          isEditEnable: {
            ...isEditEnable,
            password: true,
            confirmPassword: true,
          },
        }));

        Toast.show({
          type: "SuccessToast",
          text1: "Aadhar number is valid",
        });
      } else {
        Toast.show({
          type: "ErrorToast",
          text1: "Aadhar number is Not valid",
        });
      }
    }

    //     async function verify() {
    //       if (validate(aadharNo)) {
    //         const url =
    //           "https://verifyaadhaarnumber.p.rapidapi.com/Uidverifywebsvcv1/VerifyAadhaarNumber";
    //         const options = {
    //           method: "POST",
    //           headers: {
    //             "content-type": "application/x-www-form-urlencoded",
    //             "X-RapidAPI-Key":
    //               "03a50cb11fmshe97ad051225bf61p10eec7jsn508191520a47",
    //             "X-RapidAPI-Host": "verifyaadhaarnumber.p.rapidapi.com",
    //           },
    //           body: new URLSearchParams({
    //             txn_id: "17c6fa41-778f-49c1-a80a-cfaf7fae2fb8",
    //             consent: "Y",
    //             uidnumber: aadharNo,
    //             clientid: "222",
    //             method: "uidvalidatev2",
    //           }),
    //         };

    //         try {
    //           const response = await fetch(url, options);
    //           const result = await response.text();
    //           setErr("Your aadhar card no. valid");
    // return result
    //         } catch (error) {
    //           console.error(error);
    //         }
    //       } else {
    //         setErr("Your aadhar card no. not valid");
    //       }
    //     }
  };
  const enableEditInput = () => {
    if (selectId !== "") {
    }
  };
  const ValidationFrom = () => {
    formValidation(state, setState);

    if (password !== confirmPassword) {
      setState((prev) => ({
        ...prev,
        isErr: {
          ...isErr,
          password: true,
          confirmPassword: true,
        },
      }));
    } else if (idNumber !== "") {
      setState((prev) => ({
        ...prev,
        isErr: {
          ...isErr,
          isNumber: true,
        },
      }));
    } else {
    }
  };
  const handleOnSignUp = () => {
    console.log(state);
    ValidationFrom();
  };
  const filterOraganizationDetails = () => {
    return OraganizationDetails.filter((item) => {
      if (!isRegisterUser) {
        return item.isOrganization === true;
      } else return item;
    });
  };

  return (
    <ImageBackground source={plant1} style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={styles.subContainer}>
          {!isKeyboardVisible && (
            <View
              style={{
                position: "absolute",
                left: 140,
                top: "-7%",
                elevation: 30,
              }}
            >
              <Pressable
                onPress={() => {
                  setOpenCamera(true);
                }}
              >
                <Avatar.Image
                  size={110}
                  source={imageUri.length === 0 ? avatarBoy : { uri: imageUri }}
                  style={{
                    elevation: 10,
                    backgroundColor: CommonColor.secondary,
                  }}
                />
              </Pressable>
            </View>
          )}

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{
              flex: 0.1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.loginCard}>
              {filterOraganizationDetails().map(
                ({
                  id,
                  lable,
                  rightText,
                  rigthSource,
                  passwordInput,
                  leftSource,
                  name,
                  keyboardType,
                }) => {
                  return (
                    <CommonInput
                      key={id}
                      leftSource={leftSource}
                      placeholder={lable}
                      rightSideText={rightText}
                      rightSource={rigthSource}
                      passwordInput={passwordInput}
                      name={name}
                      onChange={handleChange(name)}
                      onRightPress={onHandleOpen}
                      isEditable={!isRegisterUser ? true : isEditEnable[name]}
                      value={state[name]}
                      onTextPress={onVerifyIdProof}
                      keyboardType={keyboardType}
                      isErr={isErr[name]}
                      onFocus={() =>
                        setState((prev) => ({
                          ...prev,
                          extendView: true,
                        }))
                      }
                    />
                  );
                }
              )}
              <CommonButton title={"Sign Up"} onPress={handleOnSignUp} />
            </View>
          </KeyboardAvoidingView>
        </View>
        {openPopup && (
          <CommonModal
            isVisible={openPopup}
            onClose={handleClosePopUp}
            children={
              <View style={styles.card}>
                <View style={{ flex: 0.3, justifyContent: "center" }}>
                  <Text style={styles.cardHeading}>Select Proof</Text>
                </View>

                <View
                  style={{
                    flex: 0.7,
                    justifyContent: "flex-start",
                  }}
                >
                  {ProofOptions.map(({ name, id }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => onSelectIdProof(name)}
                        style={styles.cardlist}
                        key={id}
                      >
                        <Text style={styles.cardTitle}>{name}</Text>
                        {selectId === name && (
                          <Icon
                            type={Icons.Feather}
                            name={"check"}
                            color={CommonColor.primary}
                            size={25}
                            style={{ marginRight: 50 }}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            }
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default withCameraAndLibrary(OrganizationLogin);

const styling = ({ isRegisterUser, isKeyboardVisible }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
    },

    subContainer: {
      flex: isRegisterUser ? (isKeyboardVisible ? 1 : 0.9) : 0.8,
      width: "100%",
      backgroundColor: CommonColor.secondary,
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      shadowColor: "#fff",
      elevation: 15,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
      position: "relative",
    },
    loginCard: {
      alignItems: "center",
      marginTop: 0,
    },
    card: {
      flex: 0.4,
      backgroundColor: CommonColor.secondary,
      borderRadius: 30,
      marginHorizontal: 15,
    },
    cardHeading: {
      marginHorizontal: 20,
      padding: 5,
      color: CommonColor.primary,
      fontWeight: "500",
      fontSize: 15,
    },
    cardTitle: {
      padding: 5,
      fontSize: 20,
      fontWeight: "bold",
      marginHorizontal: 20,
      color: CommonColor.textColor,
    },
    cardlist: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
