import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Block, Text, theme, Input, Icon } from "galio-framework";
import { IMLocalized, init } from "../localization/IMLocalization";
import DateTime from "./DateTime";
import _, { stubString } from "lodash";

const { width, height } = Dimensions.get("screen");

const Calendar = (props) => {
  const { navigation } = props;
  const { childDay, scheduleCalendar }= props.route.params;
  const [time, setTime] = useState("");
  const [meetings, setMeetings] = useState([]);  

  const onChangeDate = async (date) => {
    let tempMeetings = [];    
    await scheduleCalendar && scheduleCalendar.map((val) => {  
      const { scheduleTime } = val;
      const time = new Date(scheduleTime.seconds * 1000 + scheduleTime.nanoseconds/1000000);
      const changedTime = `${time.getFullYear()}-${(time.getMonth()+1)<10 ? 0 : ''}${time.getMonth()+1}-${time.getDate()<10 ? 0 : ''}${time.getDate()}`;
      
      if (changedTime == date)
      {
        tempMeetings.push({
          day: `${time.getDate()<10 ? 0 : ''}${time.getDate()}`,
          month: time.getMonth(),
          patientName: val.patientName,
          time: scheduleTime.toDate().toDateString(),
        });
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

  const convertMonth = (mon) => {
    switch (mon) {
      case 0: return 'Jan';
      case 1: return 'Feb';
      case 2: return 'Mar';
      case 3: return 'Apr';
      case 4: return 'May';
      case 5: return 'Jun';
      case 6: return 'Jul';
      case 7: return 'Aug';
      case 8: return 'Sep';
      case 9: return 'Oct';
      case 10: return 'Nov';
      case 11: return 'Dec';
      default: return null;
    }
  };

  return (
    <Block style={{backgroundColor: "white"}}>
      <Block style={styles.roundBlock}>
        <Block row style={styles.heading}>
          <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.goBack()}>
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
                      <Text size={16}>{convertMonth(val.month)}</Text>
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
  touchableArea: {
    width: 30, 
    height: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  roundBlock: {
    backgroundColor: "white",
    height: height * 0.11,
    width: width,
    zIndex: 2,
  },
  heading: {
    marginTop: height * 0.05,
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
