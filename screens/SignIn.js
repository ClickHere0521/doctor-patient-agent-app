import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../constants/";
import { HeaderHeight } from "../constants/utils";
import { IMLocalized, init } from "../src/localization/IMLocalization";
import { useSelector } from "react-redux";
import { Icon } from "../components";
import SvgUri from "expo-svg-uri";
import { CheckBox } from "react-native-elements";
import { isValid } from '../src/utils/helpers';
import Input from '../components/InputType1';

import * as LocalAuthentication from "expo-local-authentication";
// import { validEmail } from "validate-form-in-expo-style/src/CustomValidationRules";

const { width, height } = Dimensions.get("window");

const SignIn = (props) => {
  const { navigation } = props;
  const userRole = useSelector((state) => state.user.role);
  const [vals, setVals] = useState({
    email: "-",
    password: "-",
    active: {
      email: false,
      password: false,
    },
    scanned: false
  });

  const handleChange = (name, value) => {
    setVals({ ...vals, [name]: value });
  };

  const [isSelected, setSelected] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [requested, setRequested] = useState(false);
  const validemail = isValid('email', email);
  const validPassword = isValid('password', password);

  const SignInHeading = (role) => {
    switch (role) {
      case "agent":
        return (
          <Block middle style={styles.signInHeading}>
            <Text
              bold
              color="white"
              size={40}
              style={{ alignSelf: "flex-start" }}
            >
              {IMLocalized("Agent")}
            </Text>
          </Block>
        );
      case "patient":
        return (
          <Block middle style={styles.signInHeading}>
            <Text
              bold
              color="white"
              size={34}
              style={{ alignSelf: "flex-start" }}
            >
              {IMLocalized("patient")}
            </Text>
          </Block>
        );
      case "doctor":
        return (
          <Block middle style={styles.signInHeading}>
            <Text
              bold
              color="white"
              size={34}
              style={{ alignSelf: "flex-start" }}
            >
              {IMLocalized("doctor")}
            </Text>
          </Block>
        );
      default:
        break;
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

  return (
    <ScrollView>
      <Block
        flex
        middle
        backgroundColor="rgba(139,147,248,1)"
        style={{ height: height }}
      >
        {SignInHeading(userRole)}
        <Block flex>
          <Block column flex style={{ margin: theme.SIZES.BASE * 2 }}>
            <Block >
              <Input
                label="USERNAME"
                value={email}
                onChangeText={setEmail}
                disabled={false}
                keyboardType="email-address"
                leftIcon=""
                rightIcon=""
                validate
                requested={requested}
              />
            </Block>
            <Block >
              <Input
                label="PASSWORD"
                value={password}
                onChangeText={setPassword}
                disabled={false}
                leftIcon=""
                rightIcon="eye"
                validate
                requested={requested}
              />
            </Block>
          </Block>
          <Block
            center
            flex
            style={{ marginTop: height * 0.15, borderRadius: 15 }}
          >
            <TouchableOpacity
              style={styles.signInBtn}
              // onPress={() => navigation.navigate("AddNotes")}
              onPress={() => {
                console.log(validemail);
                if (validemail || validPassword) {
                  navigation.replace("Biometrics")
                  setRequested(false);
                }
                else {
                  setRequested(true);
                }
              }}

            >
              <Text
                size={18}
                color={theme.COLORS.WHITE}
                style={{ alignSelf: "center", paddingTop: 7 }}

              >
                {IMLocalized("signIn")}
              </Text>
            </TouchableOpacity>
          </Block>
          <Block flex flexDirection="row" style={{ width: width * 0.9 }} center>
            <CheckBox
              checked={isSelected}
              containerStyle={{ backgroundColor: "rgba(0,0,0,0)", width: 10 }}
              onPress={() => setSelected(!isSelected)}
            />
            <Text style={styles.label}>{IMLocalized("Remember Me")}</Text>
            <TouchableOpacity
              style={{ marginLeft: width / 6 }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={{ color: "white" }}>
                {IMLocalized("ForgotPassword")}
              </Text>
            </TouchableOpacity>
          </Block>
          <Block flex>
            <></>
          </Block>
          <Block flex>
            <></>
          </Block>
          <Block flex>
            <></>
          </Block>
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

export default SignIn;
