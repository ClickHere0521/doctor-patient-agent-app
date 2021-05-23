import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme, Icon, NavBar } from "galio-framework";
import { materialTheme } from "../constants";
import SwitchButton from "switch-button-react-native";
import firebase from "firebase";
import SvgUri from "expo-svg-uri";
import { set } from "react-hook-form";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const DoctorScheduleDetail = (props) => {
  const { navigation } = props;
  const { doctorId } = props.route.params;
  const firestore = firebase.firestore();
  const [activeSwitch, setActiveSwitch] = useState(1);
  const [weekState, setWeekState] = useState([
    {
      date: "MON",
      status: true,
    },
    {
      date: "TUE",
      status: false,
    },
    {
      date: "WED",
      status: false,
    },
    {
      date: "THU",
      status: false,
    },
    {
      date: "FRI",
      status: false,
    },
    {
      date: "SAT",
      status: false,
    },
    {
      date: "SUN",
      status: false,
    },
  ]);
  const [doctor, setDoctor] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [childDay, setChildDay] = useState([]);
  const tempSchedule = [];
  const childDayList = [];
  let tempDoctor = {};
  console.log('fdsfdsfds', doctorId);
  useEffect(() => {
    firestore.collection('PCDoctors').doc(doctorId).collection('PCDoctor').get().then((querySnapShot) => {
      querySnapShot.forEach((doctorDoc) => {
        const {address, city_state, email, name, phone, description, password} = doctorDoc.data();
        firestore.collection('PCDoctors').doc(doctorId).collection('PCDoctor').doc(doctorDoc.id).collection('ScheduleInfo').get().then((querySnapShot) => {
          querySnapShot.forEach((res) => {
            const { patientName, caseID, caseReference, scheduleTime } = res.data();
            const time = new Date(scheduleTime.seconds * 1000 + scheduleTime.nanoseconds/1000000);
            childDayList.push(`${time.getFullYear()}-${time.getMonth()<10 ? 0 : null}${time.getMonth()+1}-${time.getDate()}`);
            tempSchedule.push({
              patientName,
              time: time.toUTCString(),
              caseID,
              year: time.getFullYear(),
              month: time.getMonth(),
              day: time.getDate(),
            });
          })
        })
        setChildDay(childDayList);
        setSchedule(tempSchedule);
        tempDoctor = {
          name, address, city_state, email, name, phone, description, password,
        }
      })
      setDoctor(tempDoctor);
    })
  }, []);

  const weekBar = () => {
    const handleWeekbar = index => {
      weekState.map((value, indexTemp) => {
        weekState[indexTemp].status = (index == indexTemp) ? true : false;
      })        
      setWeekState([...weekState]);      
    }
    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        snapToInterval={theme.SIZES.BASE * 0.375}
        style={styles.weekScrollView}
      >
        {weekState.map((value, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => {handleWeekbar(index)}} style={value.status ? styles.dateActive : styles.dateInActive}>
              <Text size={16} color={value.status ? "white" : "black"}>
                {value.date}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    );
  };

  const renderStatus = (status) => {
    switch (status) {
      case "income": {
        return (
          <SvgUri
            width="24 "
            height="24"
            source={require("../assets/icons/check.svg")}
            style={{
              position: "absolute",
              right: -4,
              top: -4,
            }}
          />
        );
      }
      case "miss": {
        return (
          <SvgUri
            width="24 "
            height="24"
            source={require("../assets/icons/redCheck.svg")}
            style={{
              position: "absolute",
              right: -4,
              top: -4,
            }}
          />
        );
      }
      case "complete": {
        return <></>;
      }
    }
  };

  const renderDetails = (details) => {
    let { caseName, time, patient, reminder, status } = { ...details };
    if (status == "income") {
      return (
        <Block
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 20,
            margin: 8,
            borderColor: "#06D81E",
          }}
        >
          {renderStatus(status)}
          <Block flex flexDirection="row">
            <Block flex={1}>
              <Text size={18}>{caseName}</Text>
              <Text>{time}</Text>
            </Block>
            <Block flex={1}>
              <Text>Patient:{patient}</Text>
              {reminder ? (
                <TouchableOpacity style={styles.sendReminder}>
                  <Text color={"white"}>Send reminder</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Text></Text>
                </TouchableOpacity>
              )}
            </Block>
          </Block>
        </Block>
      );
    } else {
      return (
        <Block
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 20,
            margin: 8,
            borderColor: "grey",
          }}
        >
          {renderStatus(status)}
          <Block flex flexDirection="row">
            <Block flex={1}>
              <Text size={18}>{caseName}</Text>
              <Text>{time}</Text>
            </Block>
            <Block flex={1}>
              <Text>Patient:{patient}</Text>
              {reminder ? (
                <TouchableOpacity style={styles.sendReminder}>
                  <Text color={"white"}>Send reminder</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Text></Text>
                </TouchableOpacity>
              )}
            </Block>
          </Block>
        </Block>
      );
    }
  };

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            family="font-awesome"
            color="white"
            size={16}
            style={styles.chevronLeft}
          />
        </TouchableOpacity>
        <Text
          color="white"
          style={{ paddingLeft: theme.SIZES.BASE }}
          size={17}
          bold
        >
          Schedule View
        </Text>
      </Block>
    );
  };

  return (
    <Block flex style={styles.notification}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block center style={{ paddingTop: 10 }}>
          <Block>
            <Image
              source={require("../assets/images/grayscale-photo-of-man2.png")}
              style={styles.imageStyle}
            ></Image>
            <SvgUri
              width="20"
              height="20"
              source={require("../assets/icons/dot.svg")}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
            />
          </Block>
          <Text size={20}>{doctor.name}</Text>
          <Text>Tel: +{doctor.phone}</Text>
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
        <Block row style={styles.Container}>
          <Text style={styles.schedules}>Schedules</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Calendar", {childDay, schedule})}
          >
            <Text style={styles.calendar}>Calendar</Text>
          </TouchableOpacity>
        </Block>
        {weekBar()}
        <Block style={styles.renderDetails}>
          {/* {schedule.length ==0 ? (
              <ActivityIndicator size={50} color="#6E78F7" />
            ) : (
              schedule.map((val, index) => {                
                return renderDetils({
                  index,
                  patientName: val.patientName,
                  scheduleTime: val.time,
                  caseID: val.caseID,
                })
              })
            ) } */}
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  weekScrollView: {
    paddingTop: 0,
    paddingLeft: 10,
  },
  dateActive: {
    backgroundColor: "#00CE30",
    borderRadius: theme.SIZES.BASE * 1.5,
    paddingHorizontal: 8,
    paddingVertical: 20,
    marginRight: theme.SIZES.BASE,
    width: theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  dateInActive: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: theme.SIZES.BASE * 1.5,
    paddingHorizontal: 4,
    paddingVertical: 20,
    marginRight: theme.SIZES.BASE,
    width: theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
  },
  centerBlock: {
    marginTop: 30,
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
  notification: {
    backgroundColor: theme.COLORS.WHITE,
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
  },
  Container: {
    width: width,
    height: "auto",
    paddingHorizontal: 30,
    paddingVertical: 14,
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
  heading: {
    marginTop: height * 0.08,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    position: "absolute",
    zIndex: 1,
  },
  sendReminder: {
    borderRadius: 20,
    backgroundColor: "#06D81E",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 24,
    marginTop: 6,
    left: 40,
  },
  renderDetails: {
    marginTop: 20,
    marginBottom: height * 0.2,
  },
  calendar: {
    color: "#06D81E",
    paddingLeft: width * 0.5,
  },
  navbar: {
    backgroundColor: "#6E78F7",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE,
  },
});

export default DoctorScheduleDetail;
