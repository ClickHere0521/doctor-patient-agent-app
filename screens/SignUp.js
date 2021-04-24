import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  CheckBox,
  TouchableWithoutFeedback,
} from "react-native";

import { Block, Button, Input, Text, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../constants/";
import { HeaderHeight } from "../constants/utils";
import { IMLocalized, init } from "../src/localization/IMLocalization";
import { Select, Icon, Header, Product, Switch, Tabs } from "../components/";

const { height, width } = Dimensions.get("window");

const SignUp = (props) => {
  const { navigation } = props;

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

  const handleChange = (name, value) => {
    setVals({ [name]: value });
  };

  const toggleActive = (name) => {
    const { active } = vals;
    active[name] = !active[name];

    setVals({ active });
  };

  const [isSelected, setSelection] = useState(false);

  return (
    <Block flex middle style={{ backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "-position"}
        enabled
        keyboardVerticalOffset={0}
      >
        <Block
          middle
          style={{
            paddingTop: theme.SIZES.BASE * 5,
            paddingLeft: theme.SIZES.BASE * 2,
          }}
        >
          <Text
            color="black"
            size={40}
            style={{
              alignSelf: "flex-start",
              marginVertical: theme.SIZES.BASE,
            }}
          >
            Sign Up
          </Text>
          <Text
            color="grey"
            muted
            size={20}
            style={{ alignSelf: "flex-start" }}
          >
            Welcome to AMD
          </Text>
        </Block>

        <Block flex={1} center space="between">
          <Block center>
            <Text
              color="grey"
              size={12}
              style={{
                textAlign: "left",
                width: width * 0.8,
                margin: theme.SIZES.BASE * 2,
                marginBottom: -theme.SIZES.BASE * 2,
                marginLeft: 4 * theme.SIZES.BASE,
              }}
            >
              Email
            </Text>
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
                  color={theme.COLORS.ICON}
                  name="envelope"
                  family="font-awesome"
                />
              }
            />

            <Text
              color="grey"
              size={12}
              style={{
                textAlign: "left",
                width: width * 0.8,
                margin: theme.SIZES.BASE * 2,
                marginBottom: -theme.SIZES.BASE * 2,
                marginLeft: 4 * theme.SIZES.BASE,
              }}
            >
              Username
            </Text>
            <Input
              bgColor="transparent"
              placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
              borderless
              color="black"
              placeholder="Username"
              autoCapitalize="none"
              style={[styles.input, vals.user ? styles.inputActive : null]}
              iconContent={
                <Icon
                  size={16}
                  style={{ marginRight: theme.SIZES.BASE }}
                  color={theme.COLORS.ICON}
                  name="user"
                  family="font-awesome"
                />
              }
              // onChangeText={text => handleChange('user', text)}
              // onBlur={() => toggleActive('user')}
              // onFocus={() => toggleActive('user')}
            />
            <Text
              color="grey"
              size={12}
              style={{
                textAlign: "left",
                width: width * 0.8,
                margin: theme.SIZES.BASE * 2,
                marginBottom: -theme.SIZES.BASE * 2,
                marginLeft: 4 * theme.SIZES.BASE,
              }}
            >
              Password
            </Text>
            <Input
              password
              viewPass
              borderless
              bgColor="transparent"
              placeholder="password"
              color="black"
              style={[styles.input, styles.inputDefault]}
              iconContent={
                <Icon
                  size={16}
                  style={{ marginRight: theme.SIZES.BASE }}
                  color={theme.COLORS.ICON}
                  name="lock"
                  family="font-awesome"
                />
              }
            />
          </Block>
          <Block style={styles.checkboxContainer} middle>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>
              By creating an account, you agree to our Term & Conditions
            </Text>
          </Block>
          <Block flex center style={{ marginTop: 20 }}>
            <Button
              size="large"
              shadowless
              style={{ height: 48, borderRadius: 16, width: width * 0.6 }}
              color={"#00CE30"}
            >
              SIGN UP
            </Button>
            <Button
              size="large"
              color="transparent"
              shadowless
              onPress={() => navigation.navigate("Sign In")}
            >
              <Text
                center
                color={theme.COLORS.BLACK}
                size={theme.SIZES.FONT * 0.75}
              >
                Already have an account? Sign In
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    </Block>
  );
};

const styles = StyleSheet.create({
  label: {
    width: width * 0.7,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  inputDefault: {
    color: "black",
  },
  signup: {
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
  input: {
    marginVertical: theme.SIZES.BASE,
    width: width * 0.8,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
    color: "black",
  },
  inputActive: {
    borderBottomColor: "black",
  },
});

export default SignUp;
