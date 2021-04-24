import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Button, Block, Text, theme, Input, Icon } from "galio-framework";

import { materialTheme } from "../constants";
import { CheckBox } from "react-native-elements";
import SvgUri from "expo-svg-uri";
import { set } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const AgentReview = (props) => {
  const { navigation } = props;

  const [ reviews, setReviews ] = useState ([
    {
      title: "02/03/2021",
      checked: true,
    },
    {
      title: "12/03/2021",
      checked: true,
    },
    {
      title: "27/03/2021",
      checked: true,
    },
    {
      title: "29/03/2021",
      checked: true,
    },
    {
      title: "30/03/2021",
      checked: true,
    },
    {
      title: "01/04/2021",
      checked: false,
    },
    {
      title: "12/04/2021",
      checked: false,
    },
    {
      title: "20/04/2021",
      checked: false,
    },
  ]);

  const handleCheck = (index) => {
    let tempReviews = [...reviews];    
    tempReviews[index].checked = !(tempReviews[index].checked);
    setReviews(tempReviews)
  }

  return (
    <Block flex style={styles.review}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block row style={styles.title}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              family="font-awesome"
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text size={22}>Case Final Review</Text>
          <SvgUri
            width="25"
            height="25"
            source={require("../assets/icons/headerEditBlack.svg")}
            style={{
              position: "absolute",
              right: 0,
              marginTop: 6,
            }}
          />
        </Block>
        <Block style={styles.reviewContent}>
          {reviews.map((value, index) => {
            return (
              <Block key={index} style={styles.content}>
                <CheckBox
                  title={value.title}
                  checked={value.checked}
                  containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
                  onPress={() => handleCheck(index)}
                />
              </Block>
            );
          })}
        </Block>
        <Block center style={styles.saveBtn}>
          <TouchableOpacity onPress={() => console.log("saved")}>
            <Text bold color={"white"} size={16}>
              Save/Discharged case
            </Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  review: {
    paddingTop: Platform.OS === "android" ? height * 0.02 : height * 0.02,
    backgroundColor: "white",
    width: width,
  },
  title: {
    marginTop: height * 0.1,
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.03,
  },
  backIcon: {
    padding: theme.SIZES.BASE * 0.5,
  },
  reviewContent: {
    marginHorizontal: height * 0.07,
    textAlign: "right",
  },
  content: {
    paddingHorizontal: 10,
    textAlign: "right",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 30,
    backgroundColor: "white",
    marginVertical: 10
  },
  text: {
    alignSelf: "flex-end",
    fontSize: 16,
  },
  saveBtn: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 50,
    borderRadius: 30,
    backgroundColor: "#00CE30"
  }
});

export default AgentReview;
