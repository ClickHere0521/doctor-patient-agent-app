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
import { Block, Text, theme, Icon } from "galio-framework";
import { materialTheme } from "../constants";
import SwitchButton from "switch-button-react-native";
import SvgUri from "expo-svg-uri";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const DoctorScheduleDetail = (props) => {
  const { navigation } = props;
  const [activeSwitch, setActiveSwitch] = useState(1);

  const renderDetails = (details) => {
    let { heading, doctor, symptom, appointment, medication } = { ...details };

    return (
      <Block style={styles.scheduleDetail}>
        <SvgUri
          width="24 "
          height="24"
          source={require("../assets/icons/check.svg")}
          style={{
            position: "absolute",
            right: -4,
            top: -4
          }}
        />
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
      </Block>
    );
  };

  return (
    <Block flex style={styles.patientInfo}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            family="font-awesome"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Block center style={{ paddingTop: 10 }}>
          <Image
            source={require("../assets/images/grayscale-photo-of-man2.png")}
            style={styles.imageStyle}
          ></Image>
          <Text size={20}>Dr. Ronald Joseph</Text>
          <Text>neurosergion specialist</Text>
          <SvgUri
            width="20"
            height="20"
            source={require("../assets/icons/edit.svg")}
            style={{
              position: "absolute",
              right: -30,
              top: theme.SIZES.BASE * 6,
            }}
          />
          <Block center style={styles.centerBlock}>
            <SwitchButton
              onValueChange={(val) => setActiveSwitch(val)}
              text1="Past"
              text2="Upcoming"
              switchWidth={180}
              switchHeight={40}
              switchdirection="rtl"
              switchBorderRadius={100}
              switchSpeedChange={500}
              switchBorderColor="#3B3E51"
              switchBackgroundColor="#fff"
              btnBorderColor="#3B3E51"
              btnBackgroundColor="#3B3E51"
              fontColor="#3B3E51"
              activeFontColor="#fff"
            />
          </Block>
        </Block>
        <Block style={styles.Container}>
          <Text style={styles.schedules}>Schedules</Text>
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
            <Text size={16}>MON</Text>
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
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  dateActive: {
    backgroundColor: "#00CE30",
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 20,
    marginRight: 4,
  },
  dateInActive: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 18,
    paddingHorizontal: 4,
    paddingVertical: 20,
    marginRight: 4,
    width: 50,
  },
  imageStyle: {
    width: 80,
    height: 80,
  },
  centerBlock: {
    marginTop: 30,
  },
  scheduleDetail: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 10,
    padding: 20,
    margin: 8,
  },
  edit: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 20,
    width: 80,
    position: "absolute",
    top: height * 0.03,
    right: width * 0.03,
    borderColor: "#00CE30",
    alignItems: "center",
  },
  patientInfo: {
    paddingTop: Platform.OS === "android" ? height * 0.1 : height * 0.1,
    paddingHorizontal: width * 0.02,
    // paddingTop: height * 0.1,
    // marginHorizontal: width * 0.04,
    backgroundColor: "white",
    // shadowColor: 'black',
    // shadowOffset: { width: 10, height: 10 },
    // shadowRadius: 8,
    // shadowOpacity: 0.8,
    // elevation: 3,
    // borderRadius: 10
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
  backIcon: {
    marginLeft: theme.SIZES.BASE,    
  },
});

export default DoctorScheduleDetail;
