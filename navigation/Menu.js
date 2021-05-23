import React from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";

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
  const userRole = useSelector( state => state.user.role );
  let screens = [];
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
            <Image source={require('../assets/images/avatar.png')} alt="" />
            <Block middle style={styles.profile}>            
              <Text h5 color={"white"}>
                {profile.name}
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
      <Block flex style={{ paddingLeft: 0, paddingRight: 0 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.4,
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
    marginBottom: theme.SIZES.BASE / 2
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
