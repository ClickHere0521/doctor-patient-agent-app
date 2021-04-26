import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Button, Block, Text, theme } from "galio-framework";

import { Icon } from "../components/";
import Accordion from "react-native-collapsible/Accordion";
import { IMLocalized } from "../src/localization/IMLocalization";
import SvgUri from "expo-svg-uri";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("screen");

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
  
  const userRole = useSelector((state) => state.user.role);
  const { navigation } = props;
  const [activeSections, setActiveSections] = useState([0]);

  const navbarIcons = () => {
    if(userRole == "agent"){
      return (
        <Block row>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateDoctorAccount")}
            style={{ paddingLeft: width * 0.5, padding: 2 }}
          >
            <Text color={"white"}>
              <SvgUri
                width="18"
                height="18"
                source={require("../assets/icons/add.svg")}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ paddingLeft: width * 0.02, padding: 2 }}
          >
            <Text color={"white"}>
              <SvgUri
                width="20"
                height="20"
                source={require("../assets/icons/headerEditBlack.svg")}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ paddingLeft: width * 0.02 }}
          >
            <Text color={"white"}>
              <SvgUri
                width="24"
                height="24"
                source={require("../assets/icons/trash.svg")}
              />
            </Text>
          </TouchableOpacity>
        </Block>
      )
    }
  }
  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
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
            size={22}
            fontWeight="semiBold"
          >
            {IMLocalized("Doctors")}
          </Text>
          {navbarIcons()}
          </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
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
    if(userRole == 'agent')
    {
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
            onPress={() => navigation.navigate("AgentDoctorDetail")}
          >
            <Text size={15} color={"white"}>
              {IMLocalized("Detail")}
            </Text>
          </Button>
        </Block>
      );
    }
    else
    {
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
        </Block>
      );
    }
  };

  const onChangeHandle = (event) => {
    console.log(event);
    setActiveSections(event);
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
            style={{backgroundColor: 'white'}}
          />
        </ScrollView>
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
        {renderPatientsList()}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 4,
    padding: theme.SIZES.BASE * 1.5,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
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
  navbar: {
    backgroundColor: "#6E78F7",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.16,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
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
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.16,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
});

export default PrimaryCareDoctorView;
