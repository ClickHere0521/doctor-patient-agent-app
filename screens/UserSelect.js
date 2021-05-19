import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import materialTheme from "../constants/Theme";
import { IMLocalized, init } from "../src/localization/IMLocalization";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useDispatch, useSelector } from "react-redux";
import { roleSelector } from "../store/duck/action";
import SvgUri from "expo-svg-uri";


const { height, width } = Dimensions.get("screen");

const Onboarding = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    "Inter-Black": require("../assets/fonts/LeagueSpartan-Bold.otf"),
  });

  const setLang = useSelector(({ language }) => language.language);

  useEffect(() => {
    console.log("lang->>>" + setLang);
    // Update the document title using the browser API
    init(setLang);
  }, [setLang]);

  const handleRole = (role) => {
    dispatch(roleSelector(role));
    navigation.navigate("SignIn");
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Block flex style={styles.container}>
        <Block middle style={{ height: height / 1.8 }}>
          <Image
            source={require("../assets/images/doctor.png")}
            style={styles.doctorImage}
          />
          <Block middle style={styles.roundBlock}>
            <Block style={styles.bodyTitle} middle>
              <Block>
                <Image
                  source={require("../assets/icons/cureBag.png")}
                  style={{
                    height: theme.SIZES.BASE * 2,
                    width: theme.SIZES.BASE * 2.2,
                  }}
                />
              </Block>
              <Block
                flex
                flexDirection="column"
                middle
                center
                style={{ marginTop: theme.SIZES.BASE }}
              >
                <Text
                  color="white"
                  size={34}
                  style={{ fontFamily: "Inter-Black" }}
                  bold
                >
                  {IMLocalized("advanced")}
                </Text>
                <Text
                  color="white"
                  size={34}
                  style={{ fontFamily: "Inter-Black" }}
                  bold
                >
                  {IMLocalized("medical")}
                </Text>
                <Text
                  color="white"
                  size={34}
                  style={{ fontFamily: "Inter-Black" }}
                  bold
                >
                  {IMLocalized("group")}
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block flex={1} space="between" style={{ marginTop: height / 13 }}>
          <Block center style={{ paddingBottom: 30 }}>
            <Button
              shadowless
              style={styles.button}
              textStyle={{ fontSize: 14, color: "#3F4079", fontWeight: "bold", shadowColor: "#EEE" }}
              onPress={() => handleRole("agent")}
            >
              {IMLocalized("agent")}
            </Button>

            <Button
              shadowless
              style={styles.button}
              textStyle={{ fontSize: 14, color: "#3082CC", fontWeight: "bold", shadowColor: "#EEE" }}
              onPress={() => handleRole("patient")}
            >
              {IMLocalized("Patient")}
            </Button>

            <Button
              shadowless
              style={styles.button}
              textStyle={[styles.buttonTextStyle, { color: "#FF6B6B", shadowColor: "#EEE" }]}
              onPress={() => handleRole("doctor")}
            >
              {IMLocalized("doctor")}
            </Button>

            <Text color="grey" size={10} style={{marginTop: theme.SIZES.BASE}}>
              {IMLocalized("agreeTerm")}
            </Text>
          </Block>
        </Block>
        <View style={styles.circle} />
      </Block>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
  roundBlock: {
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    position: "absolute",
    backgroundColor: "rgba(100, 120, 247, 0.84)",
    height: height / 1.8,
    width: width,
    zIndex: 2,
  },
  backIcon: {
    position: "absolute",
    zIndex: 100,
    width: theme.SIZES.BASE * 1.5,
    height: theme.SIZES.BASE * 1.5,
    left: theme.SIZES.BASE * 2,
    top: theme.SIZES.BASE * 5,
  },
  buttonTextStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  doctorImage: {
    height: height / 2.5,
    width: width / 1.2,
    zIndex: 1,
    borderRadius: 30,
  },
  bodyTitle: {
    marginBottom: theme.SIZES.BASE / 2,
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "absolute",
    zIndex: 3,
  },
});

export default Onboarding;
