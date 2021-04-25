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
import { Button, Block, Text, theme, Input, Icon } from "galio-framework";

import { materialTheme } from "../constants";
import { CheckBox } from "react-native-elements";
import SvgUri from "expo-svg-uri";
import { set } from "react-native-reanimated";
import { IMLocalized, init } from "../src/localization/IMLocalization";
import DateTime from "./DateTime";
import _ from "lodash";

const { width, height } = Dimensions.get("screen");

const Calendar = (props) => {
  const { navigation } = props;

  const [time, setTime] = useState("");

  const onChangeDate = (date) => {
//    alert(date);
  };

  const renderChildDay = (day) => {
    if (_.includes(["2021-04-15", "2021-04-10", "2021-4-20"], day)) {
      return (
        <Block style={styles.icLockRed}></Block>
      );
    }
    if (
      _.includes(["2021-04-16", "2021-04-12", "2021-04-21", "2021-04-18"], day)
    ) {
      return (
        <Block style={styles.icLockRed}></Block>
      );
    }
  };

  const checkCalendar = (props) => {
    return (
        <Block>
          <DateTime
            date={time}
            changeDate={(date) => onChangeDate(date)}
            format="YYYY-MM-DD"
            renderChildDay={(day) => renderChildDay(day)}
            weekdayStyle={{color:'black'}}
          />
        </Block>
    );
  };

  const meetingItem = (props) => {
    const {day, month, title, time} = props;
    return(
      <Block flexDirection="row" style={{marginVertical: 10}}>
        <Block flex={1} center flexDirection="column" style={{borderRightWidth: 1, borderColor: "blue", padding: theme.SIZES.BASE / 2,}}>
          <Text size={16}>{day}</Text>
          <Text size={16}>{month}</Text>
        </Block>
        <Block flex={6} flexDirection="column" style={{padding: theme.SIZES.BASE / 2, paddingLeft: theme.SIZES.BASE}}>
          <Text size={16}>{title}</Text>
          <Text size={15} muted>{time}</Text>
        </Block>
      </Block>
    )
  }
  return (
    <Block style={{backgroundColor: "white"}}>
      <Block style={styles.roundBlock}>
        <Block row style={styles.heading}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              size={16}
              name="chevron-left"
              family="font-awesome"
              color={"#0064FE"}
              style={{ padding: 7 }}
            />
          </TouchableOpacity>
          <Block>
            <Text
              color="black"
              size={20}
              style={{ fontFamily: "Inter-Black" }}
              bold
            >
            </Text>
          </Block>
          <Block
            style={{
              position: "absolute",
              right: 10,
              padding: 7,
            }}
          >
          </Block>
        </Block>
      </Block>
      {checkCalendar()}
        <Block style={{borderTopWidth: 1, borderColor: 'grey', padding: theme.SIZES.BASE}}>
          <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={{height: height / 2 - theme.SIZES.BASE * 5}}>
            {meetingItem({day: "4", month: "Nov", title: "Meeting with Jim", time: "9.00-11:00 AM"})}
            {meetingItem({day: "4", month: "Nov", title: "Meeting with Jim", time: "9.00-11:00 AM"})}
            {meetingItem({day: "4", month: "Nov", title: "Meeting with Jim", time: "9.00-11:00 AM"})}
            {meetingItem({day: "4", month: "Nov", title: "Meeting with Jim", time: "9.00-11:00 AM"})}
            {meetingItem({day: "4", month: "Nov", title: "Meeting with Jim", time: "9.00-11:00 AM"})}
            {meetingItem({day: "4", month: "Nov", title: "Meeting with Jim", time: "9.00-11:00 AM"})}
            {meetingItem({day: "4", month: "Nov", title: "Meeting with Jim", time: "9.00-11:00 AM"})}
            {meetingItem({day: "4", month: "Nov", title: "Meeting with asdf", time: "9.00-11:00 AM"})}
          </ScrollView>
        </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    position: "absolute",
    marginLeft: theme.SIZES.BASE * 2,
  },
  roundBlock: {
    backgroundColor: "white",
    height: height * 0.11,
    width: width,
    zIndex: 2,
  },
  heading: {
    marginTop: height * 0.08,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    zIndex: 1,
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
});

export default Calendar;
