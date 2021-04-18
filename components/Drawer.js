import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import materialTheme from "../constants/Theme";
import {IMLocalized, init} from '../src/localization/IMLocalization';


const DrawerItem = props => {
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
      case "Patient View":
        return (
          <Icon
            size={15}
            name="user"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Case View":
        return (
          <Icon
            size={15}
            name="id-badge"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Primary Care Doctor View":
        return (
          <Icon
            size={15}
            name="stethoscope"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Schedule View":
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
      default:
        return null;
    }
  };
  const { title, focused, navigation } = props;
  return (
    <TouchableOpacity
      style={{ height: 55 }}
      onPress={() => navigation.navigate(title)}
    >
      <Block
        flex
        row
        style={[
          styles.defaultStyle,
          focused ? [styles.activeStyle, styles.shadow] : null
        ]}
      >
        <Block middle flex={0.1} style={{ marginRight: 28 }}>
          {renderIcon()}
        </Block>
        <Block flex={0.9}>
          <Text size={15} color={focused ? "white" : "black"}>
            {IMLocalized(title)}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 6
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  }
});

export default DrawerItem;