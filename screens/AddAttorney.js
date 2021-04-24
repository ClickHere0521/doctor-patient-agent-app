import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Button, Block, Text, theme, Input, Icon } from "galio-framework";

import { materialTheme } from "../constants";
import SwitchButton from "switch-button-react-native";
import * as ImagePicker from "expo-image-picker";
import { SvgUri } from "react-native-svg";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const AddAttorney = (props) => {
  const { navigation } = props;

  const [vals, setVals] = useState({
    email: "-",
    password: "-",
    active: {
      email: false,
      password: false,
    },
  });
  const [activeSwitch, setActiveSwitch] = useState(1);
  const [imageUri, setImageUri] = useState(null);
  // const imageUri = "../assets/images/avatar.png";
  const handleChange = (name, value) => {
    setVals({ [name]: value });
  };

  const handleAvatar = (val) => {
    setActiveSwitch(val);
    if (val == 2) pickImage();
    else setImageUri(null);
  };

  const renderUserDetail = (detail) => {
    let { heading, content } = { ...detail };
    return (
      <Block style={styles.detail}>
        <Block row>
          <Text color={"grey"}>{heading}</Text>
          <Text color={"red"} style={styles.asteride}>
            *
          </Text>
        </Block>
        <Block>
          <Text size={16}>{content}</Text>
        </Block>
      </Block>
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <Block center flex style={styles.profile}>
      <Block>
        <Block style={styles.roundBlock}>
          <Block row style={styles.heading}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                size={16}
                name="chevron-left"
                family="font-awesome"
                color={"white"}
                style={{ padding: 7 }}
              />
            </TouchableOpacity>
            <Block>
              <Text
                color="white"
                size={20}
                style={{ fontFamily: "Inter-Black" }}
                bold
              >
                Add Attorney Info
              </Text>
            </Block>
            <Block
              style={{
                position: "absolute",
                right: 10,
                padding: 7,
              }}
            >
              <Image source={require("../assets/images/editWhite.png")} />
            </Block>
          </Block>
        </Block>
      </Block>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block center row style={{ top: 10 }}>
          <Block middle style={{ marginRight: 14 }}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 50, height: 50 }}
              />
            ) : (
              <Image
                source={require("../assets/images/userDefault.png")}
                style={{ width: 50, height: 50 }}
              />
            )}
          </Block>
          <SwitchButton
            onValueChange={handleAvatar}
            text1="Remove"
            text2="Upload"
            switchWidth={120}
            switchHeight={30}
            switchdirection="rtl"
            switchBorderRadius={100}
            switchSpeedChange={500}
            switchBorderColor="#3B3E51"
            switchBackgroundColor="#fff"
            btnBorderColor="#3B3E51"
            btnBackgroundColor="#3B3E51"
            fontColor="#3B3E51"
            activeFontColor="#fff"
          />
        </Block>

        <Block style={styles.userDetail}>
          {renderUserDetail({
            heading: "Full Name",
            content: "Zulqurnain Haider",
          })}
          {renderUserDetail({
            heading: "Email",
            content: "soreno@gmail.com",
          })}
          {renderUserDetail({
            heading: "Address",
            content: "Avenue 32",
          })}
          {renderUserDetail({
            heading: "City/State",
            content: "California,US",
          })}
          {renderUserDetail({
            heading: "Zip Code",
            content: "098978",
          })}
          {renderUserDetail({
            heading: "Tel",
            content: "1208903980",
          })}
          {renderUserDetail({
            heading: "Fax",
            content: "090834",
          })}
        </Block>
        <Block row center>
          <TouchableOpacity
            style={styles.save}
            onPress={() => console.log("save")}
          >
            <Text color={"white"} size={16}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.save}
            onPress={() => console.log("cancel")}
          >
            <Text color={"white"} size={16}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    // marginTop: Platform.OS === "android" ? height * 0.02 : height * 0.02,
    backgroundColor: "white",
  },
  optionsButtonText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: "white",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  uploadPicture: {
    paddingHorizontal: 14,
    paddingVertical: 1,
    marginTop: height * 0.01,
    marginHorizontal: width * 0.01,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  userInfo: {
    paddingHorizontal: width * 0.06,
    marginTop: height * 0.04,
    marginBottom: height * 0.05,
    marginHorizontal: width * 0.01,
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
  },
  profileContainer: {
    width: width,
    height: "auto",
    flex: 1,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative",
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 90,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: "relative",
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    position: "absolute",
  },
  input: {
    width: width * 0.8,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "black",
  },
  upload: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingLeft: 8,
    paddingRight: 30,
    marginRight: -26,
  },
  label: {
    paddingTop: 14,
    alignSelf: "flex-start",
    fontSize: 16,
  },
  roundBlock: {
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    backgroundColor: "rgba(100, 120, 247, 0.84)",
    height: height * 0.16,
    width: width,
    top: -10,
    zIndex: 2,
  },
  heading: {
    marginTop: height * 0.08,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    zIndex: 1,
  },
  spinBar: {
    borderRadius: 4,
    shadowColor: "grey",
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: "white",
    padding: 6,
  },
  inputPassword: {
    width: width * 0.5,
    height: 30,
    borderRadius: 6,
    shadowColor: "grey",
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  save: {
    backgroundColor: "#00CE30",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  location: {
    shadowOpacity: 0.2,
    shadowColor: "grey",
    backgroundColor: "white",
    shadowRadius: 10,
    elevation: 2,
    width: width * 0.8,
    margin: 10,
    padding: 4,
  },
  map: {
    width: width * 0.8,
    marginHorizontal: 10,
    marginBottom: 6,
  },
  description: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    width: width * 0.8,
    margin: 10,
  },
  userDetail: {
    width: width,
  },
  detail: {
    borderRadius: 20,
    borderColor: "#EDEDED",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginVertical: 10
  },
  asteride: {
    position: "absolute",
    left: theme.SIZES.BASE * 5,
  },
});

export default AddAttorney;
