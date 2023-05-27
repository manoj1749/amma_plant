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
import React, { useEffect } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome from "react-native-vector-icons/FontAwesome5Pro";
import ImagePicker from "react-native-image-crop-picker";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation } from "../redux/slices/mapSlice";
import Geolocation from "@react-native-community/geolocation";
import { useGeolocation } from "../hooks/useGeoLocation";
import Tags from "react-native-tags";

import {
  selectLoading,
  selectuploaded,
  uploadPost,
} from "../redux/slices/userSlice";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import ImagePickerContainer from "../components/ImagePickerContainer";
import ImagePickerModal from "../components/ImagePickerModal";
import Toast from "react-native-toast-message";
import { WithContext as ReactTags } from "react-tag-input";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import Loader from "../components/Loader";
import { add, camera, edit } from "../constants/image";
import CommonSwitch from "../components/common/commonSwitch";
import CommonInput from "../components/common/commonInput";
import CommonButton from "../components/common/CommonButton";
import withCameraAndLibrary from "../HOC/withCameraAndLibrary";
import CommonModal from "../components/common/commonModal";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Map from "../components/Map";
import MapView, { Marker } from "react-native-maps";

const intailState = () => {
  return {
    description: "",
    tags: "",
    liveLocation: true,
    isVisible: false,
  };
};
const AddImage = ({ setOpenCamera, imageUri }) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(intailState());
  const [error, position] = useGeolocation();
  const { description, tags, liveLocation, isVisible } = state;
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
    }
  };
  const onClose = () => {
    setState((prev) => ({
      ...prev,
      liveLocation: false,
      isVisible: false,
    }));
  };
  console.log(position);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.firstContainer}>
          {imageUri ? (
            <ImageBackground
              source={{ uri: imageUri }}
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
          <CommonInput name={"description"} placeholder={"Description"} />
          <CommonInput name={"tags"} placeholder={"Tags"} />
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

          <CommonButton title={"UPLOAD"} />
        </View>
        {!liveLocation && (
          <CommonModal
            isVisible={isVisible}
            onClose={onClose}
            children={
              <View style={{ flex: 1, backgroundColor: "white" }}>
                <Map />
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
    flex: 0.2,
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
