import React, { useState } from "react";
import {
  Modal,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Block, Button, Text, theme, Input } from "galio-framework";

const { height, width } = Dimensions.get("screen");
import SwitchButton from "switch-button-react-native";
import materialTheme from "../constants/Theme";
import { IMLocalized, init } from "../src/localization/IMLocalization";
import { Icon } from "../components/";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

const AgentDoctorDetail = (props) => {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const [activeSwitch, setActiveSwitch] = useState(1);

  const handleAvatar = (val) => {
    setActiveSwitch(val);
    if (val == 2) pickImage();
    else setImageUri(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity
            onPress={() => navigation.openDrawer()}
          >
            <Icon
              name="align-justify"
              family="font-awesome"
              color="white"
              size={16}
              style={styles.chevronLeft}
            />
          </TouchableOpacity>
        <Text
          color="white"
          style={{ paddingLeft: theme.SIZES.BASE }}
          size={17}
          bold
        >
          Profile Info
        </Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/icons/editHeaderWhite.png")}
            alt=""
            style={{ marginLeft: width * 0.54 }}
          />
        </TouchableOpacity>
      </Block>
    );
  };

  return (
    <Block>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={{height: height * 0.8}}>
        <Block style={styles.container}>
          <Block style={{borderWidth: 1, borderColor:'black', borderRadius: theme.SIZES.BASE * 2, margin: theme.SIZES.BASE, padding: theme.SIZES.BASE, marginTop: theme.SIZES.BASE *4}}>
            <Block row center style={{marginLeft: width * 0.3, marginTop: -theme.SIZES.BASE * 3.5}}>
              <Block middle style={{ marginRight: 14 }}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: 80, height: 80, borderRadius: 20 }}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/grayscale-photo-of-man2.png")}
                    style={{ width: 80, height: 80, borderRadius: 20 }}
                  />
                )}
              </Block>
              <Block>
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
            </Block>
            <Text size={14} style={{ marginTop: theme.SIZES.BASE * 2 }} center>
              Dr. Ronald Joseph
            </Text>
            <Text color={"grey"} text={12} center>
              B.Sc, MBBS, DDVL, MD- Dermitologist
            </Text>
            <Block style={styles.headBottom}>
              <Text color="grey" size={12} style={{marginBottom: theme.SIZES.BASE}}>
                <Text color="black" size={14}>
                  16
                </Text>{" "}
                yrs. Experience
              </Text>
              <Block row center>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE / 2 }}>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={require("../assets/images/grayscale-photo-of-man2.png")}
                  ></Image>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE / 2 }}>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={require("../assets/images/grayscale-photo-of-man2.png")}
                  ></Image>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE / 2 }}>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={require("../assets/images/grayscale-photo-of-man2.png")}
                  ></Image>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE / 2 }}>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={require("../assets/images/grayscale-photo-of-man2.png")}
                  ></Image>
                </Block>
              </Block>
            </Block>
          </Block>
          <Block style={{borderWidth: 1,padding: theme.SIZES.BASE, borderColor:'black', borderRadius: theme.SIZES.BASE * 2, margin: theme.SIZES.BASE}}>
            <Block row>
              <Icon
                name="map-marker"
                family="font-awesome"
                color={"#0288D1"}
                style={{ margin: 10 }}
              />
              <Text size={12} color={"grey"} style={{ marginTop: 10 }}>
                92/6, 3rd Floor, Outer Ring Road, Chandra Layout
              </Text>
            </Block>
            <Image
              source={require("../assets/images/map.png")}
              alt=""
              style={{ margin: width * 0.01, alignSelf: "center" }}
            />
            <Block row style={{ margin: 10 }}>
              <Text color="black" style={{ alignSelf: "flex-start" }}>
                Tel
                <Text color="red">*</Text>
              </Text>
              <Text color="grey" style={{ paddingLeft: 10 }}>
                +1234567890
              </Text>
            </Block>
            <Block>
              <Text color="black" style={styles.info} size={14}>
                Account Info
                <Text color="red">*</Text>
              </Text>
              <Block flex flexDirection="row" style={{ left: width * 0.1 }}>
                <Block flex={1}>
                  <Text color="grey">
                    Email
                    <Text color="grey">*</Text>
                  </Text>
                  <Text color="grey" style={{paddingTop: theme.SIZES.BASE}}>
                    Password
                    <Text color="grey">*</Text>
                  </Text>
                </Block>
                <Block flex={2}>
                  <Text color="grey">Joseph@gmail.com</Text>
                  <Input
                    password
                    viewPass
                    bgColor="transparent"
                    placeholder="password"
                    color="black"
                    style={[styles.input, styles.inputDefault]}
                  />
                </Block>
              </Block>
            </Block>
            <Block>
              <Text color="black" style={styles.info} size={14}>
                Description
                <Text color="red">*</Text>
              </Text>
              <Text color="grey" size={16} style={styles.descriptionText}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonu my eirmod tempor invidun.
              </Text>
            </Block>
            <Block flex flexDirection="row"  style={styles.info} >
              <Block>
                <Text color="black" size={14}>
                  Schedule
                  <Text color="red">*</Text>
                </Text>
              </Block>
              <Block style={{marginLeft: width * 0.4}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("DoctorMySchedule")}
                >
                  <Text
                    color={"#00CE30"}
                    sytle={{ textDecorationLine: "underline" }}
                  >
                    View
                  </Text>
                </TouchableOpacity>
              </Block>
            </Block>
            <Button color="#00CE30" style={{borderRadius: 16, width: width * 0.8}}>UPDATE</Button>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#6E78F7",
    width: width,
    height: height * 0.16,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
  },
  input: {
    width: width * 0.3
  },
  modalButton: {
    width: width * 0.25,
    height: theme.SIZES.BASE * 2,
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: "#C7C7C7",
    marginTop: theme.SIZES.BASE,
  },
  innerModal: {
    backgroundColor: "rgba(255,255,255,0.99)",
    width: width * 0.8,
    borderRadius: 15,
    height: height * 0.15,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 5,
  },
  container: {
    backgroundColor: "#F5F5F5",
  },
  headArrow: {
    marginTop: height * 0.1,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    position: "absolute",
    zIndex: 1,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 25,
    width: width - theme.SIZES.BASE * 6,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 2,
    shadowOpacity: 5,
    backgroundColor: "white",
  },
  optionsButton: {
    backgroundColor: "#6E78F7",
    borderRadius: 25,
    marginVertical: 50,
    height: 50,
    width: width * 0.5,
    justifyContent: "center",
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 8,
    marginLeft: 12,
    borderRadius: 2,
    height: 22,
  },
  gradient: {
    zIndex: 1,
    position: "absolute",
    top: 33 + theme.SIZES.BASE,
    left: 0,
    right: 0,
    height: 90,
  },
  circle: {
    width: theme.SIZES.BASE * 10,
    height: theme.SIZES.BASE * 10,
    backgroundColor: "#3946FF",
    position: "absolute",
    borderRadius: 1000,
    right: -theme.SIZES.BASE * 5,
    bottom: -theme.SIZES.BASE * 8,
  },
  body: {
    marginHorizontal: width * 0.04,
    backgroundColor: "white",
    borderRadius: 12,
  },
  prime: {
    top: height * 0.08,
    left: -width * 0.08,
    position: "absolute",
  },
  header: {
    marginHorizontal: width * 0.01,
    marginTop: -height * 0.05,
  },
  rating: {
    top: height * 0.08,
    right: -width * 0.08,
    position: "absolute",
  },
  headBottom: {
    margin: theme.SIZES.BASE,
  },
  star: {
    top: height * 0.08,
    right: -width * 0.01,
    position: "absolute",
  },
  info: {
    marginHorizontal: theme.SIZES.BASE,
    padding: theme.SIZES.BASE,
  },
  schedule: {
    alignSelf: "flex-start",
    margin: 10,
    marginBottom: 0,
  },
  descriptionText: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginLeft: 10,
  },
});

export default AgentDoctorDetail;
