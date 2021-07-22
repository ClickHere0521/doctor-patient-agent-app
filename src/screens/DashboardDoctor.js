import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler,
  Alert,
  Dimensions,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import {
  Icon,
} from "../components";
import {
  useFocusEffect
 } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const Components = (props) => {
  const { navigation } = props;
  const [doctor, setDoctor] = useState(null);
  const [activeCase, setActiveCase] = useState(0);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
       Alert.alert(
        'Log out',
        'Are you sure you want to log out?',
        [
          {
            text: "OK",
            onPress: () => handleLogout()
          },
          {
            text: "Cancel",
            onPress: () => {}
          }
        ]
       );
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPress
        );
      };
    }, []),
  );
  useEffect(() => {
    const currentUserUid = auth().currentUser.uid;
    firestore().collection('PCDoctors').doc(currentUserUid).collection('PCDoctor').get().then((querySnapshot) => {
      let doctorTemp = {};
      querySnapshot.forEach((doc) => {
        doctorTemp = doc.data();
      });
      setDoctor(doctorTemp);
      // ------------ Active Cases ------------ //
      let activeCaseNum = 0;
      doctorTemp.linkedCases.forEach((value) => {
        if (value.isActive) activeCaseNum ++;
      });
      setActiveCase(activeCaseNum);
    });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.setItem(
      'reminder',
      JSON.stringify({ reminder: false }),
      () => {}
    );  
    navigation.navigate("UserSelectStack");
  };

  const cardBox = () => {
    return (
      <Block style={styles.listBox}>
        <Text style={[styles.headerText, { paddingTop: 0 }]} size={21} bold>
          Current Active Case List
        </Text>
        {/* <Text style={styles.mutedText} size={12} muted bold>
          Admitted on 02/02/2021
        </Text> */}
        <Text style={styles.headerText} size={13}>
          {`Total case ${doctor && doctor.linkedCases.length}, Active case ${activeCase}`}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Case History")}>
          <Block flex flexDirection="row">
            <Text style={styles.headerText} size={13}>
              View Details
            </Text>
            <Icon
              name="chevron-right"
              family="font-awesome"
              color={theme.COLORS.MUTED}
              size={14}
              style={styles.icons}
            >
              {" "}
            </Icon>
          </Block>
        </TouchableOpacity>
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
  const scheduleItem = (val, index) => {
    const time = new Date(val.scheduleTime.seconds * 1000 + val.scheduleTime.nanoseconds/1000000);
    return (
      <Block key={index} flex style={styles.scheduleItem}>
        <Block flex flexDirection="row" style={styles.insideSchduleItem}>
          <Block flex={1.6} flexDirection="column" style={styles.flexCardItem}>
            <Text bold size={20} color="#6695FF" style={styles.pText}>
              {time.getDate()}<Text size={11}>th</Text>
            </Text>
            <Text bold size={20} color="#6695FF" style={styles.pText}>
              {convertMonth(time.getUTCMonth())}
            </Text>
            <Text bold size={11} color="#6695FF" style={styles.pText}>
              {`${time.getHours()}:${time.getMinutes()}:00`}
            </Text>
          </Block>
          <Block flex={5} flexDirection="column">
            <Text
              size={21}
              color="white"
              bold
              style={{ marginLeft: theme.SIZES.BASE }}
            >
              Heart surgery
            </Text>
            <Block flex flex={5} flexDirection="row">
              <TouchableWithoutFeedback>
                <Text color="white" size={12} style={styles.underLineText}>
                  View case detail
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Text color="white" size={12} style={styles.underLineText}>
                  Send Reminders
                </Text>
              </TouchableWithoutFeedback>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };
  const scheduleList = () => {
    return (
      <Block>
        { 
          doctor && doctor.ScheduleInfo.map((val, index) => {
            const time = new Date(val.scheduleTime.seconds * 1000 + val.scheduleTime.nanoseconds/1000000);
            const currentTime = new Date();
            if (time.getFullYear() == currentTime.getFullYear() && time.getDate() == currentTime.getDate() && time.getUTCMonth() == currentTime.getUTCMonth()) {
              return scheduleItem(val, index);
            } 
          })
        }
      </Block>
    );
  };
  const doctorDash = () => {
    return (
      <Block style={styles.container}>
        <Block
          flex
          style={{
            marginBottom: theme.SIZES.BASE,
            paddingBottom: theme.SIZES.BASE,
          }}
        >
          <Text color={"#0033A7"} size={26} bold>
            {`Hello ${doctor && doctor.name}`}
          </Text>
        </Block>
        {cardBox()}
        <Block
          flex
          flexDirection="row"
          style={{ marginVertical: theme.SIZES.BASE * 1.5}}
        >
          <Text color={"#0033A7"} bold>
            Today's Schedule
          </Text>
          <TouchableWithoutFeedback>
            <Icon
              name="ellipsis-v"
              family="font-awesome"
              color={theme.COLORS.MUTED}
              size={14}
              style={[styles.icons1]}
            >
              {" "}
            </Icon>
          </TouchableWithoutFeedback>
        </Block>
        {scheduleList()}
      </Block>
    );
  };
  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity
            onPress={() => navigation.openDrawer()}
          >
            <Icon
              name="align-justify"
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
          Doctor Dashboard
        </Text>
      </Block>
    );
  };
  return (
    <Block flex style={{backgroundColor: 'white'}}>
      {navbar()}
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {doctorDash()}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#6E78F7",
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE,
  },
  insideSchduleItem: {
    borderRadius: 12,
    backgroundColor: "#6695FF",
    padding: theme.SIZES.BASE,
  },
  scheduleItem: {
    marginVertical: theme.SIZES.BASE * 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  flexCardItem: {
    backgroundColor: "white",
    borderRadius: 12,
    width: theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 7,
    marginTop: -theme.SIZES.BASE * 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  pText: {
    padding: theme.SIZES.BASE,
    paddingVertical: 2,
  },
  underLineText: {
    margin: theme.SIZES.BASE,
    textDecorationLine: "underline",
  },
  mutedText: {
    paddingLeft: theme.SIZES.BASE / 2,
  },
  headerText: {
    color: "white",
    padding: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE / 2,
  },
  container: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 1,
  },
  listBox: {
    borderRadius: 12,
    backgroundColor: "#0033A7",
    padding: theme.SIZES.BASE,
  },
  icons: {
    paddingHorizontal: theme.SIZES.BASE / 2,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  icons1: {
    position: "absolute",
    right: 0,
    paddingHorizontal: theme.SIZES.BASE / 2,
    color: "#3B3E51",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});

export default Components;
