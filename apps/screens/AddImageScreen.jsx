import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  PermissionsAndroid,
  ImageBackground,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGeolocation } from "../hooks/useGeoLocation";
import Toast from "react-native-toast-message";
import { add, camera, edit } from "../constants/image";
import CommonSwitch from "../components/common/commonSwitch";
import CommonInput from "../components/common/commonInput";
import CommonButton from "../components/common/CommonButton";
import withCameraAndLibrary from "../HOC/withCameraAndLibrary";
import CommonModal from "../components/common/commonModal";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Map from "../components/Map";
import { postAction } from "../redux/action/PostAction";
import { useFocusEffect } from "@react-navigation/native";
const intailState = () => {
  return {
    description: "",
    tags: "",
    liveLocation: true,
    isVisible: false,
  };
};
const AddImage = ({ setOpenCamera, imageUri, navigation }) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(intailState());
  const [error, position] = useGeolocation();
  const { description, tags, liveLocation, isVisible } = state;

  React.useEffect(() => {
    if (liveLocation) {
      Toast.show({
        type: "SuccessToast",
        text1: "Live Location Captured",
      });
    }
  }, [liveLocation]);

  const handleChange = (name) => (event) => {
    event.persist();
    setState((prev) => ({
      ...prev,
      [name]: event?.nativeEvent?.text,
    }));
  };
  const onOpenCameraPopup = () => {
    setOpenCamera(true);
  };
  const onSelectSwitch = (index) => {
    if (index !== 1) {
      setState((prev) => ({
        ...prev,
        liveLocation: false,
        isVisible: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        liveLocation: true,
      }));
    }
  };
  const onClose = () => {
    setState((prev) => ({
      ...prev,
      liveLocation: false,
      isVisible: false,
    }));
  };
  const handleUpdate = () => {
    const body = {
      description,
      tags,
      longtitude: position.longitude,
      latitude: position.latitude,
      imageUri,
    };
    dispatch(postAction(body, navigation));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.firstContainer}>
          {imageUri ? (
            <ImageBackground
              source={{ uri: imageUri.assets[0].uri || imageUri }}
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={styles.overlay} />
              <Pressable onPress={onOpenCameraPopup}>
                <Image source={edit} />
              </Pressable>
            </ImageBackground>
          ) : (
            <Pressable onPress={onOpenCameraPopup}>
              <Image source={add} />
            </Pressable>
          )}
        </View>
        <View style={styles.secondContainer}>
          <CommonInput
            name={"description"}
            placeholder={"Description"}
            placeholderTextColor="#00000090"
            onChange={handleChange("description")}
          />
          <CommonInput
            name={"tags"}
            placeholder={"Tags"}
            placeholderTextColor="#00000090"
            onChange={handleChange("tags")}
          />
          <View style={{ justifyContent: "flex-end" }}>
            <CommonSwitch
              selectionMode={1}
              roundCorner={true}
              option1={"ON"}
              option2={"OFF"}
              onSelectSwitch={onSelectSwitch}
              selectionColor={"#C47A5E"}
            />
          </View>

          <CommonButton
            title={"UPLOAD"}
            onPress={handleUpdate}
            disabled={description === "" || tags === ""}
          />
        </View>
        {!liveLocation && (
          <CommonModal
            isVisible={isVisible}
            onClose={onClose}
            children={
              <View
                style={{ flex: 1, backgroundColor: "white", borderRadius: 10 }}
              >
                <Map hideAutoComplete />
              </View>
            }
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default withCameraAndLibrary(AddImage);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  firstContainer: {
    flex: 0.3,
    backgroundColor: "#C47A5E10",
    alignItems: "center",
    justifyContent: "center",
  },
  secondContainer: {
    flex: 0.8,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  overlay: {
    width: "100%",
    backgroundColor:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.0996369) 16.67%, rgba(245, 245, 245, 0.10) 55.21%, rgba(0, 0, 0, 0.10) 65.62%, rgba(0, 0, 0, 0.1989583) 99.99%, rgba(0, 0, 0, 0.5) 100%)",
    height: "100%",
    position: "absolute",
  },
  input: {
    margin: 12,
    borderWidth: 0,
    width: 370,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    color: "black",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
