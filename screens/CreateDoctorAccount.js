import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions,
  View,
  Component,
} from "react-native";
import { Button, Block, Text, theme, Input } from "galio-framework";
import { IMLocalized } from "../src/localization/IMLocalization";
import { materialTheme, products, Images, tabs } from "../constants/";
import {
  Select,
  Icon,
  Header,
  Product,
  Switch,
  Tabs,
  ListItem,
} from "../components/";
import SwitchButton from "switch-button-react-native";
import InputNew from "../components/Input";

const { width, height } = Dimensions.get("screen");

const CreateDoctorAccount = (props) => {
  const { navigation } = props;
  const [activeSwitch, setActiveSwitch] = useState(1);
  const [imageUri, setImageUri] = useState(null);

  const [vals, setVals] = useState({
    user: "-",
    email: "-",
    password: "-",
    active: {
      user: false,
      email: false,
      password: false,
    },
  });
  const [email, setEmail] = useState("");

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

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
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
          Create Doctor Account
        </Text>
      </Block>
    );
  };

  return (
    <Block flex style={styles.components}>
      {navbar()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block center>
          <Input
            bgColor="transparent"
            placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
            borderless
            color="black"
            type="email-address"
            placeholder="Email"
            autoCapitalize="none"
            style={[styles.input, vals.email ? styles.inputActive : null]}
            iconContent={
              <Icon
                size={16}
                style={{ marginRight: theme.SIZES.BASE }}
                color="black"
                name="envelope"
                family="font-awesome"
              />
            }
          />
          {/* <InputNew
            label="Email"
            value={email}
            onChangeText={setEmail}
            disabled={false}
            keyboardType="email-address"
            leftIcon="email"
            rightIcon="close"          
          /> */}
          <Input
            bgColor="transparent"
            placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
            borderless
            color="black"
            password
            viewPass
            placeholder="Password"
            autoCapitalize="none"
            style={[styles.input, vals.password ? styles.inputActive : null]}
            iconContent={
              <Icon
                size={16}
                style={{ marginRight: theme.SIZES.BASE }}
                color="black"
                name="key"
                family="font-awesome"
              />
            }
          />
        </Block>

        <Block>
          <Text size={18} style={styles.heading}>
            Doctor Info
          </Text>
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
          <Block style={styles.doctorInfo}>
            <Block style={styles.detail}>
              <Block style={styles.interval}>
                <Block row>
                  <Text color={"black"}>Full name</Text>
                  <Text color={"red"}>*</Text>
                </Block>
                <Block>
                  <Input
                    bgColor="transparent"
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    borderless
                    color="black"
                    placeholder="Mark Veronic"
                    autoCapitalize="none"
                    style={[
                      styles.name,
                      vals.password ? styles.nameActive : null,
                    ]}
                  />
                </Block>
              </Block>
              <Block style={styles.interval}>
                <Block row>
                  <Text color={"black"}>Address</Text>
                  <Text color={"red"}>*</Text>
                </Block>
                <Block>
                  <Input
                    bgColor="transparent"
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    borderless
                    color="black"
                    placeholder="Markveronic@"
                    autoCapitalize="none"
                    style={[
                      styles.name,
                      vals.password ? styles.nameActive : null,
                    ]}
                  />
                </Block>
              </Block>
              <Block style={styles.interval}>
                <Block row>
                  <Text color={"black"}>Description</Text>
                  <Text color={"red"}>*</Text>
                </Block>
                <Block>
                  <Text size={16}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonu my eirmod tempor invidun.{" "}
                  </Text>
                </Block>
              </Block>
            </Block>
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
          </Block>
          <Block center style={styles.saveBtn}>
            <Text color={"white"} size={18}>
              Create
            </Text>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  components: {
    paddingBottom: 50,
    paddingHorizontal: width * 0.05,
    backgroundColor: "white",
  },
  emailPass: {
    padding: 4,
  },
  heading: {
    marginVertical: 20,
  },
  doctorInfo: {
    padding: 4,
  },
  detail: {
    borderRadius: 20,
    borderColor: "#EDEDED",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginVertical: 10,
  },
  asteride: {
    position: "absolute",
    left: theme.SIZES.BASE * 5,
  },
  saveBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 140,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#00CE30",
    marginVertical: 20,
  },
  navbar: {
    backgroundColor: "#6E78F7",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.16,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
  },
  input: {
    marginTop: theme.SIZES.BASE * 0.5,
    width: width * 0.8,
    backgroundColor: "#EFEFEF",
    color: "black",
    shadowColor: "grey",
    shadowRadius: 20,
    elevation: 2,
  },
  inputActive: {
    borderBottomColor: "black",
  },
  name: {
    marginTop: theme.SIZES.BASE * 0.5,
    width: width * 0.8,
    color: "black",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  interval: {
    paddingBottom: 20,
  },
});

export default CreateDoctorAccount;
