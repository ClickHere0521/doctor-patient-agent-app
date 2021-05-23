import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import DateTime from "./DateTime";
import _ from "lodash";
import { Icon } from "../components";
import firebase from 'firebase';
import { ActivityIndicator } from "react-native";

const { width, height } = Dimensions.get("screen");

const ScheduleDetail = (props) => {
  const { navigation } = props;
  const { name, doctorId, doctorDocId } = props.route.params.section;
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [childDays, setChildDays] = useState([]);
  const [time, setTime] = useState("");
  const firestore = firebase.firestore();
  const scheduleList = [];
  const childDayList = [];

  useEffect(() => {
    firestore.collection('PCDoctors').doc(doctorId).collection('PCDoctor').doc(doctorDocId).collection('ScheduleInfo').get().then((querySnapshot) => {
      querySnapshot.forEach((res) => {
        const { caseID, caseReference, scheduleTime, patientName, patientReference } = res.data();
        const time = new Date(scheduleTime.seconds * 1000 + scheduleTime.nanoseconds/1000000);
        childDayList.push(`${time.getFullYear()}-${time.getMonth()<10 ? 0 : null}${time.getMonth()+1}-${time.getDate()}`);
        scheduleList.push({
          patientName,
          time: time.toUTCString(),
          caseID,
        });
      })
      setChildDays(childDayList);
      setSchedules(scheduleList);
    })
  }, []);

  const renderDetils = (details) => {
    let { index, patientName, scheduleTime, caseID } = {
      ...details,
    };
    return (
      <Block style={styles.schedule} key={index}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AgentCaseDetail", {caseID})}
        >
          <Block row>
            <Image
              source={require("../assets/images/check.png")}
              style={styles.check}
            />
            <Block middle>
              <Image source={require("../assets/images/avatar.png")} />
            </Block>
            <Block middle style={{ paddingTop: 10 }}>
              <Text
                bold
                size={18}
                style={{ alignSelf: "flex-start", paddingVertical: 5 }}
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
                  <Text>{scheduleTime}</Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  const onChangeDate = (date) => {
    alert(date);
  };

  const renderChildDay = (day) => {    
    console.log(childDays)
    if (_.includes(childDays, day)) {
      return (
        <Block style={styles.icLockRed}></Block>
      );
    }
  };

  const checkCalendar = () => {
    if (isOpenCalendar) {
      return (
        <Block style={{ marginTop: 150, position: "absolute" }}>
          <DateTime
            date={time}
            changeDate={(date) => onChangeDate(date)}
            format="YYYY-MM-DD"
            renderChildDay={(day) => renderChildDay(day)}
            warpRowWeekdays={{ backgroundColor: "rgba(0,0,0,0)" }}
            warpDayStyle={{
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: "rgba(0,0,0,0)",
            }}
          />
        </Block>
      );
    } else {
      return <Block></Block>;
    }
  };

  return (
    <Block>
      <Block>
        <Block>
          <Block style={styles.roundBlock}>
            <Block row style={styles.heading}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  size={16}
                  name="chevron-left"
                  family="font-awesome"
                  color={"white"}
                  style={{ padding: 7 }}
                />
              </TouchableOpacity>
              <Block>
                <Text
                  color="white"
                  size={20}
                  style={{ fontFamily: "Inter-Black" }}
                  bold
                >
                  {name}
                </Text>
              </Block>
            </Block>
            <Block style={styles.btnCalendar}>
              <TouchableOpacity
                onPress={() => setIsOpenCalendar(!isOpenCalendar)}
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
          <Block style={styles.body}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              snapToInterval={theme.SIZES.BASE * 0.375}
              contentContainerStyle={{
                paddingHorizontal: theme.SIZES.BASE / 2,
              }}
            >
              <TouchableOpacity style={styles.dateActive}>
                <Text size={16} color={"white"}>
                  Today
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateInActive}>
                <Text size={16}>3.5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateInActive}>
                <Text size={16}>3.6</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateInActive}>
                <Text size={16}>3.7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateInActive}>
                <Text size={16}>3.8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateInActive}>
                <Text size={16}>3.9</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateInActive}>
                <Text size={16}>3.10</Text>
              </TouchableOpacity>
            </ScrollView>
          </Block>
        </Block>
        <Block style={{ marginTop: theme.SIZES.BASE * 2 }}>
          <ScrollView
            vertical={true}
            showsVerticalScrollIndicator={false}
            style={{ height: height * 0.75 }}
          >
            {schedules.length ==0 ? (
              <ActivityIndicator size={50} color="#6E78F7" />
            ) : (
              schedules.map((val, index) => {                
                return renderDetils({
                  index,
                  patientName: val.patientName,
                  scheduleTime: val.time,
                  caseID: val.caseID,
                })
              })
            ) }
          </ScrollView>
        </Block>
      </Block>

      {checkCalendar()}
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
  schedule: {
    paddingHorizontal: width * 0.03,
    marginHorizontal: width * 0.04,
    marginVertical: theme.SIZES.BASE,
    borderRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
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
});

export default ScheduleDetail;
