import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import materialTheme from "../constants/Theme";
import { IMLocalized, init } from "../localization/IMLocalization";
import auth from '@react-native-firebase/auth';

const DrawerItem = (props) => {
  const renderIcon = () => {
    const { title, focused } = props;

    switch (title) {
      case "Agent Info":
        return (
          <Icon
            size={14}
            name="address-book"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Dashboard":
        return (
          <Icon
            size={16}
            name="home"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Patient Dashboard":
        return (
          <Icon
            size={16}
            name="home"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Profile Info":
        return (
          <Icon
            size={16}
            name="address-book"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Doctor Dashboard":
        return (
          <Icon
            size={16}
            name="home"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Patients":
        return (
          <Icon
            size={15}
            name="user"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Cases":
        return (
          <Icon
            size={15}
            name="id-badge"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Doctors":
        return (
          <Icon
            size={15}
            name="stethoscope"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Schedules":
        return (
          <Icon
            size={15}
            name="calendar"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Settings":
        return (
          <Icon
            size={15}
            name="gears"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Components":
        return (
          <Icon
            size={17}
            name="md-triangle"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Patient Info":
        return (
          <Icon
            size={17}
            name="md-triangle"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Sign In":
        return (
          <Icon
            size={15}
            name="ios-log-in"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Sign Up":
        return (
          <Icon
            size={15}
            name="md-person-add"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Case History":
        return (
          <Icon
            size={15}
            name="history"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Notification":
        return (
          <Icon
            size={15}
            name="bell"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "DashboardPatient":
        return (
          <Icon
            size={15}
            name="home"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Log out":
        return (
          <Icon
            size={15}
            name="sign-out"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      default:
        return null;
    }
  };
  const { title, focused, navigation, modal } = props;
  return (
    <TouchableOpacity
      style={{ height: 60 }}
      onPress={() => modal ? (
        Alert.alert (
          'Log out',
          'Are you sure you want to log out?',
          [
            {
              text: 'OK',
              onPress: () => {
                  auth()
                  .signOut()
                  .then(() => {
                    // console.log("success")
                    navigation.navigate("UserSelectStack")
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            },
            {
              text: 'Cancel',
              onPress: () => {}
            }
          ]
        )
      ) : navigation.navigate(title)}
    >
      <Block
        flex
        row
        style={[
          styles.defaultStyle,
          focused ? [styles.activeStyle, styles.shadow] : null,
        ]}
      >
        <Block middle flex={0.1} style={{ marginRight: 28 }}>
          {renderIcon()}
        </Block>
        <Block flex={1}>
          <Text size={15} color={focused ? "white" : "black"}>
            {/* {IMLocalized(title)} */}
            {title}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
});

export default DrawerItem;
