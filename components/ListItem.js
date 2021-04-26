import React, { useState } from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import Icon from "./Icon";
import Button from "./Button";
import { useSelector } from "react-redux";
import { IMLocalized } from "../src/localization/IMLocalization";
import { set } from "react-native-reanimated";
import { CheckBox } from "react-native-elements";

const { width } = Dimensions.get("screen");

const ListItem = (props) => {
  const {
    navigation,
    product,
    horizontal,
    full,
    style,
    priceColor,
    imageStyle,
    time,
    unReaden,
    weekday,
    role,
  } = props;

  const imageStyles = [
    styles.image,
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];
  const userRole = useSelector((state) => state.user.role);

  const showCheck = (role) => {
    switch (role) {
      case "agentPatient":
        return <></>;
      case "agentDashboard":
        return (
          <Block
            center
            middle
            style={{
              borderRadius: 50,
              backgroundColor: "#06D81E",
              width: theme.SIZES.BASE * 1.3,
              height: theme.SIZES.BASE * 1.3,
              position: "absolute",
              right: -5,
              top: -5,
            }}
          >
            <Icon
              name="check"
              family="font-awesome"
              color={theme.COLORS.WHITE}
              size={theme.SIZES.BASE}
              style={{ paddingLeft: 3, paddingTop: 0 }}
            >
              {" "}
            </Icon>
          </Block>
        );
      case "agentCases":
        return (
          <Block
            center
            middle
            style={{
              borderRadius: 50,
              backgroundColor: "#06D81E",
              width: theme.SIZES.BASE * 1.3,
              height: theme.SIZES.BASE * 1.3,
              position: "absolute",
              right: -5,
              top: -5,
            }}
          >
            <Icon
              name="check"
              family="font-awesome"
              color={theme.COLORS.WHITE}
              size={theme.SIZES.BASE}
              style={{ paddingLeft: 3, paddingTop: 0 }}
            >
              {" "}
            </Icon>
          </Block>
        );
      case "schedulePatientList":
        return;
    }
  };

  const renderButtons = (role) => {
    switch (role) {
      case "agentPatinet":
        return (
          <>
            <Button
              shadowless
              color={"#06D81E"}
              style={[styles.createBtn, styles.shadow]}
              size={12}
              onPress={() => {
                switch (userRole) {
                  case "agent": {
                    navigation.navigate("CreateCase");
                    break;
                  }
                  case "doctor": {
                    navigation.navigate("DoctorCaseDetail");
                    break;
                  }
                  default:
                    break;
                }
              }}
            >
              <Text
                size={12}
                center
                style={{ justifyContent: "center", alignItems: "center" }}
                color={"#FFF"}
                fontWeight={"semiBold"}
              >
                Create
              </Text>
            </Button>
            <Button
              shadowless
              color={"#06D81E"}
              style={[styles.button, styles.shadow]}
              size={12}
              onPress={() => {
                switch (userRole) {
                  case "agent": {
                    navigation.navigate("AgentCaseDetail");
                    break;
                  }
                  case "doctor": {
                    navigation.navigate("DoctorCaseDetail");
                    break;
                  }
                  default:
                    break;
                }
              }}
            >
              <Text
                size={12}
                center
                style={{ justifyContent: "center", alignItems: "center" }}
                color={"#FFF"}
                fontWeight={"semiBold"}
              >
                Detail
              </Text>
            </Button>
          </>
        );
      case "doctorCase":
        return (
          <>
            <Button
              shadowless
              color={"#06D81E"}
              style={[styles.createBtn, styles.shadow]}
              size={12}
              onPress={() => navigation.navigate("PatientCaseFile")}
            >
              <Text
                size={12}
                center
                bold
                style={{ justifyContent: "center", alignItems: "center" }}
                color={"#FFF"}
                fontWeight={"semiBold"}
              >
                {IMLocalized("Upload")}
              </Text>
            </Button>
            <Button
              shadowless
              color={"#06D81E"}
              style={[styles.button, styles.shadow]}
              size={12}
              onPress={() => navigation.navigate("DoctorCaseDetail")}
            >
              <Text
                size={12}
                center
                bold
                style={{ justifyContent: "center", alignItems: "center" }}
                color={"#FFF"}
                fontWeight={"semiBold"}
              >
                {IMLocalized("Detail")}
              </Text>
            </Button>
          </>
        );
      case "schedulePatientList":
        return (
          <CheckBox
            checked={true}
            // containerStyle={{ borderWidth: 0 }}
            onPress={() => console.log("pressed")}
          />
        );
      default:
        return (
          <Button
            shadowless
            color={"#06D81E"}
            style={[styles.button, styles.shadow]}
            size={12}
            onPress={() => {
              switch (userRole) {
                case "agent": {
                  navigation.navigate("AgentCaseDetail");
                  break;
                }
                case "doctor": {
                  navigation.navigate("DoctorCaseDetail");
                  break;
                }
                default:
                  break;
              }
            }}
          >
            <Text
              size={12}
              center
              bold
              style={{ justifyContent: "center", alignItems: "center" }}
              color={"#FFF"}
              fontWeight={"semiBold"}
            >
              Detail
            </Text>
          </Button>
        );
    }
  };

  return (
    <Block
      row={horizontal}
      card
      flex
      style={[styles.product, styles.shadow, style]}
    >
      <TouchableWithoutFeedback
        onPress={() => ("Product", { product: product })}
      >
        <Block style={[styles.imageContainer, styles.shadow]}>
          <Image source={{ uri: product.image }} style={imageStyles} />
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => console.log("Patient Pressed")}>
        <Block flex={2}>
          <Text size={16} style={styles.userName}>
            {product.title}
          </Text>
          <Text
            size={14}
            muted={!priceColor}
            color={priceColor}
            style={styles.content}
          >
            {role != "schedulePatientList" && product.content}
          </Text>
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => console.log("Patient Pressed")}>
        <Block flex={1}>
          <Text size={12} style={styles.times} color={"#06D81E"}>
            {product.time}
          </Text>
          {renderButtons(role)}
        </Block>
      </TouchableWithoutFeedback>
      {showCheck(role)}
    </Block>
  );
};

