import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import { Modal } from 'react-native-paper';
import { materialTheme } from "../constants";
import { IMLocalized } from "../localization/IMLocalization";
import SwitchButton from "switch-button-react-native";
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const EditSchedule = (props) => {
  const isFocused = useIsFocused();
  const scrollRef = useRef();
  const { navigation } = props;
  const { doctor } = props.route.params;
  const [activeSwitch, setActiveSwitch] = useState(1);
  const [weekState, setWeekState] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [childDay, setChildDay] = useState([]);
  const tempSchedule = [];
  const childDayList = [];

  const hideSpinner = () => setSpinner(false);
  const showSpinner = () => setSpinner(true);

  useEffect(() => {
    if (isFocused) {
      scrollRef.current.scrollTo({x: 0, y: 100, animated: true})
      setWeekState([
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
    }
  }, [isFocused]);

  useEffect(() => {
    showSpinner();
    firestore().collection('PCDoctors').doc(doctor.uid).collection('Schedules').get().then((querySnapShot) => {
      querySnapShot.forEach((scheduleDoc) => {
        const { scheduleTime } = scheduleDoc.data();
        const time = new Date(scheduleTime.seconds * 1000 + scheduleTime.nanoseconds/1000000);
        childDayList.push(`${time.getFullYear()}-${(time.getMonth()+1)<10 ? 0 : ''}${time.getMonth()+1}-${time.getDate()<10 ? 0 : ''}${time.getDate()}`);
        tempSchedule.push(scheduleDoc.data());
      });
      setSchedule(tempSchedule);
      setChildDay(childDayList);
    }).then((res) => {
      if (tempSchedule.length == 0) {
        setSchedule([]);
        setChildDay([]);
      }
      hideSpinner();
    });
  }, [doctor]);

  const weekBar = () => {
    const handleWeekbar = (index) => {
      scrollRef.current.scrollTo({x: 38*index, y: 100, animated: true});
      weekState.map((value, indexTemp) => {
        weekState[indexTemp].status = index == indexTemp ? true : false;
      });
      setWeekState([...weekState]);
      setCurrentDay(index);
    };

    return (
      <ScrollView
        ref={scrollRef}
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
            <View
              key={index}
            >
              <TouchableOpacity
                onPress={() => {
                  handleWeekbar(index);
                }}
                style={value.status ? styles.dateActive : styles.dateInActive}
              >
                <Text size={16} color={value.status ? "white" : "black"}>
                  {value.date}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const renderScheduleItem = (number, time, index) => {
    return (
      <Block key={index} style={styles.scheduleBlock}>
        <Block flex flexDirection="row" style={styles.schedule}>
          <Block flex={4} style={styles.time}>
            <Text color={"white"} size={16}>
              {time}
            </Text>
            <Image source={require("../assets/images/dotRed.png")} style={{ position: "absolute", right: 0, top: -10, width: 20, height: 20 }} />
            <Text bold size={12} color={"white"} style={styles.number}>
              {number ? number : 0}
            </Text>
          </Block>
          <Block flex={5}></Block>
          <Block flex={1} style={styles.schedule}>
            <TouchableOpacity
              style={styles.touchableArea}
              onPress={() => navigation.navigate("SchedulePatientList", {doctor})}
            >
              <Image source={require("../assets/images/add.png")} style={{width: 16, height: 16}} />
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    );
  }

  const renderScheduleItems = (day) => {
    return [
      renderScheduleItem(day && day.a, "11.00-14.00 am", 1),
      renderScheduleItem(day && day.b, "14.00-17.00 pm", 2),    
      renderScheduleItem(day && day.c, "9.00-11.00 am", 3)
    ];
  };

  const renderSchedules = () => {
    switch (currentDay) {
      case 0: return renderScheduleItems(doctor.timeSlot && doctor.timeSlot.Monday); 
      case 1: return renderScheduleItems(doctor.timeSlot && doctor.timeSlot.Tuesday); 
      case 2: return renderScheduleItems(doctor.timeSlot && doctor.timeSlot.Wednesday); 
      case 3: return renderScheduleItems(doctor.timeSlot && doctor.timeSlot.Thursday); 
      case 4: return renderScheduleItems(doctor.timeSlot && doctor.timeSlot.Friday); 
      case 5: return renderScheduleItems(doctor.timeSlot && doctor.timeSlot.Saturday); 
      case 6: return renderScheduleItems(doctor.timeSlot && doctor.timeSlot.Sunday); 
      default: return;
    }
  };

  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.goBack()}>
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
          Edit Schedule
        </Text>
      </Block>
    );
  };

  const NavigationToCalendar = () => {
    navigation.navigate("Calendar", {scheduleCalendar: schedule, childDay});
  };

  return (
    <Block flex style={styles.notification}>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block center style={{ paddingTop: 10 }}>
          <Block>
            <Image
              source={{uri: doctor.avatar}}
              style={styles.imageStyle}
            ></Image>
          </Block>
          <Text size={20}>{doctor.name}</Text>
          <Text>{doctor.address}</Text>

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
          <Block flex={1}>
            <Text style={styles.schedules}>Schedules</Text>
          </Block>
          <Block flex={3}></Block>
          <Block flex={1}>
            <TouchableOpacity onPress={() => NavigationToCalendar()}>
              <Text style={styles.calendar}>Calendar</Text>
            </TouchableOpacity>
          </Block>
        </Block>
        {weekBar()}
        <Block style={styles.renderSchedules}>
          {renderSchedules()}
        </Block>
        <TouchableOpacity>
          <Block center style={styles.saveBtn}>
            <Text size={16} color={"white"}>
              {IMLocalized("save")}
            </Text>
          </Block>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        visible={spinner}
        onDismiss={hideSpinner}
        contentContainerStyle={styles.modal}
        dismissable={false}>
        <Text size={18} color="black">
          Loading ...
        </Text>
        <ActivityIndicator size={50} color="#6E78F7" />
      </Modal>
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
  modal: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 20,
    alignSelf: 'center',
    width: width * 0.7,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 1000,
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
  touchableArea: {
    width: 30, 
    height: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  navbar: {
    backgroundColor: "#6E78F7",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE * 0.5,
  },
  time: {
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 30,
    backgroundColor: "#06D81E",
    borderColor: "#06D81E",
    borderWidth: 1,
  },
  timeIdle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 30,
    borderColor: "#06D81E",
    borderWidth: 1,
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
    height: theme.SIZES.BASE * 2.5,
    backgroundColor: "#6E78F7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditSchedule;
