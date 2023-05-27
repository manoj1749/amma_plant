import Toast from "react-native-toast-message";
import { checkPasswordValidation, emailValidate } from "./fieldValidation";
export const formValidation = (state, setState) => {
  const {
    fullName,
    selectId,
    idNumber,
    password,
    confirmPassword,
    email,
    mobile,
  } = state;
  if (
    fullName === "" &&
    email === "" &&
    idNumber === "" &&
    confirmPassword === "" &&
    password === "" &&
    mobile === "" &&
    selectId === ""
  ) {
    Toast.show({
      type: "WarningToast",
      text1: "Please fill all fields",
    });
    setState((prev) => ({
      ...prev,
      isErr: {
        fullName: true,
        email: true,
        mobile: true,
        password: true,
        idNumber: true,
        selecteId: true,
        confirmPassword: true,
      },
    }));
  }
  //   if (password !== "" && confirmPassword !== "") {
  //     const message = checkPasswordValidation(password);
  //     console.log(message);
  //     if (message) {
  //       Toast.show({
  //         type: "WarningToast",
  //         text1: message,
  //       });
  //       setState((prev) => ({
  //         ...prev,
  //         isErr: {
  //           password: true,
  //           confirmPassword: true,
  //         },
  //       }));
  //     } else if (password !== confirmPassword) {
  //       Toast.show({
  //         type: "WarningToast",
  //         text1: "Password is not match",
  //       });
  //       setState((prev) => ({
  //         ...prev,
  //         isErr: {
  //           password: true,
  //           confirmPassword: true,
  //         },
  //       }));
  //     }
  //   }
  //   if (password === "" && confirmPassword === "") {
  //     Toast.show({
  //       type: "WarningToast",
  //       text1: "please enter password",
  //     });
  //     setState((prev) => ({
  //       ...prev,
  //       isErr: {
  //         password: true,
  //         confirmPassword: true,
  //       },
  //     }));
  //   }
  //   if (email !== "") {
  //     const isNotValidEmail = emailValidate(email);
  //     if (isNotValidEmail) {
  //       setState((prev) => ({
  //         ...prev,
  //         isErr: {
  //           email: true,
  //         },
  //       }));
  //     }
  //   }
  //   if (fullName === "") {
  //     Toast.show({
  //       type: "WarningToast",
  //       text1: "Please enter your full name",
  //     });
  //   } else if (email === "") {
  //     Toast.show({
  //       type: "WarningToast",
  //       text1: "Please enter your email",
  //     });
  //   } else if (mobile === "") {
  //     Toast.show({
  //       type: "WarningToast",
  //       text1: "Please enter Your mobile number",
  //     });
  //   } else if (selectId === "") {
  //     Toast.show({
  //       type: "WarningToast",
  //       text1: "Please select Your id proof",
  //     });
  //   } else if (idNumber === "") {
  //     Toast.show({
  //       type: "WarningToast",
  //       text1: "Please enter your id number",
  //     });
  //   } else if (password === "" || confirmPassword === "") {
  //     Toast.show({
  //       type: "WarningToast",
  //       text1: "Please enter your password",
  //     });
  //   } else if (password === confirmPassword) {
  //     const error = checkPasswordValidation(password);
  //     Toast.show({
  //       type: "WarningToast",
  //       text1: error,
  //     });
  //   }
};
