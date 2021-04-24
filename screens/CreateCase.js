import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Icon } from "../components";
import SvgUri from "expo-svg-uri";

const { width, height } = Dimensions.get("screen");

const CreateCase = (props) => {
  const { navigation } = props;

  const Action = (props) => {
    if (props.action == "") return <></>;
    if (props.action == "add")
      return (
        <TouchableOpacity onPress={() => navigation.navigate(props.link)}>
          <SvgUri
            width="16"
            height="16"
            source={require("../assets/icons/add.svg")}
          />
        </TouchableOpacity>
      );
    if (props.action == "edit")
      return (
        <TouchableOpacity onPress={() => navigation.navigate(props.link)}>
          <SvgUri
            width="16"
            height="16"
            source={require("../assets/icons/editBlack.svg")}
          />
        </TouchableOpacity>
      );
  };

  const renderDetils = (details) => {
    let { heading, action, link } = {
      ...details,
    };

    return (
      <Block row center style={styles.caseContent}>
        <Block>
          <Text size={16}>{heading}</Text>
        </Block>
        <Block style={{ position: "absolute", right: 20 }}>
          <Action action={action} link={link} />
        </Block>
      </Block>
    );
  };

  return (
    <Block flex style={styles.notification}>
      <Block>
        <Block style={styles.roundBlock}>
          <Block row style={styles.heading}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                size={16}
                name="chevron-left"
                family="font-awesome"
                color={"white"}
                style={{ padding: 7 }}
              />
            </TouchableOpacity>
            <Block>
              <Text
                color="white"
                size={20}
                style={{ fontFamily: "Inter-Black" }}
                bold
              >
                Create Case
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>

      <ScrollView
        vertical={true}
        showsVerticalScrollIndicator={false}
        style={{ top: height * 0.16 }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("AddPatient")} style={{width:60}}>
          <Image source={require("../assets/images/createCase.png")} />
        </TouchableOpacity>
        <Block row>
          <Text size={10} style={{ left: theme.SIZES.BASE * 1.8 }}>
            Add
          </Text>       
          <TouchableOpacity style={{position: "absolute", right: 20}}>
          <Text size={10} style={{ textDecorationLine: 'underline' }} 
            onPress={() => navigation.navigate("Cases")}
          >
            Choose from current case
          </Text>
          </TouchableOpacity>   
        </Block>

        <Block row center style={styles.patientHeading}>
          <Image source={require("../assets/images/avatar.png")} />
          <Block column>
            <Text bold size={16}>
              Edie Sparks
            </Text>
            <Text color={"#909CA1"} style={{ paddingTop: theme.SIZES.BASE }}>
              1993/04/29
            </Text>
          </Block>
          <Block column style={{ paddingLeft: width * 0.3 }}>
            <Text style={{ alignSelf: "flex-end" }} color={"#06D81E"}>
              11:45 AM
            </Text>
            <SvgUri
              width="20"
              height="20"
              source={require("../assets/icons/editGreen.svg")}
              style={{
                right: -theme.SIZES.BASE * 2,
                paddingTop: theme.SIZES.BASE,
              }}
            />
          </Block>
        </Block>
        <Block>
          <Text
            size={16}
            bold
            style={{
              paddingBottom: 10,
              paddingTop: 10,
              paddingLeft: theme.SIZES.BASE,
            }}
          >
            Case Info
          </Text>
          {renderDetils({
            heading: "Created time:2022.2.14",
            action: "",
            link: "",
          })}
          {renderDetils({
            heading: "Date of Injury:2022.2.10",
            action: "",
            link: "",
          })}
          {renderDetils({
            heading: "Attorney Info",
            action: "add",
            link: "AddAttorney",
          })}
          {renderDetils({
            heading: "Insurance Info",
            action: "add",
            link: "AddInsurance",
          })}
          {renderDetils({
            heading: "Notes",
            action: "add",
            link: "AddNotes",
          })}
          {renderDetils({
            heading: "Case Files",
            action: "",
            link: "",
          })}
        </Block>
        <Block row style={{ marginBottom: 100 }} center>
          <TouchableOpacity
            style={styles.save}
            onPress={() => console.log("save")}
          >
            <Text color={"white"} size={16}>
              Save and send notification
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.save}
            onPress={() => console.log("cancel")}
          >
            <Text color={"white"} size={16}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  notification: {
    paddingVertical: theme.SIZES.BASE / 3,
    backgroundColor: theme.COLORS.WHITE,
  },
  schedule: {
    paddingHorizontal: width * 0.03,
    marginTop: height * 0.02,
    marginHorizontal: width * 0.04,
    borderRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
    zIndex: 2,
  },
  title: {
    paddingTop: theme.SIZES.BASE / 2,
    paddingBottom: theme.SIZES.BASE * 1.5,
  },
  rows: {
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE * 1.25,
  },
  roundBlock: {
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    position: "absolute",
    backgroundColor: "rgba(100, 120, 247, 0.84)",
    height: height * 0.16,
    width: width,
    top: -10,
    zIndex: 2,
  },
  dateActive: {
    backgroundColor: "#00CE30",
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 4,
    width: 80,
    height: 34,
  },
  dateInActive: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 18,
    paddingHorizontal: 4,
    paddingVertical: 5,
    marginRight: 4,
    width: 80,
    height: 34,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  heading: {
    marginTop: height * 0.08,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    position: "absolute",
    zIndex: 1,
  },
  body: {
    marginTop: height * 0.21,
    position: "absolute",
    zIndex: 5,
  },
  check: {
    position: "absolute",
    zIndex: 5,
    right: -width * 0.05,
    top: -height * 0.01,
  },
  patientHeading: {
    width: width * 0.92,
    borderColor: "#F1F1F1",
    borderRadius: 20,
    shadowColor: "grey",
    shadowOpacity: 0.2,
    shadowOpacity: 5,
    elevation: 2,
    backgroundColor: "#FEFEFE",
  },
  caseContent: {
    width: width * 0.92,
    borderColor: "#F1F1F1",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOpacity: 0.2,
    shadowOpacity: 5,
    elevation: 2,
    backgroundColor: "#FEFEFE",
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
  },
  save: {
    backgroundColor: "#00CE30",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 80,
    marginHorizontal: 20,
  },
});

export default CreateCase;
