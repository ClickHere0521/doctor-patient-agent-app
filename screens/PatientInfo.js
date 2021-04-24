import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Block, Text, theme, Input } from "galio-framework";
import SwitchButton from "switch-button-react-native";
import { Icon } from "../components";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { IMLocalized } from "../src/localization/IMLocalization";

import SvgUri from "expo-svg-uri";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const PatientInfo = (props) => {
  const { navigation } = props;

  return (
    <Block flex flexDirection="column" style={styles.container}>
      <Block flexDirection="row" center>
        <Block style={{ marginVertical: theme.SIZES.BASE * 1.5 }}>
          <Image
            source={require("../assets/images/doctor1.png")}
            style={styles.imageStyle}
          ></Image>
          <SvgUri
            width="20"
            height="20"
            source={require("../assets/icons/dot.svg")}
            style={{ position: "absolute", right: -10, top: -5 }}
          />
        </Block>
        <TouchableWithoutFeedback style={{ marginLeft: theme.SIZES.BASE * 2 }}>
          <Text
            style={{ paddingHorizontal: theme.SIZES.BASE * 3 }}
            color={"#00CE30"}
            size={12}
          >
            Upload Profile Picture
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Text size={12} color={"#FF6767"}>
            Remove Picture
          </Text>
        </TouchableWithoutFeedback>
      </Block>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block flexDirection="column" style={styles.itemStyle}>
          <Text muted size={14}>
            Full Name <Text color="red"> *</Text>
          </Text>
          <Text style={styles.paddingVBase}>Zulqurnain Haider</Text>
        </Block>
        <Block flexDirection="column" style={styles.itemStyle}>
          <Text muted size={14}>
            {IMLocalized("address")} <Text color="red"> *</Text>
          </Text>
          <Text style={styles.paddingVBase}>California,US</Text>
        </Block>
        <Block flexDirection="column" style={styles.itemStyle}>
          <Text muted size={14}>
            {IMLocalized("tel")} <Text color="red"> *</Text>
          </Text>
          <Text style={styles.paddingVBase}>+1223567890</Text>
        </Block>
        <Block flexDirection="column" style={styles.itemStyle}>
          <Text muted size={14}>
            {IMLocalized("dateOfBirth")} <Text color="red"> *</Text>
          </Text>
          <Text style={styles.paddingVBase}>12/03/1994</Text>
        </Block>
        <Block flexDirection="column" style={styles.itemStyle}>
          <Text muted size={14}>
            {IMLocalized("gender")} <Text color="red"> *</Text>
          </Text>
          <Text style={styles.paddingVBase}>12/03/1994</Text>
        </Block>
        <Block flexDirection="column" style={styles.itemStyle}>
          <Text muted size={14}>
            {IMLocalized("SSN")} <Text color="red"> *</Text>
          </Text>
          <Text style={styles.paddingVBase}>Women</Text>
        </Block>
        <Block flexDirection="column" style={styles.itemStyle}>
          <Text muted size={14}>
            {IMLocalized("Zip Code")} <Text color="red"> *</Text>
          </Text>
          <Text style={styles.paddingVBase}>12/03/1994</Text>
        </Block>
        <Block flexDirection="column" style={styles.itemStyle}>
          <Text muted size={14}>
            {IMLocalized("City/State")} <Text color="red"> *</Text>
          </Text>
          <Text style={styles.paddingVBase}>Califonia, US</Text>
        </Block>
        <Block flexDirection="column" style={styles.itemStyle}>
          <Text muted size={14}>
            {IMLocalized("patientProfileId")} <Text color="red"> *</Text>
          </Text>
          <Text style={styles.paddingVBase}>00990</Text>
        </Block>
        <Block center>
          <Button style={{ borderRadius: 10 }} color="#00CE30" center>
            {IMLocalized("update")}
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  paddingVBase: {
    paddingVertical: theme.SIZES.BASE / 2,
    fontSize: 14,
  },
  itemStyle: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EDEDED",
    padding: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 5,
    marginVertical: theme.SIZES.BASE,
  },
  container: {
    backgroundColor: "white",
  },
  profile: {
    marginTop: Platform.OS === "android" ? height * 0.02 : height * 0.02,
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#BBB",
  },
});

export default PatientInfo;
