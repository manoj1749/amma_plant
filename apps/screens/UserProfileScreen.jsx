import { Image, View, Text } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { userProfileDetails } from "../data/userGroupData";
import CommonButton from "../components/common/CommonButton";
import CommonInput from "../components/common/commonInput";
import { avatarBoy, bitCoin, rupee, wallet } from "../constants/image";

import { getLoginId } from "../utiltis/utilitis";
import { getImageByid, getUserData } from "../redux/action/PostAction";
import serverURL from "../helpers/serverURL";
import { PieChart } from "react-native-chart-kit";
import Component from "../components/common/card/card";
import CommonModal from "../components/common/commonModal";
import { WALLETAMOUNT } from "../constants";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("screen").width;
const UserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.post);
  const [state, setState] = React.useState({
    enableCards: false,
    enableWallet: false,
  });
  const { userImageDetails } = useSelector((state) => state.post);
  const { enableCards, enableWallet } = state;

  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getLoginId().then((res) => {
        console.log(res, "auhhh");
        dispatch(getUserData(res));
        dispatch(getImageByid(res));
      });
    });
    focusHandler;
  }, [navigation]);
  const onHandlePress = (title) => {
    if (title === "My Plant") {
      setState((prev) => ({
        ...prev,
        enableCards: true,
      }));
    } else if (title === "Wallet") {
      setState((prev) => ({
        ...prev,
        enableWallet: true,
      }));
    }
  };
  const onClose = (title) => {
    setState((prev) => ({
      ...prev,
      enableCards: false,
      enableWallet: false,
    }));
  };
  const data = [
    {
      name: "Assets",
      population: userImageDetails.length,
      color: "#F24E1E50",
      // legendFontColor: "#7F7F7F",
      // legendFontSize: 15,
    },
    {
      name: "Balance",
      population: WALLETAMOUNT - userImageDetails.length,
      color: "#F24E1E",
    },
  ];
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.9,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View
          style={{
            flex: 0.2,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 30,
          }}
        >
          <Avatar.Image
            size={150}
            style={{
              marginHorizontal: 20,
              backgroundColor: "white",
              elevation: 10,
              shadowColor: "#00000050",
            }}
            source={
              userDetail
                ? {
                    uri: `${serverURL()}/${userDetail?.profilePicture}`,
                  }
                : avatarBoy
            }
          />
        </View>
        <View
          style={{
            flex: 0.2,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            paddingBottom: 20,
          }}
        >
          <CommonInput
            name={"fullName"}
            placeholder={"Full Name"}
            isEditable={false}
            value={userDetail?.fullname || "Full Name"}
            placeholderTextColor="#00000090"
          />
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {userProfileDetails.map(({ id, title, leftSource }) => {
            return (
              <CommonButton
                key={id}
                title={title}
                leftSource={leftSource}
                type={"lightbtn"}
                size={"small"}
                onPress={() => onHandlePress(title)}
              />
            );
          })}
        </View>
      </View>
      {enableCards && (
        <CommonModal
          isVisible={enableCards}
          onClose={onClose}
          children={<Component />}
        />
      )}
      {enableWallet && (
        <CommonModal
          isVisible={enableWallet}
          onClose={onClose}
          children={
            <View
              style={{
                flex: 0.7,
                backgroundColor: "white",
                borderRadius: 50,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: 150,
                  width: "96%",
                  backgroundColor: "#F6EBE7",
                  borderRadius: 50,
                  position: "absolute",
                  top: 3,
                  left: 2,
                  marginHorizontal: 4,
                }}
              >
                <View style={{ paddingTop: 10 }}>
                  <View
                    style={{
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "black", fontWeight: "700" }}>
                      My Wallet
                    </Text>
                    <Image source={bitCoin} />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <View style={{ width: 150 }}>
                      <Text style={{ color: "black", fontSize: 16 }}>
                        Total Assests :{" "}
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: "black",
                        fontSize: 15,
                        fontWeight: "800",
                      }}
                    >
                      {WALLETAMOUNT}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <View style={{ width: 150 }}>
                      <Text style={{ color: "black", fontSize: 16 }}>
                        Balance :{" "}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 15,
                        fontWeight: "800",
                      }}
                    >
                      {WALLETAMOUNT - userImageDetails.length}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  marginTop: 153,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PieChart
                  data={data}
                  width={300}
                  height={220}
                  chartConfig={chartConfig}
                  accessor={"population"}
                  backgroundColor={"transparent"}
                  paddingLeft={"20"}
                  // center={[0, 50]}
                />
              </View>
            </View>
          }
        />
      )}
    </>
  );
};

export default UserProfile;
