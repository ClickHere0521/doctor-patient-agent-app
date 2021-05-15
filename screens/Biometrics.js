import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Block, Button, Input, Text, theme } from "galio-framework";

import { materialTheme } from "../constants/";
import { HeaderHeight } from "../constants/utils";
import { IMLocalized, init } from "../src/localization/IMLocalization";
import { useSelector } from "react-redux";
import SvgUri from "expo-svg-uri";
import * as LocalAuthentication from "expo-local-authentication";

const { width, height } = Dimensions.get("window");

const Biometrics = (props) => {
  const { navigation } = props;
  const userRole = useSelector((state) => state.user.role);  
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    checkDeviceForHardware();
    checkForBiometrics();
    if (!scanned) handleLoginPress();
  }, []);

  const checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      console.log("Compatible Device!");
    } else 
    Alert.alert(
        "Warning",
        "Current device does not have the necessary hardware!",
        [
          { text: "OK", onPress: () => navigation.navigate("SignIn") }
        ]
      );
  };

  const checkForBiometrics = async () => {
    let biometricRecords = await LocalAuthentication.isEnrolledAsync();   
    if (!biometricRecords) {
      Alert.alert(
        "Warning",
        "No Biometrics Found, please register a new",
        [
          { text: "OK", onPress: () => navigation.navigate("SignIn") }
        ]
      );
    } else {
      console.log("Biometrics Found");
    }
  };

  const handleLoginPress = async () => {
    handleAuthentication();
  };

  const handleAuthentication = async () => {
    let result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      setScanned(true);
      navigation.replace("App");
    } else {
      console.log("Error! Enter your username and password!");
    }
  };

  const gotoSignUp = () => {
    if (userRole != "agent") {
      return (
        <Block
          style={{ width: width, borderTopWidth: 1, borderColor: "white" }}
        >
          <Button
            size="large"
            color="transparent"
            shadowless
            onPress={() => navigation.navigate("Sign Up")}
          >
            <Block flexDirection="row" center middle>
              <Text center color={theme.COLORS.WHITE} size={16}>
                {"Don't have an account? SIGN UP "}
              </Text>
              <SvgUri
                width="36"
                height="36"
                source={require("../assets/icons/arrow-long-right.svg")}
              />
            </Block>
          </Button>
        </Block>
      );
    }
  };

  const signInBlock = () => {
    if (userRole == "agent") {
      return (
        <Block center style={{ marginBottom: theme.SIZES.BASE * 5 }}>
          <Text color="white">Sign In Successfully!</Text>
        </Block>
      );
    } else {
      return (
        <Block center style={{ marginBottom: theme.SIZES.BASE }}>
          <Text color="white">Sign In Successfully!</Text>
        </Block>
      );
    }
  };

  return (
    <ScrollView>
      <Block
        flex
        middle
        backgroundColor="rgba(139,147,248,1)"
        style={{ height: height }}
      >
        <Block flex>
          <Block
            flex
            flexDirection="row"
            style={{ marginTop: height * 0.05 }}
            center
          >
            <SvgUri
              width="50"
              height="50"
              source={require("../assets/icons/face.svg")}
            />
            <SvgUri
              width="50"
              height="50"
              source={require("../assets/icons/finger.svg")}
              style={{ marginLeft: theme.SIZES.BASE * 2 }}
            />
          </Block>
          {signInBlock()}
        </Block>
        {gotoSignUp()}
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  inputEmail: {
    width: width * 0.8,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
    marginTop: theme.SIZES.BASE * 2,
  },
  inputPassword: {
    width: width * 0.8,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
  signInHeading: {
    paddingTop: theme.SIZES.BASE * 10,
  },
  signInBtn: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "white",
    height: theme.SIZES.BASE * 3,
    width: width * 0.8,
    position: "relative",
  },
  checkboxContainer: {},
  label: {
    paddingLeft: theme.SIZES.BASE / 2,
    color: "white",
  },
});

export default Biometrics;
