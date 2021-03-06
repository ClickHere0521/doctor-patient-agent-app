import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  BackHandler,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Button, Block, Text, theme, Icon } from "galio-framework";

import { Products, Images } from "../constants";

import { Product, HorizontalListItem } from "../components";
import SwitchButton from "switch-button-react-native";
import { IMLocalized } from "../localization/IMLocalization";
import {
  useFocusEffect
} from '@react-navigation/native';
import { TouchableHighlight } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get("screen");
const DashboardPatient = (props) => {
  const { navigation } = props;
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Log out',
          'Are you sure you want to log out?',
          [
            {
              text: "OK",
              onPress: () => handleLogout()
            },
            {
              text: "Cancel",
              onPress: () => { }
            }
          ]
        );
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPress
        );
      };
    }, []),
  );

  const handleLogout = async () => {
    await AsyncStorage.setItem(
      'reminder',
      JSON.stringify({ reminder: false }),
      () => {}
    );  
    navigation.navigate("UserSelectStack");
  };

  const firstTimeCheck = () => {
    return (
      <Block
        flex
        flexDirection="row"
        center
        middle
        style={{ marginTop: theme.SIZES.BASE * 2 }}
      >
      </Block>
    );
  };

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
            {IMLocalized("Dashboard")}
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  const typeIcons = () => {
    return (
      <Block flex flexDirection={"row"} style={[styles.navbarBtnGroup]}>
        <Block flexDirection={"column"} style={[styles.navbarBtn]} center>
          <TouchableOpacity style={[styles.shadow]}>
            <Block center middle style={[styles.imageBtn]}>
              <Image source={require('../assets/images/microscope.png')} alt="" />
            </Block>
          </TouchableOpacity>
          <Block center style={styles.typeIconText}>
            <Text size={12} center bold color={"#333348"}>
              <>
                {activeSwitch > 1
                  ? IMLocalized("caseDetail")
                  : IMLocalized("previousCase")}
              </>
            </Text>
            <Text
              size={10}
              muted
              color={"#898A8F"}
              center
              style={{ paddingVertical: 5 }}
            >
              {activeSwitch > 1
                ? IMLocalized("lookMedical")
                : IMLocalized("lookRecent")}
            </Text>
          </Block>
        </Block>
        <Block flexDirection={"column"} style={[styles.navbarBtn]} center>
          <TouchableOpacity onPress={() => navigation.navigate("PatientActiveCase")}>
            <Block center middle style={[styles.imageBtn]}>
              {/* <>
                {activeSwitch > 1 ? (
                  <SvgUri
                    width="40"
                    height="40"
                    source={require("../assets/icons/Group.svg")}
                  />
                ) : (
                  <SvgUri
                    width="50"
                    height="50"
                    source={require("../assets/icons/people.svg")}
                  />
                )}
              </> */}
            </Block>
          </TouchableOpacity>
          <Block center style={styles.typeIconText}>
            <Text size={12} bold center color={"#333348"}>
              {IMLocalized("activeCase")}
            </Text>
            <Text
              size={10}
              muted
              color={"#898A8F"}
              center
              style={{ paddingVertical: 5 }}
            >
              {IMLocalized("physicalStatus")}
            </Text>
          </Block>
        </Block>
        <Block flexDirection={"column"} style={[styles.navbarBtn]} center>
          <TouchableOpacity onPress={() => navigation.navigate("BookDoctor")}>
            <Block center middle style={[styles.imageBtn]}>
              {/* <SvgUri
                width="50"
                height="50"
                source={require("../assets/icons/nurse.svg")}
              /> */}
            </Block>
            <Block center style={styles.typeIconText}>
              <Text size={12} bold center color={"#333348"}>
                {IMLocalized("bookDoctor")}
              </Text>
              <Text
                size={10}
                muted
                color={"#898A8F"}
                center
                style={{ paddingVertical: 5 }}
              >
                {IMLocalized("searchDoctor")}
              </Text>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    );
  };

  const renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Block flex card shadow style={[styles.category]}>
                <ImageBackground
                  source={{ uri: Images.Products["Accessories"] }}
                  style={[styles.imageBlock]}
                  imageStyle={{
                    width: width - theme.SIZES.BASE * 2,
                    height: 200,
                  }}
                >
                  <Block style={styles.categoryTitle}>
                    <Text size={18} bold color={theme.COLORS.WHITE}>
                      Accessories
                    </Text>
                  </Block>
                </ImageBackground>
              </Block>
              <Block flex card shadow style={styles.category}>
                <ImageBackground
                  source={{ uri: Images.Products["Makeup"] }}
                  style={[styles.imageBlock]}
                  imageStyle={{
                    width: width - theme.SIZES.BASE * 2,
                    height: 200,
                  }}
                >
                  <Block style={styles.categoryTitle}>
                    <Text size={18} bold color={theme.COLORS.WHITE}>
                      Makeup
                    </Text>
                  </Block>
                </ImageBackground>
              </Block>
              <Block flex card shadow style={styles.category}>
                <ImageBackground
                  source={{ uri: Images.Products["Harley-Davidson"] }}
                  style={[styles.imageBlock]}
                  imageStyle={{
                    width: width - theme.SIZES.BASE * 2,
                    height: 200,
                  }}
                >
                  <Block style={styles.categoryTitle}>
                    <Text size={18} bold color={theme.COLORS.WHITE}>
                      Harley-Davidson
                    </Text>
                  </Block>
                </ImageBackground>
              </Block>
            </ScrollView>
            <Block flex flexDirection="row" style={styles.marginV2Base}>
              <Text color={"#3F4079"} bold size={14}>
                {IMLocalized("doctorsNearbyYou")}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Primary Care Doctor View")}
                style={{ marginLeft: width * 0.5 }}
              >
                <Text color={"#3A58FC"} bold size={14}>
                  {IMLocalized("seeAll")}
                </Text>
              </TouchableOpacity>
            </Block>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Block flex row>
                <HorizontalListItem
                  product={Products[1]}
                  style={styles.marginRBase}
                />
                <HorizontalListItem product={Products[2]} />
                <HorizontalListItem product={Products[3]} />
                <HorizontalListItem product={Products[4]} />
              </Block>
            </ScrollView>
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <Block flex>
      {navbar()}
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        {firstTimeCheck()}
        {typeIcons()}
        {renderCards()}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  marginV2Base: {
    marginVertical: theme.SIZES.BASE * 1.5,
  },
  marginRBase: {
    marginRight: theme.SIZES.BASE,
  },
  imageBtn: {
    width: theme.SIZES.BASE * 5,
    height: theme.SIZES.BASE * 5,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    backgroundColor: "white",
  },
  navbarBtn: {
    width: theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 5,
    padding: theme.SIZES.BASE,
    borderColor: "white",
    marginLeft: theme.SIZES.BASE * 3,
  },
  components: {
    marginBottom: theme.SIZES.BASE,
    backgroundColor: "white",
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
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
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 3,
  },
  imageBlock: {
    width: width - theme.SIZES.BASE * 2,
    height: 200,
    overflow: "hidden",
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
    paddingRight: theme.SIZES.BASE,
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  typeIconText: {
    width: theme.SIZES.BASE * 6,
    paddingTop: 10,
    color: "#333348",
  },
});

export default DashboardPatient;
