import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme, Input, Icon } from "galio-framework";
import { CheckBox } from "react-native-elements";
import { useSelector } from "react-redux";
import { IMLocalized, init } from "../localization/IMLocalization";

const { width, height } = Dimensions.get("screen");

const AgentReview = (props) => {
  const userRole = useSelector((state) => state.user.role);
  const { navigation } = props;
  const [reviews, setReviews] = useState([
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
    tempReviews[index].checked = !tempReviews[index].checked;
    setReviews(tempReviews);
  };

  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
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
            style={{ paddingLeft: theme.SIZES.BASE }}
            size={20}
            fontWeight="semiBold"
          >
            Case Final Review
            {/* {IMLocalized("Case Final Review")} */}
          </Text>
          {/* <TouchableOpacity>
            <Image
              source={require("../assets/icons/editHeaderBlack.png")}
              alt=""
              style={{ marginLeft: width * 0.4 }}
            />
          </TouchableOpacity> */}
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  return (
    <Block flex style={styles.review}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block style={styles.reviewContent}>
          {reviews.map((value, index) => {
            return (
              <Block key={index} style={styles.content}>
                <CheckBox
                  title={value.title}
                  disabled={userRole == 'agent' ? false : true}
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
    marginVertical: 10,
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
    backgroundColor: "#00CE30",
  },
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
});

export default AgentReview;
