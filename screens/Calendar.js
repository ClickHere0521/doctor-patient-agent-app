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
import _, { stubString } from "lodash";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { CameraPermissionResponse } from "expo-image-picker";

const { width, height } = Dimensions.get("screen");

const Calendar = (props) => {
  const { navigation } = props;
  const { childDay, schedule }= props.route.params;
  const [time, setTime] = useState("");
  const [meetings, setMeetings] = useState([]);  

  const onChangeDate = async (date) => {
    let tempMeetings = [];
    
    await schedule && schedule.map((val) => {   
      console.log(val.year);
      if (val.year == date.substring(0,4) && (val.month+1) == date.substring(5,7) && val.day == date.substring(8,10))
      {
        tempMeetings.push(val);
      }
    });
    setMeetings(tempMeetings);
  };

  const renderChildDay = (day) => {
    if (_.includes(childDay, day)) {
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
            {meetings.length == 0 ? (
              <Text>No schedule</Text>
            ) : (
              meetings.map((val, index) => {
                return (
                  <Block key={index} flexDirection="row" style={{marginVertical: 10}}>
                    <Block flex={1} center flexDirection="column" style={{borderRightWidth: 1, borderColor: "blue", padding: theme.SIZES.BASE / 2,}}>
                      <Text size={16}>{val.day}</Text>
                      <Text size={16}>{val.month}</Text>
                    </Block>
                    <Block flex={6} flexDirection="column" style={{padding: theme.SIZES.BASE / 2, paddingLeft: theme.SIZES.BASE}}>
                      <Text size={16}>{val.patientName}</Text>
                      <Text size={15} muted>{val.time}</Text>
                    </Block>
                  </Block>
                )
              })
            )}
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
