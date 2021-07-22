import React, { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";

import { Drawer as DrawerCustomItem } from "../components/";
import { materialTheme } from "../constants/";
import { useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get("screen");

const CustomDrawerContent = ({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) => {
  const insets = useSafeArea();
  const userRole = useSelector(state => state.user.role);
  let screens = [];
  const [curUser, setCurUser] = useState({});
  switch (userRole) {
    case "agent":
      screens = [
        "Dashboard",
        "Agent Info",
        "Patients",
        "Cases",
        "Doctors",
        "Schedules",
        "Settings",
        "Log out",
      ];
      break;
    case "patient":
      screens = [
        "DashboardPatient",
        "Profile Info",
        "Case History",
        "Notification",
        "Settings",
        "Log out",
      ];
      break;
    case "doctor":
      screens = [
        "Dashboard",
        "Profile Info",
        "Case History",
        "Settings",
        "Log out",
      ]
    default:
      break;
  }

  useEffect(() => {
    let userId = auth().currentUser.uid;
    switch (userRole) {
      case 'agent': 
        firestore().collection('Agents').doc('6hQ6yTAGNXNihOuFfQku05BK1SJ2').collection('BusinessAgent').doc(userId).get().then((shot) => {
          setCurUser(shot.data());
        });
        break;
      case 'doctor':
        firestore().collection('PCDoctors').doc(userId).get().then((shot) => {
          let curUserTemp = {};
          shot.docs.forEach((val) => {
            curUserTemp = val.data();
          })
          setCurUser(curUserTemp);
        });
        break;

      default: break;
    }
  }, []);

  const renderName = () => {
    if (userRole == 'agent') {
      return curUser && curUser.Name;
    } else {
      return curUser && curUser.name;
    }
  }

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.23} style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Agent Info")}
        >
          <Block row style={{marginLeft: -20, marginTop: height * 0.05}}>
            <Image style={{ width: 50, height: 50, borderRadius: 100 }} source={curUser ? { uri: curUser.avatar } : require('../assets/images/avatar.png')} alt="" />
            <Block middle style={styles.profile}>            
              <Text h5 color={"white"}>
                {renderName()}
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
      <Block flex style={{ paddingLeft: 0, paddingRight: 0, marginTop: 10 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.8,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => {
            if (item == "Log out")
              // console.log(1111)
              // return (
              //   <TouchableWithoutFeedback
              //     style={{}}
              //   >
              //     <Text key={index}>{item}</Text>
              //   </TouchableWithoutFeedback>
              // )
              return (
                <DrawerCustomItem
                  title={item}
                  key={index}
                  modal={true}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
            else
              return (
                <DrawerCustomItem
                  title={item}
                  key={index}
                  navigation={navigation}
                  modal={false}
                  focused={state.index === index ? true : false}
                />
              );
          })}
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#6E78F7",
    paddingHorizontal: 28,
    justifyContent: "center"
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: "flex-end"
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
    paddingLeft: theme.SIZES.BASE
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 90
  },
  seller: {
    marginRight: 16
  },
});

export default CustomDrawerContent;
