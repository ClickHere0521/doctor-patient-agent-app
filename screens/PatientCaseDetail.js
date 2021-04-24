import React, { useState } from "react";
import { materialTheme } from "../constants";
import SwitchButton from "switch-button-react-native";
import SvgUri from "expo-svg-uri";
import { Button, Block, Text, theme, Icon } from "galio-framework";
import { Products, Images } from "../constants";
import { Product, HorizontalListItem } from "../components";
import { IMLocalized } from "../src/localization/IMLocalization";
import { SliderBox } from "react-native-image-slider-box";

import {
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableOpacityComponent,
} from "react-native";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const DoctorScheduleDetail = (props) => {
  const { navigation } = props;
  const [activeSwitch, setActiveSwitch] = useState(1);
  const [images, setImages] = useState([
    "https://source.unsplash.com/900x900/?tree",
    "https://source.unsplash.com/700x700/?enjoy",
    "https://source.unsplash.com/1024x768/?general",
    "https://source.unsplash.com/500x500/?gun=161", // Network image
  ]);
  const renderDetails = (details) => {
    let { heading, doctor, symptom, appointment, medication } = { ...details };

    return (
      <Block style={styles.scheduleDetail}>
        <Text size={18}>{heading}</Text>
        <Text size={12}>{doctor}</Text>
        <Text style={{ marginTop: 10 }}>{symptom}</Text>
        <Text>{appointment}</Text>
        <Text bold style={{ marginTop: 10 }}>
          Medication{" "}
        </Text>
        <Text>{medication}</Text>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => navigation.navigate("TimeSlot")}
        >
          <Text color="#00CE30">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "absolute", top: -10, right: -10 }}
        >
          <SvgUri
            width="20"
            height="20"
            source={require("../assets/icons/topGreeenStatus.svg")}
            style={{ paddingLeft: 15 }}
          />
        </TouchableOpacity>
      </Block>
    );
  };

  return (
    <Block flex style={styles.patientInfo}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block
          flex
          center
          style={{ margin: 10, marginTop: theme.SIZES.BASE * 2 }}
        >
          <Image
            source={require("../assets/images/grayscale-photo-of-man2.png")}
            style={styles.imageStyle}
          ></Image>
          <Text size={20}>Dr. Ronald Joseph</Text>
          <Block flex flexDirection="row" center>
            <Text>neurosergion specialist</Text>
            <SvgUri
              width="20"
              height="20"
              source={require("../assets/icons/editGreen.svg")}
              style={{ paddingLeft: 15 }}
            />
          </Block>
        </Block>
        <Block flex flexDirection="row" style={{ margin: theme.SIZES.BASE }}>
          <Block flex={1}>
            <SliderBox
              images={images}
              parentWidth={width / 2 - 20}
              ImageComponentStyle={{ borderRadius: 15, width: "100%" }}
              onCurrentImagePressed={(index) =>
                console.warn(`image ${index} pressed`)
              }
            />
          </Block>
          <Block
            flex={1}
            flexDirection="column"
            style={{
              paddingLeft: theme.SIZES.BASE,
              paddingTop: theme.SIZES.BASE / 2,
            }}
          >
            <Block flex flexDirection="row">
              <Icon name="angle-down" family="font-awesome" size={20} />
              <Text style={{ paddingLeft: 14 }}>New case</Text>
            </Block>
            <Block flex flexDirection="row">
              <Icon name="angle-down" family="font-awesome" size={20} />
              <Text style={{ paddingLeft: 14 }}>Waiting schedule</Text>
            </Block>
            <Block flex flexDirection="row">
              <Icon name="angle-down" family="font-awesome" size={20} />
              <Text style={{ paddingLeft: 14 }}>Scheduled</Text>
            </Block>
            <Block flex flexDirection="row">
              <Icon name="angle-down" family="font-awesome" size={20} />
              <Text style={{ paddingLeft: 14 }}>Treatment</Text>
            </Block>
            <Block flex flexDirection="row">
              <Icon name="angle-down" family="font-awesome" size={20} />
              <Text style={{ paddingLeft: 14 }}>Treatment review</Text>
            </Block>
            <Block flex flexDirection="row">
              <Icon name="angle-down" family="font-awesome" size={20} />
              <Text style={{ paddingLeft: 14 }}>Discharged</Text>
            </Block>
          </Block>
        </Block>
        <Block style={styles.Container}>
          <Text style={styles.schedules} size={14}>
            Planned Remainders
          </Text>
        </Block>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          snapToInterval={theme.SIZES.BASE * 0.375}
          contentContainerStyle={{ paddingHorizontal: theme.SIZES.BASE / 2 }}
        >
          <TouchableOpacity style={styles.dateActive}>
            <Text size={16} color={"white"}>
              WED
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateInActive}>
            <Text size={16} style={{ paddingLeft: 3 }}>
              THU
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateInActive}>
            <Text size={16} style={{ paddingLeft: 8 }}>
              FRI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateInActive}>
            <Text size={16} style={{ paddingLeft: 6 }}>
              SAT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateInActive}>
            <Text size={16} style={{ paddingLeft: 4 }}>
              SUN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateInActive}>
            <Text size={16} style={{ paddingLeft: 4 }}>
              MON
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateInActive}>
            <Text size={16} style={{ paddingLeft: 4 }}>
              THE
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {renderDetails({
          heading: "Sevre Pain",
          doctor: "Dr. Naveed Baloch",
          symptom: "Symptoms: Headache",
          appointment: "Appointment Date: 23, November 2020",
          medication: "Esso 20g, Amastan 5/80g, Cipronxin 500g",
        })}
        {renderDetails({
          heading: "Sevre Pain",
          doctor: "Dr. Naveed Baloch",
          symptom: "Symptoms: Headache",
          appointment: "Appointment Date: 23, November 2020",
          medication: "Esso 20g, Amastan 5/80g, Cipronxin 500g",
        })}
        {renderDetails({
          heading: "Sevre Pain",
          doctor: "Dr. Naveed Baloch",
          symptom: "Symptoms: Headache",
          appointment: "Appointment Date: 23, November 2020",
          medication: "Esso 20g, Amastan 5/80g, Cipronxin 500g",
        })}
        {renderDetails({
          heading: "Sevre Pain",
          doctor: "Dr. Naveed Baloch",
          symptom: "Symptoms: Headache",
          appointment: "Appointment Date: 23, November 2020",
          medication: "Esso 20g, Amastan 5/80g, Cipronxin 500g",
        })}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  dateActive: {
    backgroundColor: "#00CE30",
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 5,
    alignSelf: "center",
    justifyContent: "center",
  },
  dateInActive: {
    backgroundColor: "#EdEdEd",
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 5,
    alignSelf: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    margin: 5,
  },
  centerBlock: {
    marginTop: 30,
  },
  scheduleDetail: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 10,
    padding: 10,
    margin: 8,
  },
  edit: {
    padding: 4,
    paddingLeft: 12,
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    position: "absolute",
    top: height * 0.03,
    right: width * 0.03,
    borderColor: "#00CE30",
  },
  patientInfo: {
    marginTop: Platform.OS === "android" ? height * 0.03 : height * 0.03,
    backgroundColor: "white",
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
  },
  Container: {
    width: width,
    height: "auto",
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative",
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 90,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: "relative",
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE,
    marginBottom: 0,
    paddingTop: height * 0.02,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    elevation: 3,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 8,
    shadowOpacity: 0.8,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    position: "absolute",
  },
  past: {
    borderRadius: 10,
    paddingHorizontal: 44,
    paddingVertical: 6,
    backgroundColor: "#3B3E51",
  },
  schedules: {
    alignContent: "flex-start",
    alignSelf: "flex-start",
  },

  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
    paddingRight: theme.SIZES.BASE,
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBlock: {
    width: width / 2 - theme.SIZES.BASE * 2,
    height: 200,
    overflow: "hidden",
    borderRadius: 4,
  },
});

export default DoctorScheduleDetail;
