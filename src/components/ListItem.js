import React, { useState, useEffect } from "react";
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
import { IMLocalized } from "../localization/IMLocalization";
import { CheckBox } from "react-native-elements";

const { width } = Dimensions.get("screen");

const ListItem = (props) => {
  const {
    navigation,
    product,
    category,
    horizontal,
    full,
    style,
    priceColor,
    imageStyle,
    time,
    unReaden,
    weekday,
    role,
    index,
    handleCheck
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
          <Block></Block>
          // <Block
          //   center
          //   middle
          //   style={{
          //     borderRadius: 50,
          //     backgroundColor: "#FFC875",
          //     width: theme.SIZES.BASE,
          //     height: theme.SIZES.BASE,
          //     position: "absolute",
          //     right: -5,
          //     top: -5,
          //   }}
          // >
          //   <Icon
          //     name="check"
          //     family="font-awesome"
          //     color={theme.COLORS.WHITE}
          //     size={theme.SIZES.BASE * 0.8}
          //     style={{ justifyContent: 'center', paddingLeft: 1.5 }}
          //   >
          //     {" "}
          //   </Icon>
          // </Block>
        );
      case "agentCases":
        return (
          <Block
            center
            middle
            style={{
              borderRadius: 50,
              backgroundColor: "#FFC875",
              width: theme.SIZES.BASE,
              height: theme.SIZES.BASE,
              position: "absolute",
              right: -5,
              top: -5,
            }}
          >
            <Icon
              name="check"
              family="font-awesome"
              color={theme.COLORS.WHITE}
              size={theme.SIZES.BASE * 0.8}
              style={{ justifyContent: 'center', paddingLeft: 1.5 }}
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
      case "agentPatient":
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
                    navigation.navigate("CreateCase", {selectedPatient: category});
                    break;
                  }
                  case "doctor": {
                    navigation.navigate("DoctorCaseDetail");
                    break;
                  }
                  // case "patient": {
                  //   navigation.navigate("CreateCase");
                  //   break;
                  // }
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
                    navigation.navigate("AddPatient", { editPatient: true, addPermission: false, fromCreateCase: false, category});
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
                size={11}
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
              onPress={() => navigation.navigate("PatientCaseFile", {category})}
            >
              <Text
                size={12}
                center
                style={{ justifyContent: "center", alignItems: "center" }}
                color={"#FFF"}
                fontWeight={"semiBold"}
              >
                {IMLocalized("upload")}
              </Text>
            </Button>
            <Button
              shadowless
              color={"#06D81E"}
              style={[styles.button, styles.shadow]}
              size={11}
              onPress={() => navigation.navigate("DoctorCaseDetail", {category})}
            >
              <Text
                size={12}
                center
                style={{ justifyContent: "center", alignItems: "center" }}
                color={"#FFF"}
              >
                {IMLocalized("detail")}
              </Text>
            </Button>
          </>
        );
      case "schedulePatientList":
        return (
          <Block style={{top: 12, right: -30}}>
            <CheckBox
              checked={category && category.booking.isChecked}
              onPress={() => handleCheck(index)}
            />
          </Block>
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
                  navigation.navigate("AgentCaseDetail", { category });
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
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "New Case";
      case 2:
        return "Waiting Schedule";
      case 3:
        return "Schduled";
      case 4:
        return "Treatment";
      case 5:
        return "Treatment Review";
      case 6:
        return "Discharged";
    }
  }
  const pAvatar = () => {
    {
      if (role == "agentPatient") {
        return <Image source={{ uri: (category && category.avatar) || 'https://firebasestorage.googleapis.com/v0/b/amgwf-70a28.appspot.com/o/avatar%2FuserDefault.png?alt=media&token=b58fe00e-cffd-4a50-b7f4-67a07f89c90e' }} style={imageStyles} />;
      } else if (role == "schedulePatientList") {
          return <Image source={{ uri: (category && category.booking.patientAvatar) || 'https://firebasestorage.googleapis.com/v0/b/amgwf-70a28.appspot.com/o/avatar%2FuserDefault.png?alt=media&token=b58fe00e-cffd-4a50-b7f4-67a07f89c90e' }} style={imageStyles} />;
        } else {
            return <Image source={{ uri: (category && category.patientInfo.avatar) || 'https://firebasestorage.googleapis.com/v0/b/amgwf-70a28.appspot.com/o/avatar%2FuserDefault.png?alt=media&token=b58fe00e-cffd-4a50-b7f4-67a07f89c90e' }} style={imageStyles} />;
        }
    }
  }
  const pName = () => {
    if (role == "agentPatient") {
      return category && category.name;
    } else if (role == "schedulePatientList") {
        return category && category.booking.patientName;
      } else {
          return category && category.patientInfo.patientName;
      }
  }
  const pDate = () => {
    if (role == "agentPatient") {
      return (
        <Text size={11} style={styles.times} color={"#06D81E"}>
          {category.DOB.toDate().toDateString()}
        </Text>
      )
    } else if (role == "schedulePatientList") {
        return null;
      } else {
          return (
            <Text size={11} style={styles.times} color={"#06D81E"}>
              {category.caseCreateTime.toDate().toDateString()}
            </Text>
          )
        }
  }
  const pStatus = () => {
    if (role != "schedulePatientList" && role != "agentPatient" && category)
      return getStatusText(category.caseStatus);
    if (role == "schedulePatientList")  
      return category && category.booking && category.booking.bookingTime.toDate().toDateString();
  }
  return (
    <Block
      row={horizontal}
      card
      flex
      style={[styles.product, styles.shadow, style]}
    >
      <TouchableWithoutFeedback
      >
        <Block style={[styles.imageContainer, styles.shadow]}>
          {pAvatar()}
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => console.log("Patient Pressed")}>
        <Block flex={2}>
          <Text size={15} style={styles.userName}>
            {pName()}
          </Text>
          <Text
            size={12}
            muted={!priceColor}
            color={priceColor}
            style={styles.content}
          >
            {pStatus()}
          </Text>
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => console.log("Patient Pressed")}>
        <Block flex={1}>
          {pDate()}
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
    height: theme.SIZES.BASE * 3.5,
    width: theme.SIZES.BASE * 3.5,
    borderWidth: 2,
    borderColor: theme.COLORS.WHITE,
  },
  fullImage: {
    height: 150,
    width: width - theme.SIZES.BASE * 4,
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
    padding: theme.SIZES.BASE,
    paddingBottom: 0,
  },
  content: {
    padding: theme.SIZES.BASE / 2,
    paddingLeft: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  icons: {
    paddingTop: 2,
    paddingRight: 2,
  },
  button: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 1.2,
    position: "absolute",
    right: theme.SIZES.BASE / 4,
    borderRadius: 40,
    bottom: 0,
  },
  createBtn: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 1.2,
    position: "absolute",
    right: theme.SIZES.BASE * 4,
    borderRadius: 40,
    bottom: 0,
  },
});

export default withNavigation(ListItem);
