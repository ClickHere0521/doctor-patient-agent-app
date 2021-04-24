import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TouchableOpacityComponent,
} from "react-native";
import { Button, Block, Text, theme } from "galio-framework";

import { Products, Images } from "../constants";

import { Product, HorizontalListItem } from "../components";
import SwitchButton from "switch-button-react-native";
import { IMLocalized } from "../src/localization/IMLocalization";

const { width } = Dimensions.get("screen");
import SvgUri from "expo-svg-uri";
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const DashboardPatient = (props) => {
  const { navigation } = props;
  const [activeSwitch, setActiveSwitch] = useState(null);
  console.log(activeSwitch);
  const firstTimeCheck = () => {
    return (
      <Block
        flex
        flexDirection="row"
        center
        middle
        style={{ marginTop: theme.SIZES.BASE * 2 }}
      >
        <Text size={13} color="grey" style={{ marginRight: theme.SIZES.BASE }}>
          {IMLocalized("useAppFirst")}
        </Text>
        <SwitchButton
          onValueChange={(val) => setActiveSwitch(val)}
          text1="Yes"
          text2="No"
          switchWidth={100}
          switchHeight={34}
          switchDirection="rtl"
          switchBorderRadius={100}
          switchSpeedChange={500}
          switchBorderColor="#3B3E51"
          switchBackgroundColor="#fff"
          btnBorderColor="#3B3E51"
          btnBackgroundColor="#3B3E51"
          fontColor="#3B3E51"
          activeFontColor="#fff"
        />
      </Block>
    );
  };
  const typeIcons = () => {
    return (
      <Block flex flexDirection={"row"} style={[styles.navbarBtnGroup]}>
        <Block flexDirection={"column"} style={[styles.navbarBtn]} center>
          <TouchableOpacity
            onPress={() => {
              activeSwitch > 1
                ? navigation.navigate("PatientCaseDetail")
                : null;
            }}
          >
            <Block center middle style={[styles.imageBtn]}>
              <SvgUri
                width="50"
                height="50"
                source={require("../assets/icons/microscope.svg")}
              />
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
          <TouchableOpacity
            onPress={() => {
              activeSwitch > 1
                ? navigation.navigate("PatientScheduleDetail")
                : null;
            }}
          >
            <Block center middle style={[styles.imageBtn]}>
              <>
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
              </>
            </Block>
          </TouchableOpacity>
          <Block center style={styles.typeIconText}>
            <Text size={12} bold center color={"#333348"}>
              {activeSwitch > 1
                ? IMLocalized("schedule")
                : IMLocalized("status")}
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
          <Block center middle style={[styles.imageBtn]}>
            <SvgUri
              width="50"
              height="50"
              source={require("../assets/icons/nurse.svg")}
            />
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
                style={{ marginLeft: theme.SIZES.BASE * 13 }}
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
    borderRadius: 1000,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 5, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 8,
  },
  navbarBtn: {
    width: theme.SIZES.BASE * 5,
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: "#6E78F7",
    padding: 0,
    height: theme.SIZES.BASE * 10,
  },
  navbarBtnGroup: {
    marginBottom: theme.SIZES.BASE * 2,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
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
    width: theme.SIZES.BASE * 8,
    paddingTop: 10,
    color: "#333348",
  },
});

export default DashboardPatient;
