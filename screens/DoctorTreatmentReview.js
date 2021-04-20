import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity
} from "react-native";
import { Button, Block, Text, theme, Input, Icon } from "galio-framework";

import { materialTheme } from "../constants";
import SwitchButton from "switch-button-react-native";
import { SvgUri } from "react-native-svg";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const DoctorReview = (props) => {
  const { navigation } = props;

  return (
    <Block center flex style={styles.review}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block row style={styles.title}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" family="font-awesome"  style={styles.backIcon} />
          </TouchableOpacity>
          <Text size={22}>Treatment Review</Text>          
          <TouchableOpacity style={styles.editBtn}>
            <Icon name="edit" family="font-awesome" size={20}  />
          </TouchableOpacity>          
        </Block>
        <Block style={styles.reviewHeading}>
          <Text size={22}>Well, well, well, how the turntables</Text>
        </Block>
        <Block style={styles.reviewContent}>
          <Text size={17}>
            Wikipedia is the best thing ever. Anyone in the world can write
            anything they want about any subject. So you know you are getting
            the best possible information. 
            And I knew exactly what to do. But in
            a much more real sense, I had no idea what to do. Okay, too many
            different words from coming at me from too many different sentences.
          </Text>
        </Block>
        <Block center style={styles.saveBtn}>
          <TouchableOpacity
            onPress={() => console.log("saved")}
          >
            <Text bold color={'white'} size={16} >Save</Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  review: {
    marginTop: Platform.OS === "android" ? height * 0.02 : height * 0.02,
  },
  reviewHeading: {
    paddingVertical: theme.SIZES.BASE * 1,
    paddingHorizontal: theme.SIZES.BASE * 1,
    width: width * 0.85,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    borderRadius: 20,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    // shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  reviewContent: {
    paddingVertical: theme.SIZES.BASE * 1,
    paddingHorizontal: theme.SIZES.BASE * 1,
    width: width * 0.85,
    height: height * 0.5,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    borderRadius: 20,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    // shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 5,
    marginVertical: 5,
    marginHorizontal: 5,    
  },
  title: {
    marginTop: theme.SIZES.BASE * 4,
    marginBottom: theme.SIZES.BASE * 2,
    marginHorizontal: width * 0.01,
  },
  backIcon: {
    padding: 8
  },
  saveBtn: {
    backgroundColor: "#6E78F7",
    borderRadius: 22,
    paddingHorizontal: 50,
    paddingVertical: 12,
    marginVertical: 20,
  },
  editBtn: {
    width: 30,
    height: 'auto',
    position: 'absolute',
    right: 0,    
    top: theme.SIZES.BASE * 0.5    
  }
});

export default DoctorReview;
