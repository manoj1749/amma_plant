import {
  user,
  email,
  mobile,
  dropdown,
  lock,
  google,
  appleDark,
  contribute,
  sapliing,
  wallet,
  userOrange,
} from "../constants/image";
const userGroupData = [
  // {
  //   id: 1,
  //   title: "Normal User",
  // },
  {
    id: 1,
    title: "Register User",
  },
  {
    id: 2,
    title: "Oragainzation User",
  },
];
const LoginDetail = [
  {
    id: 1,
    lable: "email",
    leftSource: email,
    name: "email",
    keyboardType: "email-address",
  },
  {
    id: 2,
    lable: "Password",
    leftSource: lock,
    name: "password",
    rightText: true,
    passwordInput: true,
  },
];
const OraganizationDetails = [
  {
    id: 1,
    lable: "full name",
    leftSource: user,
    isOrganization: true,
    name: "fullName",
  },
  {
    id: 2,
    lable: "email",
    leftSource: email,
    isOrganization: true,
    name: "email",
    keyboardType: "email-address",
  },
  {
    id: 3,
    lable: "mobile",
    leftSource: mobile,
    isOrganization: true,
    name: "mobile",
    keyboardType: "phone-pad",
  },
  {
    id: 4,
    lable: "select id proof",
    rigthSource: dropdown,
    name: "selectId",
    subOptions: [
      { id: 1, lable: "Aadhar card" },
      { id: 2, lable: "Pan card" },
      { id: 3, lable: "Driving License" },
      { id: 4, lable: "Voter Id" },
    ],
  },
  {
    id: 5,
    lable: "enter id number",
    rightText: "Verify",
    name: "idNumber",
  },
  {
    id: 6,
    lable: "password",
    leftSource: lock,
    isOrganization: true,
    passwordInput: true,
    name: "password",
  },
  {
    id: 7,
    lable: "confirm password",
    leftSource: lock,
    rightText: true,
    isOrganization: true,
    passwordInput: true,
    name: "confirmPassword",
  },
];
const NormalUser = [
  {
    id: 1,
    title: "Sign in with Google",
    leftSource: google,
  },
  {
    id: 2,
    title: "Sign in with Apple",
    leftSource: appleDark,
  },
];

const ProofOptions = [
  {
    id: 1,
    name: "Aadhar Card",
  },
  // {
  //   id: 2,
  //   name: "PAN card",
  // },
  // {
  //   id: 3,
  //   name: "Voter ID",
  // },
  // {
  //   id: 4,
  //   name: "Driving License",
  // },
];
const userProfileDetails = [
  // {
  //   id: 1,
  //   title: "Contributor",
  //   leftSource: contribute,
  // },
  // {
  //   id: 2,
  //   title: "sapplings",
  //   leftSource: sapliing,
  // },
  {
    id: 1,
    title: "Wallet",
    leftSource: wallet,
  },
  {
    id: 2,
    title: "My Plant",
    leftSource: userOrange,
  },
];
export {
  LoginDetail,
  userGroupData,
  OraganizationDetails,
  NormalUser,
  ProofOptions,
  userProfileDetails,
};
