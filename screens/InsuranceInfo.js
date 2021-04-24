import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Block, Button, Text, theme, Input } from "galio-framework";
import materialTheme from "../constants/Theme";
import { IMLocalized, init } from "../src/localization/IMLocalization";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useDispatch, useSelector } from "react-redux";
import { roleSelector } from "../store/duck/action";
import SvgUri from "expo-svg-uri";
import { Icon } from "../components";

const { height, width } = Dimensions.get("screen");

const InsuranceInfo = (props) => {
  const { navigation } = props;

  const [request, setRequest] = useState(1);

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

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <Icon
          name="arrow-left"
          family="font-awesome"
          color={"white"}
          size={16}
          style={styles.chevronLeft}
        />
        <Text
          color="white"
          style={{ paddingLeft: theme.SIZES.BASE }}
          size={17}
          bold
        >
          Add Insurance Info
        </Text>
        <SvgUri
          width="26"
          height="26"
          source={require("../assets/icons/edit.svg")}
          style={{ paddingLeft: width * 0.45 }}
        />
      </Block>
    );
  };

  const cardInfo = () => {
    return (
      <Block
        style={{
          backgroundColor: "white",
          marginBottom: height * 0.16,
          paddingBottom: theme.SIZES.BASE,
        }}
      >
        <Block style={styles.cardStyle}>
          <Text style={{ paddingLeft: theme.SIZES.BASE }} size={14}>
            Insurance Company Name <Text color="red"> *</Text>
          </Text>
          <Input
            fontSize={16}
            borderless
            color="black"
            placeholder={IMLocalized("userName")}
            type="email-address"
            autoCapitalize="none"
            bgColor="white"
            placeholderTextColor={"grey"}
            onChangeText={(text) => handleChange("email", text)}
          />
        </Block>
        <Block style={styles.cardStyle}>
          <Text style={{ paddingLeft: theme.SIZES.BASE }} size={14}>
            Insurance Policy Number <Text color="red"> *</Text>
          </Text>
          <Input
            fontSize={16}
            borderless
            color="black"
            placeholder={IMLocalized("+1 9999999")}
            type="email-address"
            autoCapitalize="none"
            bgColor="white"
            placeholderTextColor={"grey"}
            onChangeText={(text) => handleChange("email", text)}
          />
        </Block>
        <Block style={styles.cardStyle}>
          <Text style={{ paddingLeft: theme.SIZES.BASE }} size={14}>
            Insurance Adjuster <Text color="red"> *</Text>
          </Text>
          <Input
            fontSize={16}
            borderless
            color="black"
            placeholder={IMLocalized("...")}
            type="email-address"
            autoCapitalize="none"
            bgColor="white"
            placeholderTextColor={"grey"}
            onChangeText={(text) => handleChange("email", text)}
          />
        </Block>
        <Block style={([styles.cardStyle], { borderWidth: 0 })} center>
          <Block row style={[styles.location]} center>
            <SvgUri
              width="26"
              height="26"
              source={require("../assets/icons/location.svg")}
            />
            <Text>92/6, 3rd Floor, Outer Ring Road, Chandra Layout</Text>
          </Block>
          <Block style={[styles.location]}>
            <Image
              source={require("../assets/images/map1.jpg")}
              style={{
                height: theme.SIZES.BASE * 10,
                width: width * 0.77,
                marginRight: theme.SIZES.BASE,
                borderRadius: 9,
              }}
            />
          </Block>
        </Block>
        <Block style={styles.cardStyle}>
          <Text style={{ paddingLeft: theme.SIZES.BASE }} size={14}>
            Address <Text color="red"> *</Text>
          </Text>
          <Input
            fontSize={16}
            borderless
            color="black"
            placeholder={IMLocalized("...")}
            type="email-address"
            autoCapitalize="none"
            bgColor="white"
            placeholderTextColor={"grey"}
            onChangeText={(text) => handleChange("email", text)}
          />
        </Block>
        <Block style={styles.cardStyle}>
          <Text style={{ paddingLeft: theme.SIZES.BASE }} size={14}>
            City/State <Text color="red"> *</Text>
          </Text>
          <Input
            fontSize={16}
            borderless
            color="black"
            placeholder={IMLocalized("...")}
            type="email-address"
            autoCapitalize="none"
            bgColor="white"
            placeholderTextColor={"grey"}
            onChangeText={(text) => handleChange("email", text)}
          />
        </Block>
        <Block style={styles.cardStyle}>
          <Text style={{ paddingLeft: theme.SIZES.BASE }} size={14}>
            Zip Code <Text color="red"> *</Text>
          </Text>
          <Input
            fontSize={16}
            borderless
            color="black"
            placeholder={IMLocalized("...")}
            type="email-address"
            autoCapitalize="none"
            bgColor="white"
            placeholderTextColor={"grey"}
            onChangeText={(text) => handleChange("email", text)}
          />
        </Block>
        <Block row>
          <Button>Save</Button>
          <Button>Cancel</Button>
        </Block>
      </Block>
    );
  };
  return (
    <Block>
      {navbar()}
      <ScrollView>{cardInfo()}</ScrollView>
    </Block>
  );
};
const styles = StyleSheet.create({
  location: {
    marginTop: theme.SIZES.BASE,
    width: width * 0.8,
    borderRadius: 10,
    padding: 5,
    borderRadius: 15,
    borderColor: "#DEDEDE",
    borderWidth: 1,
  },
  cardStyle: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 30,
    width: width,
    height: 100,
    marginTop: theme.SIZES.BASE * 1.5,
    padding: theme.SIZES.BASE,
  },
  navbar: {
    backgroundColor: "#6E78F7",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.16,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
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
export default InsuranceInfo;