const styles = StyleSheet.create({
  product: {
    backgroundColor: "#F8F8F8",
    marginVertical: theme.SIZES.BASE / 2,
    marginHorizontal: theme.SIZES.BASE / 4,
    borderWidth: 2,
    borderColor: theme.COLORS.WHITE,
    minHeight: theme.SIZES.BASE * 2,
    borderRadius: theme.SIZES.BASE,
  },
  productTitle: {
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
    width: width / 1.5,
  },
  image: {
    borderRadius: 1000,
    marginHorizontal: theme.SIZES.BASE / 2,
    margin: theme.SIZES.BASE / 2,
  },
  horizontalImage: {
    height: theme.SIZES.BASE * 4.5,
    width: theme.SIZES.BASE * 4.5,
    borderWidth: 2,
    borderColor: theme.COLORS.WHITE,
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.4,
    elevation: 5,
  },
  times: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
    alignSelf: "center",
  },
  userName: {
    padding: theme.SIZES.BASE / 2,
    paddingBottom: 0,
  },
  content: {
    padding: theme.SIZES.BASE / 2,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  icons: {
    paddingTop: 2,
    paddingRight: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 1.5,
    position: "absolute",
    right: theme.SIZES.BASE / 4,
    borderRadius: 40,
    bottom: 0,
  },
  createBtn: {
    marginBottom: theme.SIZES.BASE,
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 1.5,
    position: "absolute",
    right: theme.SIZES.BASE * 4,
    borderRadius: 40,
    bottom: 0,
  },
});

export default withNavigation(ListItem);
