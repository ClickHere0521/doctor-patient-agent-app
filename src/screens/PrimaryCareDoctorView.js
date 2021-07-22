import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Button, Block, Text, theme } from "galio-framework";
import { Icon } from "../components/";
import Accordion from "react-native-collapsible/Accordion";
import { IMLocalized } from "../localization/IMLocalization";
import { useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get("screen");

const PrimaryCareDoctorView = (props) => {
  const userRole = useSelector((state) => state.user.role);
  const { navigation } = props;
  const [activeSections, setActiveSections] = useState([0]);
  const [doctors, setDoctors] = useState([]);
  
  firestore()
  .collection("PCDoctors")
  .get()
  .then((querySnapshot) => {
    var doctorData = [];
    querySnapshot.docs.map((doc) => {
      doctorData.push(doc.data());
    });
    setDoctors(doctorData);
  });

  const navbarIcons = () => {
    if (userRole == "agent") {
      return (
        <Block row>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CreateDoctorAccount", { doctor: null })
            }
            style={[styles.touchableArea, {marginLeft: width * 0.6}]}
          >
            <Image source={require("../assets/images/add.png")}/>
          </TouchableOpacity>
        </Block>
      );
    }
  };

  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.openDrawer()}>
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
            style={{ paddingLeft: theme.SIZES.BASE * 0.5 }}
            size={16}
            fontWeight="semiBold"
          >
            {IMLocalized("doctors")}
          </Text>
          {navbarIcons()}
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  const _renderHeader = (section, index, isActive, sections) => {
    // alert(index)
    return (
      <Block flex style={[styles.container]}>
        <Block flex style={{ flexDirection: "row" }}>
          <Block style={[styles.picBox]}>
            <Image
              source={{
                uri: section && section.avatar,
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
            <Text size={22}>{section.name}</Text>
            <Text size={14} muted>
              {IMLocalized("phone")}: {section.phone}{" "}
            </Text>
          </Block>
          <Block center>
            <Icon
              name={isActive ? "chevron-up" : "chevron-down"}
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
            {IMLocalized("address")}: {section.address}
            {", "}
            {IMLocalized("city/state")}: {section.cityState}
          </Text>
        </Block>
      </Block>
    );
  };

  const _renderContent = (section) => {
    if (userRole == "agent") {
      return (
        <Block flex style={[styles.contentContainer]}>
          <Block flex style={{ flexDirection: "column" }}>
            <Block flex>
              <Text size={16}>
                <Text bold>{IMLocalized("description")}:</Text>
                {section.description}
              </Text>
            </Block>
          </Block>
          <Button
            shadowless
            color={"#00CE30"}
            style={styles.button}
            onPress={() =>navigation.navigate("AgentDoctorDetail", {doctor: section })}
          >
            <Text size={15} color={"white"}>
              {IMLocalized("detail")}
            </Text>
          </Button>
        </Block>
      );
    } else {
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
    setActiveSections(event);
  };

  const renderPatientsList = () => {
    return (
      <Block style={{ marginBottom: theme.SIZES.BASE * 2 }}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <Block height={theme.SIZES.BASE} flex></Block>
          {doctors.length == 0 ? (
            <ActivityIndicator size={50} color="#6E78F7" />
          ) : (
            <Accordion
              sections={doctors}
              activeSections={activeSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={onChangeHandle}
              style={{ backgroundColor: "white" }}
            />
          )}
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
    zIndex: 1,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 4,
    padding: theme.SIZES.BASE * 1.5,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  contentContainer: {
    zIndex: 100,
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
    marginBottom: -theme.SIZES.BASE * 0.8,
    width: theme.SIZES.BASE * 8,
    borderRadius: 15,
    alignSelf: 'flex-end',
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
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE * 0.5,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
});

export default PrimaryCareDoctorView;
