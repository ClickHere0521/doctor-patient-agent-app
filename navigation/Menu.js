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
        "Patient View",
        "Case View",
        "Primary Care Doctor View",
        "Schedule View",
        "Settings",
      ];
      break;
    case "patient":
      screens = [
        "DashboardPatient",
        "Profile Info",
        "Case History",
        "Notification",
        "Settings",
      ];
      break;
    case "doctor":
      screens = [
        "Dashboard",
        "Profile Info",
        "Case View",
        "Settings"
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
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
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
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
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
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
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
