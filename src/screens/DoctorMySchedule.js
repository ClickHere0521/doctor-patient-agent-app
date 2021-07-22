import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import { materialTheme } from "../constants";
import { IMLocalized } from "../localization/IMLocalization";
import SwitchButton from "switch-button-react-native";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const EditSchedule = (props) => {
  const { navigation } = props;
  const { doctor } = props.route.params;
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

  const renderSchedules = (details) => {
    let { time, status, number } = { ...details };

    switch (status) {
      case "missed":
        return (
          <Block style={styles.scheduleBlock}>
            <Block flex flexDirection="row" style={styles.schedule}>
              <Block flex={4} style={styles.time}>
                <Text color={"white"} size={16}>
                  {time}
                </Text>
                <Image source={require("../assets/images/dotRed.png")} style={{ position: "absolute", right: 0, top: -10, width: 20, height: 20 }} />
                <Text bold size={12} color={"white"} style={styles.number}>
                  {number}
                </Text>
              </Block>
              <Block flex={6} center>
                  <Text>
                    James ,Carolina,Smith
                  </Text>
              </Block>
            </Block>
          </Block>
        );
      case "idle":
        return (
          <Block style={styles.scheduleBlock}>
            <Block flex flexDirection="row" style={styles.schedule}>
              <Block flex={4} style={[styles.timeIdle]}>
                <Text color={"black"} size={16}>
                  {time}
                </Text>
              </Block>
              <Block flex={6}></Block>
            </Block>
          </Block>
        );
      case "booked":
        return (
          <Block style={styles.scheduleBlock}>
            <Block flex flexDirection="row" style={styles.schedule}>
              <Block flex={4} style={styles.time}>
                <Text color={"white"} size={16}>
                  {time}
                </Text>
                {/* <SvgUri
                  width="20"
                  height="20"
                  source={require("../assets/icons/dot.svg")}
                  style={{ position: "absolute", right: 0, top: -10 }}
                /> */}
                <Text bold size={12} color={"white"} style={styles.number}>
                  {number}
                </Text>
              </Block>
              <Block flex={6} center>
                  <Text>
                    James ,Carolina
                  </Text>
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
          style={{ paddingLeft: theme.SIZES.BASE * 0.5 }}
          size={17}
          bold
        >
          {IMLocalized('My Schedule')}
        </Text>
      </Block>
    );
  };

  const NavigationToCalendar = () => {
    const childDayList = [];
    const tempSchedule = [];
    doctor && doctor.ScheduleInfo.forEach((res) => {
      const { scheduleTime, patientName, caseID } = res;
      const time = new Date(scheduleTime.seconds * 1000 + scheduleTime.nanoseconds/1000000);
      childDayList.push(`${time.getFullYear()}-${time.getMonth()<10 ? 0 : null}${time.getMonth()+1}-${time.getDate()<10 ? 0 : null}${time.getDate()}`);
      tempSchedule.push({
        patientName,
        time: time.toUTCString(),
        caseID,
        year: time.getFullYear(),
        month: time.getMonth(),
        day: time.getDate(),
      });
    })
    navigation.navigate("Calendar", {schedule: tempSchedule, childDay: childDayList});
  };

  return (
    <Block flex style={styles.notification}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block center style={{ paddingTop: theme.SIZES.BASE * 2 }}>
          <Block>
            <Image
              source={{ uri : doctor && doctor.avatar }}
              style={styles.imageStyle}
            ></Image>
            {/* <SvgUri
              width="20"
              height="20"
              source={require("../assets/icons/dot.svg")}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
            /> */}
          </Block>
          <Text size={20}>{doctor.name}</Text>
          <Text>Tel: +{doctor.phone}</Text>
          <Block center style={styles.centerBlock}>
            <SwitchButton
              onValueChange={(val) => setActiveSwitch(val)}
              text1="Past"
              text2="Upcoming"
              switchWidth = {width * 0.7}
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
        <Block flexDirection="row" style={styles.Container}>
          <Block flex={5}>
            <Text>Schedules</Text>
          </Block>
          <Block flex={1}>
            <TouchableOpacity onPress={() => NavigationToCalendar()}>
              <Text style={styles.calendar}>Calendar</Text>
            </TouchableOpacity>
          </Block>
        </Block>
        {weekBar()}
        <Block style={styles.renderSchedules}>
          {renderSchedules({
            time: "9.00-11.00 am",
            status: "missed",
            number: 3,
          })}
          {renderSchedules({
            time: "11.00-12.00 am",
            status: "idle",
          })}
          {renderSchedules({
            time: "14.00-15.00 pm",
            status: "booked",
            number: 2,
          })}
          {renderSchedules({
            time: "15.00-17.00 pm",
            status: "booked",
            number: 2,
          })}
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  weekScrollView: {
    marginVertical: theme.SIZES.BASE,
    padding: theme.SIZES.BASE,
    marginRight: theme.SIZES.BASE,
    paddingTop: 0,
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
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
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
  renderSchedules: {
    marginTop: 20,
    marginHorizontal: width * 0.05,
  },
  calendar: {
    color: "#06D81E",
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
  time: {
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 30,
    backgroundColor: "#06D81E",
    borderColor: "#06D81E",
    borderWidth: 1.2,
    margin: -1.2,
    marginBottom: -0.9,
  },
  timeIdle: {
    margin: -1.1,
    marginBottom: -0.9,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 30,
    borderColor: "#06D81E",
    borderWidth: 1.2,
  },
  schedule: {
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    position: "absolute",
    right: 7,
    top: -9,
  },
  scheduleBlock: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "black",
    marginBottom: 20,
  },
  saveBtn: {
    width: width * 0.3,
    height: theme.SIZES.BASE * 2,
    backgroundColor: "#6E78F7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditSchedule;
