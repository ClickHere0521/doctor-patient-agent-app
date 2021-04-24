import React from "react";
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";

import { materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { IMLocalized } from "../src/localization/IMLocalization";

const { width, height } = Dimensions.get("screen");

const ProfileInfo = (props) => {
  const renderEvents = (events) => {
    let { eventHeading, eventContent } = { ...events };

    return (
      <Block style={styles.options}>
        <Block column space="between" style={styles.events}>
          <Block row style={styles.marginLB10}>
            <Block>
              <Text color={"grey"} size={14}>
                {IMLocalized(eventHeading)}
              </Text>
            </Block>
            <Block>
              <Text color={"red"}>*</Text>
            </Block>
          </Block>
          <Block style={styles.marginL10}>
            <Text size={16} color={"black"}>
              {eventContent}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <Block flex style={styles.profile}>
      <ImageBackground
        source={require("../assets/images/doctor2.png")}
        style={styles.profileContainer}
        imageStyle={styles.profileImage}
      >
        <Block flex style={styles.profileDetails}>
          <LinearGradient
            colors={["rgba(110,120,247,0.2)", "rgba(110,120,247,0.3)"]}
            style={styles.gradient}
          />
          <LinearGradient
            colors={["rgba(110,120,247,0.2)", "rgba(110,120,247,0.3)"]}
            style={styles.gradient}
          />
        </Block>
      </ImageBackground>
      <Block flex={0.7} style={styles.body}>
        <Block style={styles.profileTexts}>
          <Text bold size={24}>
            Rachel Brown
          </Text>
          <Block row>
            <Text bold size={18} color="white" style={styles.workforce}>
              Workforce
            </Text>
            <Text bold size={17} color="white" style={styles.doctor}>
              Doctor
            </Text>
          </Block>
        </Block>
        {renderEvents({
          eventHeading: IMLocalized("fullName"),
          eventContent: "Rachel Brown",
        })}
        {renderEvents({
          eventHeading: IMLocalized("Address"),
          eventContent: "Los Angeles,CA",
        })}
        {renderEvents({
          eventHeading: IMLocalized("Phone number"),
          eventContent: "+92 314 1254789",
        })}
        {renderEvents({
          eventHeading: IMLocalized("ongoingCase"),
          eventContent: 80,
        })}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  profileImage: {
    width: width,
    height: "auto",
    top: height * 0.1,
  },
  profileContainer: {
    width: width,
    height: height,
    flex: 1,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative",
  },
  profileTexts: {
    position: "relative",
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 14,
    marginBottom: theme.SIZES.BASE * 4,
    borderRadius: 30,
    zIndex: 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 90,
  },
  events: {
    padding: theme.SIZES.BASE * 0.2,
    marginLeft: 10,
  },
  marginLB10: {
    marginLeft: 10,
    marginBottom: 10,
  },
  marginL10: {
    marginLeft: 10,
  },
  options: {
    position: "relative",
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 3,
    marginBottom: theme.SIZES.BASE * 4,
    borderRadius: 30,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
    zIndex: 2,
  },
  gradient: {
    zIndex: 10,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    position: "absolute",
  },
  body: {
    backgroundColor: "#6E78F7",
  },
  workforce: {
    backgroundColor: "#FE2472",
    borderRadius: 10,
    paddingVertical: 1,
    paddingHorizontal: 10,
  },
  doctor: {
    padding: 2,
  },
});

export default ProfileInfo;
