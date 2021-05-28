import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Switch,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import { IMLocalized } from "../localization/IMLocalization";
import materialTheme from "../constants/Theme";
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get("screen");

const Settings = (props) => {
  const { navigation } = props;
  const language = [
    { title: IMLocalized("Change Language"), id: "Language", type: "button" },
    { title: IMLocalized("Font"), id: "Font", type: "button" },
  ];

  const accountAndroid = [
    { title: IMLocalized("Android : Touch ID"), id: "android", type: "switch" },
  ];

  const accountIOS = [
    { title: IMLocalized("IOS : face ID"), id: "ios", type: "switch" },
  ];

  const privacy = [
    { title: IMLocalized("userAgreement"), id: "Agreement", type: "button" },
    { title: IMLocalized("privacy"), id: "Privacy", type: "button" },
    { title: IMLocalized("Contact Us"), id: "ContactUs", type: "button" },
  ];

  const [touch, setTouch] = useState(false);
  const [face, setFace] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(
      'bio',
      (err, result) => {
        var tmp = JSON.parse(result);
        if (!tmp) {
          setTouch(false);
          setFace(false);
        }
        if (tmp && tmp.bio == 'none') 
          {
            setTouch(false);
            setFace(false);
          }
        if (tmp && tmp.bio == 'touch')
          {
            setTouch(true);
            setFace(false);
          }  
        if (tmp && tmp.bio == 'face')
          {
            setTouch(false);
            setFace(true);
          }
      }
    )
  }, []); 

  useEffect(() => {
    if (touch)
      AsyncStorage.setItem(
        'bio',
        JSON.stringify({ bio : 'touch' }),
        () => {}
      )
    if (face)
      AsyncStorage.setItem(
        'bio',
        JSON.stringify({ bio : 'face' }),
        () => {}
      )
    if (!touch && !face)
      AsyncStorage.setItem(
        'bio',
        JSON.stringify({ bio : 'none' }),
        () => {}
      )
  }, [touch, face]);

  const renderItem = ({ item }) => {
    const { navigate } = props.navigation;

    switch (item.type) {
      case "switch":
        {          
          if (Platform.OS == 'android' && item.id == 'android') {
            return (
              <Block row middle space="between" style={styles.rows}>
                <Text size={14}>{item.title}</Text>
                <Switch
                  onValueChange={() => setTouch(previousState => !previousState)}
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
                  value={touch}
                />
              </Block>
            );
          }
          if (Platform.OS == 'ios' && item.id == 'ios') {
            return (
              <Block row middle space="between" style={styles.rows}>
                <Text size={14}>{item.title}</Text>
                <Switch
                  onValueChange={() => setFace(previousState => !previousState)}
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
                  value={face}
                />
              </Block>
            );
          }
          break;
        }
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

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-left"
            family="font-awesome"
            color={"white"}
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
          Settings
        </Text>
      </Block>
    );
  };

  return (
    <View style={styles.settings}>
      {navbar()}
      <Block center style={styles.title}>
        <Text bold size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
          {IMLocalized("Language Settings")}
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
          {IMLocalized("Account Settings")}
        </Text>
        <Text size={12} color={materialTheme.COLORS.CAPTION}>
          {IMLocalized("You can change sign-in mode")}
        </Text>
      </Block>

      <FlatList
        data={accountAndroid}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
      />

      <FlatList
        data={accountIOS}
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
  backIcon: {
    position: "absolute",
    marginLeft: theme.SIZES.BASE * 2,
  },
  roundBlock: {
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
  settings: {
    backgroundColor: "white",
    paddingBottom: height * 0.4,
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
  navbar: {
    backgroundColor: "#6E78F7",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE,
  },
});

export default Settings;
