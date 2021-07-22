import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { Button, Block, Text, theme, Input } from "galio-framework";
import SwitchButton from "switch-button-react-native";
import { Icon } from "../components";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { IMLocalized } from "../localization/IMLocalization";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const PatientInfo = (props) => {
  const { navigation } = props;

  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
          >
            <Icon
              name="align-justify"
              family="font-awesome"
              color="black"
              size={16}
              style={styles.chevronLeft}
            />
          </TouchableOpacity>
          <Text
            color="black"
            style={{ paddingLeft: theme.SIZES.BASE }}
            size={16}
            fontWeight="semiBold"
          >
            {IMLocalized("profileInfo")}
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };
  return (
    <Block flex flexDirection="column" style={styles.container}>
      {navbar()}
      <Block flexDirection="row" center>
        <Block style={{ marginVertical: theme.SIZES.BASE * 1.5 }}>
          <Image
            source={require("../assets/images/doctor1.png")}
            style={styles.imageStyle}
          ></Image>
          <Image
            width="20"
            height="20"
            source={require("../assets/images/ok.png")}
            style={{ position: "absolute", right: -5, top: 0 }}
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
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
  navbarBtnGroup: {
    marginBottom: theme.SIZES.BASE * 2,
  },
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
