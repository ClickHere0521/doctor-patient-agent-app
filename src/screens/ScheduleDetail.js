import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import _ from "lodash";
import { Icon } from "../components";
import { ActivityIndicator } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get("screen");

const ScheduleDetail = (props) => {
  const isFocused = useIsFocused();
  const scrollRef = useRef();
  const { navigation } = props;
  const { section } = props.route.params;
  const [spinner, setSpinner] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [scheduleCalendar, setScheduleCalendar] = useState([]);
  const [childDay, setChildDay] = useState([]);
  const [time, setTime] = useState("");
  const [weekState, setWeekState] = useState([]);

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

  const tempSchedule = [];
  const childDayList = [];
  const tempScheduleCalendar = [];

  useEffect(() => {
    const { realPrevMonday, realLaterSunday } = getPreviousMonday();
    setSpinner(true);
    firestore().collection('PCDoctors').doc(section.uid).collection('Schedules').get().then((querySnapShot) => {
      querySnapShot.forEach((scheduleDoc) => {
        const { scheduleTime } = scheduleDoc.data(); 
        const time = new Date(scheduleTime.seconds * 1000 + scheduleTime.nanoseconds/1000000);
        childDayList.push(`${time.getFullYear()}-${(time.getMonth()+1)<10 ? 0 : ''}${time.getMonth()+1}-${time.getDate()<10 ? 0 : ''}${time.getDate()}`);
        tempScheduleCalendar.push(scheduleDoc.data());
      });
      setChildDay(childDayList);
      setScheduleCalendar(tempScheduleCalendar);
    }).then((res) => {
      if (childDayList.length == 0) {
        setChildDay([]);
        setScheduleCalendar([]);
      }
      firestore().collection('PCDoctors').doc(section.uid).collection('Schedules').where("scheduleTime", ">=", realPrevMonday).where("scheduleTime", "<=", realLaterSunday).get().then((querySnapShot) => {
        querySnapShot.forEach((scheduleDoc) => {
          tempSchedule.push(scheduleDoc.data());
        });
        setSchedule(tempSchedule);
      }).then((res) => {
        if (tempSchedule.length == 0) {
          setSchedule([]);
        }
        setSpinner(false);
      });
    });
  }, [section]);

  const getPreviousMonday = () => {
    var date = new Date();
    var day = date.getDay();
    var prevMonday = new Date();
    var laterSunday = new Date();
    if(date.getDay() == 0){
        prevMonday.setDate(date.getDate() - 7);
    }
    else{
        prevMonday.setDate(date.getDate() - (day-1));
    }
    laterSunday.setDate(prevMonday.getDate() + 6);
    var prevMondayStr = `${prevMonday.getFullYear()}-${(prevMonday.getMonth()+1)<10 ? 0 : ''}${prevMonday.getMonth()+1}-${prevMonday.getDate()<10 ? 0 : ''}${prevMonday.getDate()}`;
    var laterSundayStr = `${laterSunday.getFullYear()}-${(laterSunday.getMonth()+1)<10 ? 0 : ''}${laterSunday.getMonth()+1}-${laterSunday.getDate()<10 ? 0 : ''}${laterSunday.getDate()}`;
    var realPrevMonday = new Date(prevMondayStr);
    var realLaterSunday = new Date(laterSundayStr);
    return { realPrevMonday, realLaterSunday };
  }

  const handleNavigateCaseDetail = (caseReference) => {
    var category = {};
    caseReference.get().then((querySnapShot) => {
      category = querySnapShot.data();
    }).then(() => {
      navigation.navigate("AgentCaseDetail", {category});
    })
  };

  const renderDetils = (details) => {
    let { index, patientName, scheduleTime, caseReference, avatar } = {
      ...details,
    };
    const tempTime = new Date(scheduleTime.seconds * 1000 + scheduleTime.nanoseconds/1000000);
    const tempDay = tempTime.getDay() == 0 ? 6 : tempTime.getDay() - 1;
    if (weekState[tempDay].status)
      return (
        <Block style={styles.schedule} key={index}>
          <TouchableOpacity
            onPress={() => handleNavigateCaseDetail(caseReference)}
          >
            <Block row style={{paddingVertical: 10}}>
              <Image
                source={require("../assets/images/check.png")}
                style={styles.check}
              />
              <Block flex={2}>
                {avatar ? (
                  <Image source={{uri: avatar}} style={styles.imageStyle} />
                ) : (
                  <Image source={require("../assets/images/avatar.png")} style={styles.imageStyle} />
                )}
              </Block>
              <Block flex={1}></Block>    
              <Block flex={10}>
                <Text
                  bold
                  size={18}
                  style={{ alignSelf: "flex-start" }}
                >
                  {patientName}
                </Text>
                <Block row style={{ paddingVertical: 8 }}>
                  <Block middle>
                    <Icon
                      name="map-marker"
                      family="font-awesome"
                      color={theme.COLORS.CUSTOM}
                      size={16}
                    >
                      {" "}
                    </Icon>
                  </Block>
                  <Block middle style={{ marginRight: 40 }}>
                    <Text>{scheduleTime.toDate().toDateString()}</Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </TouchableOpacity>
        </Block>
      );
    else return null;
  };

  const weekBar = () => {
    const handleWeekbar = index => {
      scrollRef.current.scrollTo({x: 38*index, y: 100, animated: true});
      weekState.map((value, indexTemp) => {
        weekState[indexTemp].status = (index == indexTemp) ? true : false;
      })
      setWeekState([...weekState]);
    }
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
            <TouchableOpacity key={index} onPress={() => { handleWeekbar(index) }} style={value.status ? styles.dateActive : styles.dateInActive}>
              <Text size={16} color={value.status ? "white" : "black"}>
                {value.date}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    );
  };
  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <Block row flex={1}>
          <Block flex={1}>
            <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left"
                family="font-awesome"
                color="white"
                size={16}
              />
            </TouchableOpacity>
          </Block>
          <Block flex={6}>
            <Text
              color="white"
              size={16}
              bold
              style={{ padding: theme.SIZES.BASE * 0.3 }}
            >
              {section.name}
            </Text>
          </Block>
        </Block>
        <Block flex={1} style={{alignItems: 'flex-end', marginRight: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Calendar", {scheduleCalendar, childDay})}
          >
            <Block row>
              <Text color="white">Calendar</Text>
              <Icon
                name="chevron-right"
                family="font-awesome"
                color={"white"}
                size={10}
                style={{ padding: 6 }}
              />
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    );
  };
  return (
    <Block style={styles.scheduleDetail}>
      <Block style={{backgroundColor: 'white', height: height}}>
        {navbar()}
        <ScrollView
          vertical={true}
          showsVerticalScrollIndicator={false}
        >
          <Block style={{marginBottom: 20}}>
          {weekBar()}
            {spinner ? (
              <Block flex style={{marginTop: 40, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size={50} color="#6E78F7" />
              </Block>
            ) : (
              schedule.map((val, index) => {                
                return renderDetils({
                  index,
                  patientName: val.patientName,
                  scheduleTime: val.scheduleTime,
                  caseReference: val.caseReference,
                  avatar: val.patientAvatar,
                })
              })
            )}
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icLockRed: {
    backgroundColor: "#0064FE",
    width: 9,
    height: 9,
    borderRadius: 5,
    position: "absolute",
    top: 29,
    left: 15,
  },
  touchableArea: {
    width: 30, 
    height: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  schedule: {
    paddingHorizontal: width * 0.03,
    marginHorizontal: width * 0.04,
    marginTop: theme.SIZES.BASE,
    borderRadius: 13,
    backgroundColor: "#f9f9f9",
    shadowColor: "black",
    // shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  title: {
    paddingTop: theme.SIZES.BASE / 2,
    paddingBottom: theme.SIZES.BASE * 1.5,
  },
  rows: {
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE * 1.25,
  },
  roundBlock: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: "rgba(100, 120, 247, 0.84)",
    height: height * 0.14,
    width: width,
  },
  dateActive: {
    backgroundColor: "#00CE30",
    borderRadius: 18,
    width: 110,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: theme.SIZES.BASE / 2,
  },
  dateInActive: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 18,
    width: 110,
    height: 34,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: theme.SIZES.BASE / 2,
  },
  heading: {
    marginTop: height * 0.05,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    position: "absolute",
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
  scheduleDetail: {
    backgroundColor: 'white',
  },  
  btnCalendar: {
    position: "absolute",
    right: width * 0.05,
    top: height * 0.06,
  },
  body: {
    marginTop: height * 0.12,
    position: "absolute",
  },
  check: {
    position: "absolute",
    right: -width * 0.05,
    top: -height * 0.01,
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#CCC",
  },
  weekScrollView: {
    marginTop: theme.SIZES.BASE,
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
});

export default ScheduleDetail;
