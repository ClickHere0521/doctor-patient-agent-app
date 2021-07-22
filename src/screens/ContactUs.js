import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Block, Button, Text, theme, Icon } from "galio-framework";
import { IMLocalized, init } from "../localization/IMLocalization";
import materialTheme from "../constants/Theme";

const { width, height } = Dimensions.get("screen");

const ContactUs = (props) => {
  const { navigation } = props;

  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              family="font-awesome"
              color="black"
              size={16}
              style={styles.chevronLeft}
            />
          </TouchableOpacity>
          <Text
            color="black"
            style={{ paddingLeft: theme.SIZES.BASE * 0.5 }}
            size={16}
            fontWeight="semiBold"
          >
            {/* {IMLocalized("Contact Us")} */}
            Contact Us
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  return (
    <Block flex style={styles.page}>
      {navbar()}
      <ScrollView
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ContactUs}
      >
        <Block>
          {/* <Text>{IMLocalized("TEL")}</Text> */}
          <Text>TEL</Text>
          <Block style={styles.info}>
            <Text>0123456789</Text>
          </Block>
        </Block>
        <Block>
          {/* <Text>{IMLocalized("Email")}</Text> */}
          <Text>Email</Text>
          <Block style={styles.info}>
            <Text>Kapoor@gmail.com</Text>
          </Block>
        </Block>
        <Block>
          {/* <Text>{IMLocalized("Address line")}</Text> */}
          <Text>Address line</Text>
          <Block style={styles.info}>
            <Text>531 Pittston Ave</Text>
          </Block>
        </Block>
        <Block>
          {/* <Text>{IMLocalized("City")}</Text> */}
          <Text>City</Text>
          <Block style={styles.info}>
            <Text>Scranton</Text>
          </Block>
        </Block>
        <Block>
          {/* <Text>{IMLocalized("City Code")}</Text> */}
          <Text>City Code</Text>
          <Block style={styles.info}>
            <Text>18505</Text>
          </Block>
        </Block>        
        <Block center>
          <TouchableOpacity style={styles.ContactUsButton}>
            <Text size={16} color={"white"}>
              {/* {IMLocalized("Contact Us")} */}
              Contact Us
            </Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  ContactUs: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: width * 0.07,
    paddingBottom: theme.SIZES.BASE * 5,
  },
  buttonsWrapper: {
    zIndex: 2,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE * 1.75,
  },
  ContactUsButton: {
    width: width * 0.86,
    height: theme.SIZES.BASE * 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0064FE",
    borderRadius: 6,
    marginTop: 20,
  },
  gradient: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
  },
  touchableArea: {
    width: 30, 
    height: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE * 0.5,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
  info: {
    padding: theme.SIZES.BASE,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 6,
    marginBottom: 16,
  },
});

export default ContactUs;
