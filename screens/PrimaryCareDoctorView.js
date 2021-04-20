import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions,
  View,
  Component,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";

import { materialTheme, products, Images, tabs } from "../constants/";
import {
  Select,
  Icon,
  Header,
  Product,
  Switch,
  Tabs,
  ListItem,
} from "../components/";
import Accordion from "react-native-collapsible/Accordion";
import { IMLocalized } from "../src/localization/IMLocalization";

const { width } = Dimensions.get("screen");

const SECTIONS = [
  {
    title: "First",
    content: "Lorem ipsum...",
  },
  {
    title: "Second",
    content: "Lorem ipsum...",
  },
  {
    title: "First",
    content: "Lorem ipsum...",
  },
  {
    title: "Second",
    content: "Lorem ipsum...",
  },
  {
    title: "First",
    content: "Lorem ipsum...",
  },
  {
    title: "Second",
    content: "Lorem ipsum...",
  },
];
const PrimaryCareDoctorView = (props) => {
  const { navigation } = props;
  const [activeSections, setActiveSections] = useState([ 0, ]);

  const _renderSectionTitle = (section) => {
    return <View style={styles.content}></View>;
  };
  const _renderHeader = (section) => {
    return (
      <Block flex style={[styles.container]}>
        <Block flex style={{ flexDirection: "row" }}>
          <Block style={[styles.picBox]}>
            <Image
              source={{
                uri:
                  "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?crop=entropy&w=840&h=840&fit=crop",
              }}
              style={[
                styles.picBox,
                {
                  height: theme.SIZES.BASE * 3.5,
                  width: theme.SIZES.BASE * 3.5,
                },
              ]}
            />
          </Block>
          <Block flex style={styles.ml_3}>
            <Text size={22}>Dr. Ronald Joseph</Text>
            <Text size={14} muted>
              Neurosurgeon Specialist{" "}
            </Text>
          </Block>
          <Block center>
            <Icon
              name="chevron-down"
              family="font-awesome"
              color={theme.COLORS.MUTED}
              size={theme.SIZES.BASE}
            >
              {" "}
            </Icon>
          </Block>
        </Block>
        <Block style={{ paddingTop: 10 }}>
          <Text size={16}>
            6 {IMLocalized("yearsExp")}.{" "}
            <Text bold>| {IMLocalized("consultation")}</Text>:{" "}
            {IMLocalized("mon")}, {IMLocalized("tue")}, {IMLocalized("wed")}
          </Text>
        </Block>
      </Block>
    );
  };
  const _renderContent = (section) => {
    return (
      <Block flex style={[styles.contentContainer]}>
        <Block flex style={{ flexDirection: "column" }}>
          <Block flex>
            <Text size={16}>
              <Text bold>{IMLocalized("description")}:</Text>Lorem ipsum dolor
              sit amet, consetetur sadipscing elitr, sed diam nonu my eirmod
              tempor invidunt ut labore et doloremagna aliquyam erat, sed diam
              volup tua.
            </Text>
          </Block>
        </Block>
        <Button
          shadowless
          color={"#00CE30"}
          style={[styles.button]}
          onPress={() => navigation.navigate("DoctorDetail")}
        >
          <Text size={15} color={"white"}>
            {IMLocalized("Detail")}
          </Text>
        </Button>
      </Block>
    );
  };

  const onChangeHandle = (event) => {
    console.log(event)
    setActiveSections(event);
  };

  const onclick = () => {};

  const navbar = () => {
    return (
      <Block flex flexDirection="row" style={{ padding: 10 }}>
        <Block left>
          <Image
            source={require("../assets/icons/PatientIcon.png")}
            style={{
              height: theme.SIZES.BASE * 3,
              width: theme.SIZES.BASE * 3,
              marginRight: theme.SIZES.BASE,
            }}
          />
        </Block>
        <Block center>
          <Text h6 center middle>
            {IMLocalized("patientView")}
          </Text>
        </Block>
        <TouchableWithoutFeedback onclick={onclick()}>
          <Block center middle style={[styles.searchBtn, styles.greyGradient]}>
            <Icon
              name="search"
              family="font-awesome"
              color={theme.COLORS.MUTED}
              size={theme.SIZES.BASE}
            >
              {" "}
            </Icon>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  };

  const renderPatientsList = () => {
    return (
      <Block style={{ marginBottom: theme.SIZES.BASE * 2 }}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <Block height={theme.SIZES.BASE} flex></Block>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={onChangeHandle}
          />
        </ScrollView>
      </Block>
    );
  };

  return (
    <Block flex>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        {renderPatientsList()}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 4,
    padding: theme.SIZES.BASE * 1.5,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    marginTop: -theme.SIZES.BASE,
    borderBottomWidth: 0,
  },
  contentContainer: {
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 4,
    padding: theme.SIZES.BASE * 1.5,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    borderTopWidth: 0,
    paddingTop: 0,
    marginBottom: theme.SIZES.BASE * 3,
  },
  picBox: {
    borderRadius: 16,
    padding: 1,
    borderColor: "#3B3E51",
    backgroundColor: "#3B3E51",
  },
  ml_1: {
    marginLeft: theme.SIZES.BASE / 2,
  },
  ml_2: {
    marginLeft: theme.SIZES.BASE,
  },
  ml_3: {
    marginLeft: theme.SIZES.BASE * 2,
  },
  ml_4: {
    marginLeft: theme.SIZES.BASE * 3,
  },
  components: {
    paddingTop: theme.SIZES.BASE * 2,
    backgroundColor: "#FFFFFF",
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: theme.SIZES.BASE * 8,
    borderRadius: 15,
    position: "absolute",
    right: theme.SIZES.BASE * 2,
    bottom: -theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 2,
  },
  searchBtn: {
    position: "absolute",
    right: theme.SIZES.BASE,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    width: theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 2,
    paddingLeft: 5,
  },
  greyGradient: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
  },
});

export default PrimaryCareDoctorView;
