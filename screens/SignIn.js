import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import { Block, Button, Input, Text, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../constants/";
import { HeaderHeight } from "../constants/utils";
import { IMLocalized, init } from "../src/localization/IMLocalization";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Icon } from "../components";

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
  });

  const handleChange = (name, value) => {
    setVals({ ...vals, [name]: value });
  };

  // const toggleActive = (name) => {
  //   const { active } = vals;
  //   active[name] = !active[name];

  //   setVals( active );
  // }

  const SignInHeading = (role) => {
    switch (role) {
      case "agent":
        return (
          <Block middle style={styles.signInHeading}>
            <Text
              bold
              color="white"
              size={34}
              style={{ alignSelf: "flex-start" }}
            >
              {IMLocalized("Workforce")}
            </Text>
            <Text
              bold
              color="white"
              size={34}
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
              {IMLocalized("Patient")}
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
              {IMLocalized("Primary")}
            </Text>
            <Text
              bold
              color="white"
              size={34}
              style={{ alignSelf: "flex-start" }}
            >
              {IMLocalized("Care Doctor")}
            </Text>
          </Block>
        );
      default:
        break;
    }
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={["#4E54C8", "#8F94FB"]}
      style={[styles.signin, { flex: 1, paddingTop: theme.SIZES.BASE * 4 }]}
    >
      <Block flex middle>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Icon
            name="chevron-left"
            family="font-awesome"
            color={"white"}
            size={16}
            style={styles.chevronLeft}
          />
          {SignInHeading(userRole)}
          <Block flex>
            <Block center>
              <Input
                borderless
                color="white"
                placeholder="Email"
                type="email-address"
                autoCapitalize="none"
                bgColor="transparent"
                // onBlur={() => toggleActive('email')}
                // onFocus={() => toggleActive('email')}
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={(text) => handleChange("email", text)}
                style={[
                  styles.inputEmail,
                  vals.email ? styles.inputActive : null,
                ]}
              />
              <Input
                password
                viewPass
                borderless
                color="white"
                iconColor="white"
                placeholder="Password"
                bgColor="transparent"
                // onBlur={() => toggleActive('password')}
                // onFocus={() => toggleActive('password')}
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={(text) => handleChange("password", text)}
                style={[
                  styles.inputPassword,
                  vals.password ? styles.inputActive : null,
                ]}
              />
            </Block>
            <Block center flex style={{ marginTop: height * 0.05 }}>
              <Button
                size="large"
                color="transparent"
                shadowless
                onPress={() => navigation.navigate("Sign Up")}
              >
                <Text
                  center
                  color={theme.COLORS.WHITE}
                  size={theme.SIZES.FONT * 0.75}
                  style={{ marginTop: 20 }}
                >
                  {"Don't have an account? Sign Up"}
                </Text>
              </Button>
              <TouchableOpacity
                style={styles.signInBtn}
                onPress={() => navigation.replace("App")}
              >
                <Text
                  size={18}
                  color={theme.COLORS.WHITE}
                  style={{ alignSelf: "center", paddingTop: 7 }}
                >
                  SIGN IN
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    </LinearGradient>
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
    paddingTop: theme.SIZES.BASE * 12,
    paddingHorizontal: width * 0.1,
  },
  signInBtn: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: "white",
    height: 40,
    width: width * 0.8,
    position: "relative",   
    marginTop: theme.SIZES.BASE * 1 
  },
  chevronLeft: {
    position: "absolute",
    marginTop: theme.SIZES.BASE * 8,
    marginLeft: theme.SIZES.BASE * 1,
  },
});

export default SignIn;
