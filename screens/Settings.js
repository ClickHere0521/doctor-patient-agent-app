import React, { useState } from "react";
import {
  StyleSheet,
  Switch,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import { IMLocalized } from "../src/localization/IMLocalization";
import materialTheme from "../constants/Theme";

const Settings = (props) => {
  const language = [
    { title: IMLocalized("changeLanguage"), id: "Language", type: "button" },
  ];

  const privacy = [
    { title: IMLocalized("userAgreement"), id: "Agreement", type: "button" },
    { title: IMLocalized("privacy"), id: "Privacy", type: "button" },
    { title: IMLocalized("about"), id: "About", type: "button" },
  ];

  const [itemID, setItemID] = useState({});

  const toggleSwitch = (switchNumber) =>
    setItemID({ [switchNumber]: !itemID[switchNumber] });

  const renderItem = ({ item }) => {
    const { navigate } = props.navigation;

    switch (item.type) {
      case "switch":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text size={14}>{item.title}</Text>
            <Switch
              onValueChange={() => toggleSwitch(item.id)}
              ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
              thumbColor={
                Platform.OS === "android"
                  ? materialTheme.COLORS.SWITCH_OFF
                  : null
              }
              trackColor={{
                false: materialTheme.COLORS.SWITCH_OFF,
                true: materialTheme.COLORS.SWITCH_ON,
              }}
              value={itemID[item.id]}
            />
          </Block>
        );
      case "button":
        return (
          <Block style={styles.rows}>
            <TouchableOpacity
              onPress={() =>
                item.id !== "Payment" && item.id !== "gift" && navigate(item.id)
              }
            >
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text size={14}>{item.title}</Text>
                <Icon
                  name="angle-right"
                  family="font-awesome"
                  style={{ paddingRight: 5 }}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        );
      default:
        break;
    }
  };

  return (
    <View style={styles.settings}>
      <Block center style={styles.title}>
        <Text bold size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
          {IMLocalized("languageSettings")}
        </Text>
        <Text size={12} color={materialTheme.COLORS.CAPTION}>
          {IMLocalized("canChangeLang")}
        </Text>
      </Block>

      <FlatList
        data={language}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
      />

      <Block center style={styles.title}>
        <Text bold size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
          {IMLocalized("privacySettings")}
        </Text>
        <Text size={12} color={materialTheme.COLORS.CAPTION}>
          {IMLocalized("privacySettingsText")}
        </Text>
      </Block>

      <FlatList
        data={privacy}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settings: {
    paddingVertical: theme.SIZES.BASE / 3,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  },
});

export default Settings;
