import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import CalendarPicker from "react-native-calendar-picker";
import DateTime from "react-native-customize-selected-date";
import _ from "lodash";

import { Icon } from "../components";

const { width, height } = Dimensions.get("screen");

const ScheduleDetail = (props) => {
  const { navigation } = props;
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const renderDetils = (details) => {
    let { heading, subHeading1, subHeading2, subHeading3, time, location } = {
      ...details,
    };

    return (
      <Block style={styles.schedule}>
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
              {heading}
            </Text>
            <Block
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: theme.COLORS.GREY,
                padding: 8,
              }}
            >
              <Text>{subHeading1}</Text>
            </Block>
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
                <Text>{time}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  const [time, setTime] = useState("");

  const onChangeDate = (date) => {
    alert(date);
  };

  const renderChildDay = (day) => {
    if (_.includes(["2018-11-15", "2018-12-10", "2018-12-20"], day)) {
      return (
        <Image
          source={require("../assets/images/doctor1.png")}
          style={styles.icLockRed}
        />
      );
    }
    if (
      _.includes(["2018-11-16", "2018-12-12", "2018-12-21", "2018-12-18"], day)
    ) {
      return (
        <Image
          source={require("../assets/images/doctor.png")}
          style={styles.icLockRed}
        />
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
                  My Active Case (Scheduled)
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
            {renderDetils({
              heading: "Zean Ronen",
              subHeading1: "MBBS,DOMS,MS - Ophthalmology",
              time: "8.00-9.00",
            })}
            {renderDetils({
              heading: "Zean Ronen",
              subHeading1: "MBBS,DOMS,MS - Ophthalmology",
              time: "8.00-9.00",
            })}
            {renderDetils({
              heading: "Zean Ronen",
              subHeading1: "MBBS,DOMS,MS - Ophthalmology",
              time: "8.00-9.00",
            })}
            {renderDetils({
              heading: "Zean Ronen",
              subHeading1: "MBBS,DOMS,MS - Ophthalmology",
              time: "8.00-9.00",
            })}
            {renderDetils({
              heading: "Zean Ronen",
              subHeading1: "MBBS,DOMS,MS - Ophthalmology",
              time: "8.00-9.00",
            })}
            {renderDetils({
              heading: "Zean Ronen",
              subHeading1: "MBBS,DOMS,MS - Ophthalmology",
              time: "8.00-9.00",
            })}
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
    width: 13 / 2,
    height: 9,
    position: "absolute",
    top: 2,
    left: 1,
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
    height: height * 0.16,
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
    marginTop: height * 0.08,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    position: "absolute",
  },
  btnCalendar: {
    position: "absolute",
    right: width * 0.05,
    top: height * 0.08,
  },
  body: {
    marginTop: height * 0.14,
    position: "absolute",
  },
  check: {
    position: "absolute",

    right: -width * 0.05,
    top: -height * 0.01,
  },
});

export default ScheduleDetail;
