import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme, Button } from "galio-framework";

import materialTheme from "../constants/Theme";
import { Icon } from "../components";
import { IMLocalized } from "../localization/IMLocalization";

const { width, height } = Dimensions.get("screen");

const CaseHistory = (props) => {
  const { navigation } = props;
  const renderCases = (cases) => {
    let { heading, subHeading1, subHeading2, subHeading3, date } = cases;

    return (
      <Block style={styles.schedule}>
        <Block row>
          <Block middle style={styles.padTop10}>
            <Text bold size={18} style={styles.caseTitle}>
              {heading}
            </Text>
            <Block style={styles.blockText}>
              <Text style={styles.marBtm5}>{subHeading1}</Text>
              <Text style={styles.marBtm5}>{subHeading2}</Text>
            </Block>
            <Block style={{marginLeft: width * 0.5}}>
              <Button color="white" style={styles.modalButton} onPress={() => navigation.navigate('PatientCaseDetail')}><Text size={14} color="#3A58FC">Detail</Text></Button>
            </Block>
          </Block>
        </Block>
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
            {IMLocalized("caseHistory")}
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  return (
    <Block flex style={styles.notification}>
      {navbar()}
      <TouchableOpacity style={[styles.dateActive]}>
        <Text size={12} color={"white"}>
          {IMLocalized("recent")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dateInActive}>
        <Text size={12}>
          {IMLocalized('injuryTime')}
        </Text>
      </TouchableOpacity>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        {renderCases({
          heading: "Get 50% off on complete medical checkup",
          subHeading1: "MBBS,DOMS,MS - Ophthalmology",
          subHeading2: "Ophthalmologist",
          subHeading3: "26 years of experience",
          date: "02/16/2021",
        })}
        {renderCases({
          heading: "Get 50% off on complete medical checkup",
          subHeading1: "MBBS,DOMS,MS - Ophthalmology",
          subHeading2: "Ophthalmologist",
          subHeading3: "26 years of experience",
          date: "02/16/2021",
        })}
        {renderCases({
          heading: "Get 50% off on complete medical checkup",
          subHeading1: "MBBS,DOMS,MS - Ophthalmology",
          subHeading2: "Ophthalmologist",
          subHeading3: "26 years of experience",
          date: "02/16/2021",
        })}
        {renderCases({
          heading: "Get 50% off on complete medical checkup",
          subHeading1: "MBBS,DOMS,MS - Ophthalmology",
          subHeading2: "Ophthalmologist",
          subHeading3: "26 years of experience",
          date: "02/16/2021",
        })}
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
  modalButton: {
    width: width * 0.25,
    height: theme .SIZES.BASE * 2,
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: "#C7C7C7",
    marginTop: theme.SIZES.BASE
  },
  notification: {
    paddingVertical: theme.SIZES.BASE / 3,
  },
  caseTitle: {
    alignSelf: "flex-start",
    paddingVertical: 5,
  },
  schedule: {
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
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
  blockText: {
    color: 'grey',
    borderRadius: 5,
    borderColor: theme.COLORS.GREY,
    padding: 8,
    paddingBottom: 0,
    width: width * 0.82,
  },
  padTop10: {
    paddingTop: 10,
  },
  marBtm5: {
    marginBottom: 5,
    color: 'grey'
  },
  padVrt1: {
    paddingVertical: 1,
  },
  marRight40: {
    marginRight: 40,
  },
  dateActive: {
    backgroundColor: "#00CE30",
    borderRadius: 18,
    width: 90,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 5,
    top: height * 0.09,
    left: width * 0.2
  },
  dateInActive: {
    backgroundColor: "white",
    borderRadius: 18,
    width: 90,
    height: 25,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 5,
    zIndex: 5,
    top: height * 0.09,
    left: width * 0.6
  },
});

export default CaseHistory;
