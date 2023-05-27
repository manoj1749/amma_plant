import Toast from "react-native-toast-message";
export const emailValidate = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(email) === false) {
    Toast.show({
      type: "WarningToast",
      text1: "Email format is wrong",
    });
  }
  return false;
};
export const mobilevalidate = (number) => {
  const reg = /^[0]?[789]\d{9}$/;
  if (reg.test(text) === false) {
    Toast.show({
      type: "WarningToast",
      text1: "Please enter Number",
    });
  }
  return false;
};
export function checkPasswordValidation(value) {
  console.log(value);
  const isWhitespace = /^(?=.*\s)/;
  let message =
    "Password must has a at least 6-10 characters that include at least 1 lowercase,1 uppercase,1number and 1 special character in (!@#$%^&*)";
  if (isWhitespace.test(value)) {
    return message;
  }

  const isContainsUppercase = /^(?=.*[A-Z])/;
  if (!isContainsUppercase.test(value)) {
    return message;
  }

  const isContainsLowercase = /^(?=.*[a-z])/;
  if (!isContainsLowercase.test(value)) {
    return message;
  }

  const isContainsNumber = /^(?=.*[0-9])/;
  if (!isContainsNumber.test(value)) {
    return message;
  }

  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  if (!isContainsSymbol.test(value)) {
    return message;
  }

  const isValidLength = /^.{8,10}$/;
  if (!isValidLength.test(value)) {
    return message;
  }
  return false;
}
