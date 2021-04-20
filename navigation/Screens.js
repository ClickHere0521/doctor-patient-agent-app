import React from "react";
import { Easing, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

//constants
import { Icon, Header } from "../components/";
import { Images, materialTheme } from "../constants/";

//redux
import { useDispatch, useSelector } from "react-redux";

// screens
import DashboardAgentScreen from "../screens/DashboardAgent";
import ChatScreen from "../screens/Chat";
import CartScreen from "../screens/Cart";
import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";
import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import NotificationsScreen from "../screens/Notifications";
import PrivacyScreen from "../screens/Privacy";
import AboutScreen from "../screens/About";
import LanguageScreen from "../screens/Language";
import AgreementScreen from "../screens/Agreement";
import UserSelectScreen from "../screens/UserSelect";
import PatientInfoScreen from "../screens/PatientInfo";
import DoctorScheduleDetailScreen from "../screens/DoctorScheduleDetail";
import AgentInfoScreen from "../screens/AgentInfo";
import ScheduleDetailScreen from "../screens/ScheduleDetail";
import PatientScheduleDetailScreen from "../screens/PatientScheduleDetail";
import CaseHistoryScreen from "../screens/CaseHistory";
import PatientViewScreen from "../screens/PatientView";
import PrimaryCareDoctorViewScreen from "../screens/PrimaryCareDoctorView";
import BookDoctorScreen from "../screens/BookDoctor";
import CaseViewScreen from "../screens/CaseView";
import DoctorCaseViewScreen from "../screens/DoctorCaseView";
import ScheduleViewScreen from "../screens/ScheduleView";
import DashboardPatientScreen from "../screens/DashboardPatient";
import DashboardDoctorScreen from "../screens/DashboardDoctor";
import CustomDrawerContent from "./Menu";
import TimeSlotScreen from "../screens/TimeSlot";
import DoctorDetailScreen from "../screens/DoctorDetail";
import NotificationScreen from "../screens/Notification";
import DoctorInfoScreen from "../screens/DoctorInfo";
import AgentCaseDetailScreen from "../screens/AgentCaseDetail";
import DoctorCaseDetailScreen from "../screens/DoctorCaseDetail";
import PatientCaseDetailScreen from "../screens/PatientCaseDetail";
import PatientTimeSlotScreen from "../screens/PatientTimeSlot";
import AgentReviewScreen from "../screens/AgentTreatmentReview";
import { IMLocalized } from "../src/localization/IMLocalization";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile = {
  avatar: Images.Profile,
  name: "Workforce Agent",
  type: "Agent",
  plan: "Workforce",
};

const ProfileStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Agent Info"
        component={ProfileScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              title="Agent Info"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Rachel Brown"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Cart" scene={scene} navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" scene={scene} navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Language"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Agreement"
        component={AgreementScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Agreement"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Privacy"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="About us"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications Settings"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Rachel Brown"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DashboardAgentStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="DashboardAgent"
        component={DashboardAgentScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Dashboard" navigation={props.navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="AgentCaseDetail"
        component={AgentCaseDetailScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Case Detail" navigation={props.navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DoctorInfoStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="DoctorInfo"
        component={DoctorInfoScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Doctor Info" navigation={props.navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = (props) => {
  const userRole = useSelector((state) => state.user.role);

  switch (userRole) {
    case "agent":
      return (
        <Drawer.Navigator
          style={{ flex: 1 }}
          drawerContent={(props) => (
            <CustomDrawerContent {...props} profile={profile} />
          )}
          drawerStyle={{
            backgroundColor: "white",
            width: width * 0.8,
          }}
          drawerContentOptions={{
            activeTintColor: "white",
            inactiveTintColor: "#000",
            activeBackgroundColor: materialTheme.COLORS.ACTIVE,
            inactiveBackgroundColor: "transparent",
            itemStyle: {
              width: width * 0.74,
              paddingHorizontal: 12,
              justifyContent: "center",
              alignContent: "center",
              overflow: "hidden",
            },
            labelStyle: {
              fontSize: 48,
              fontWeight: "normal",
            },
          }}
          initialRouteName="Home"
        >
          <Drawer.Screen
            name="Dashboard"
            component={DashboardAgentStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="md-woman"
                  family="ionicon"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                  style={{ marginLeft: 4, marginRight: 4 }}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Agent Info"
            component={AgentInfoStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="shop"
                  family="GalioExtra"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Patient View"
            component={PatientViewStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="user"
                  family="font-awesome"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Case View"
            component={CaseViewStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="id-badge"
                  family="font-awesome"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Primary Care Doctor View"
            component={PrimaryCareDoctorViewStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="briefcase-medical"
                  family="font-awesome"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Schedule View"
            component={ScheduleViewStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="calender"
                  family="font-awesome"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="gears"
                  family="font-awesome"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                  style={{ marginRight: -3 }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DoctorDetail"
            component={DoctorDetailScreen}
            options={{
              header: ({ navigation, scene }) => (
                <Header
                  home
                  title="DoctorDetail"
                  navigation={props.navigation}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DoctorScheduleDetail"
            component={DoctorScheduleDetailScreen}
            options={{
              header: ({ navigation, scene }) => (
                <Header
                  back
                  title="Doctor Schedule Detail"
                  navigation={props.navigation}
                />
              ),
            }}
          />
          <Stack.Screen
            name="TimeSlot"
            component={TimeSlotScreen}
            option={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="ScheduleDetail"
            component={ScheduleDetailScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="AgentReview"
            component={AgentReviewScreen}
            options={{
              headerTransparent: true,
            }}
          />
        </Drawer.Navigator>
      );
    case "patient":
      return (
        <Drawer.Navigator
          style={{ flex: 1 }}
          drawerContent={(props) => (
            <CustomDrawerContent {...props} profile={profile} />
          )}
          drawerStyle={{
            backgroundColor: "white",
            width: width * 0.8,
          }}
          drawerContentOptions={{
            activeTintColor: "white",
            inactiveTintColor: "#000",
            activeBackgroundColor: materialTheme.COLORS.ACTIVE,
            inactiveBackgroundColor: "transparent",
            itemStyle: {
              width: width * 0.74,
              paddingHorizontal: 12,
              justifyContent: "center",
              alignContent: "center",
              overflow: "hidden",
            },
            labelStyle: {
              fontSize: 48,
              fontWeight: "normal",
            },
          }}
          initialRouteName="DashboardPatient"
        >
          <Drawer.Screen
            name="DashboardPatient"
            component={DashboardPatientStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="md-woman"
                  family="ionicon"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                  style={{ marginLeft: 4, marginRight: 4 }}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile Info"
            component={PatientInfoStack}
          />
          <Drawer.Screen
            name="Case History"
            component={CaseHistoryStack}
          />
          <Drawer.Screen
            name="Notification"
            component={NotificationStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="md-woman"
                  family="ionicon"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                  style={{ marginLeft: 4, marginRight: 4 }}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="gears"
                  family="font-awesome"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                  style={{ marginRight: -3 }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="PatientCaseDetail"
            component={PatientCaseDetailScreen}
          />
          <Stack.Screen
            name="PatientScheduleDetail"
            component={PatientScheduleDetailScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Drawer.Screen
            name="Primary Care Doctor View"
            component={PrimaryCareDoctorViewStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="briefcase-medical"
                  family="font-awesome"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                />
              ),
            }}
          />
          <Stack.Screen
            name="PatientTimeSlot"
            component={PatientTimeSlotScreen}
            option={{
              headerTransparent: true,
            }}
          />
        </Drawer.Navigator>
      );
    case "doctor":
      return (
        <Drawer.Navigator
          style={{ flex: 1 }}
          drawerContent={(props) => (
            <CustomDrawerContent {...props} profile={profile} />
          )}
          drawerStyle={{
            backgroundColor: "white",
            width: width * 0.8,
          }}
          drawerContentOptions={{
            activeTintColor: "white",
            inactiveTintColor: "#000",
            activeBackgroundColor: materialTheme.COLORS.ACTIVE,
            inactiveBackgroundColor: "transparent",
            itemStyle: {
              width: width * 0.74,
              paddingHorizontal: 12,
              justifyContent: "center",
              alignContent: "center",
              overflow: "hidden",
            },
            labelStyle: {
              fontSize: 48,
              fontWeight: "normal",
            },
          }}
          initialRouteName="Doctor Dashboard"
        >
          <Drawer.Screen
            name="Dashboard"
            component={DashboardDoctorStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="md-woman"
                  family="ionicon"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                  style={{ marginLeft: 4, marginRight: 4 }}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile Info"
            component={DoctorInfoStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="md-woman"
                  family="ionicon"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                  style={{ marginLeft: 4, marginRight: 4 }}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Case View"
            component={DoctorCaseViewStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="md-woman"
                  family="ionicon"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                  style={{ marginLeft: 4, marginRight: 4 }}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsStack}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  size={16}
                  name="gears"
                  family="font-awesome"
                  color={focused ? "white" : materialTheme.COLORS.MUTED}
                  style={{ marginRight: -3 }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DoctorCaseDetail"
            component={DoctorCaseDetailScreen}
          />
        </Drawer.Navigator>
      );
    default:
      break;
  }
  // return (
  //   <Drawer.Navigator
  //     style={{ flex: 1 }}
  //     drawerContent={props => (
  //       <CustomDrawerContent {...props} profile={profile} />
  //     )}
  //     drawerStyle={{
  //       backgroundColor: "white",
  //       width: width * 0.8
  //     }}
  //     drawerContentOptions={{
  //       activeTintColor: "white",
  //       inactiveTintColor: "#000",
  //       activeBackgroundColor: materialTheme.COLORS.ACTIVE,
  //       inactiveBackgroundColor: "transparent",
  //       itemStyle: {
  //         width: width * 0.74,
  //         paddingHorizontal: 12,
  //         justifyContent: "center",
  //         alignContent: "center",
  //         overflow: "hidden"
  //       },
  //       labelStyle: {
  //         fontSize: 48,
  //         fontWeight: "normal"
  //       }
  //     }}
  //     initialRouteName="Home"
  //   >
  //     <Drawer.Screen
  //       name="Dashboard"
  //       component={DashboardAgentStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="md-woman"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //             style={{ marginLeft: 4, marginRight: 4 }}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Profile Info"
  //       component={ProfileInfoStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="md-woman"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //             style={{ marginLeft: 4, marginRight: 4 }}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Agent Info"
  //       component={ProfileStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="shop"
  //             family="GalioExtra"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Patient View"
  //       component={PatientViewStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="user"
  //             family="font-awesome"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Case View"
  //       component={CaseViewStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="id-badge"
  //             family="font-awesome"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Primary Care Doctor View"
  //       component={PrimaryCareDoctorViewStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="briefcase-medical"
  //             family="font-awesome"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Schedule View"
  //       component={ProfileStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="calender"
  //             family="font-awesome"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Settings"
  //       component={SettingsStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="gears"
  //             family="font-awesome"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //             style={{ marginRight: -3 }}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Components"
  //       component={ComponentsStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="md-switch"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //             style={{ marginRight: 2, marginLeft: 2 }}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Patient Info"
  //       component={PatientInfoStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="md-woman"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //             style={{ marginLeft: 4, marginRight: 4 }}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Doctor Schedule Detail"
  //       component={DoctorScheduleDetailStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="md-woman"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //             style={{ marginLeft: 4, marginRight: 4 }}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Agent Info"
  //       component={AgentInfoStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="md-woman"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //             style={{ marginLeft: 4, marginRight: 4 }}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Schedule Detail"
  //       component={ScheduleDetailStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="md-woman"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //             style={{ marginLeft: 4, marginRight: 4 }}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="CaseHistory"
  //       component={CaseHistoryStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="md-woman"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //             style={{ marginLeft: 4, marginRight: 4 }}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Notification"
  //       component={NotificationStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="md-woman"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //             style={{ marginLeft: 4, marginRight: 4 }}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="BookDoctor"
  //       component={BookDoctorScreen}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="md-person-add"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Time Slot"
  //       component={TimeSlotStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="briefcase-medical"
  //             family="font-awesome"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Doctor Detail"
  //       component={DoctorDetailStack}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="briefcase-medical"
  //             family="font-awesome"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Sign In"
  //       component={SignInScreen}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="ios-log-in"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //           />
  //         )
  //       }}
  //     />
  //     <Drawer.Screen
  //       name="Sign Up"
  //       component={SignUpScreen}
  //       options={{
  //         drawerIcon: ({ focused }) => (
  //           <Icon
  //             size={16}
  //             name="md-person-add"
  //             family="ionicon"
  //             color={focused ? "white" : materialTheme.COLORS.MUTED}
  //           />
  //         )
  //       }}
  //     />
  //   </Drawer.Navigator>
  // );
};

const UserSelectStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="UserSelectStack"
        component={UserSelectScreen}
        option={{
          headerTransparent: true,
        }}
      />
      <Drawer.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-person-add"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-person-add"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

const PatientInfoStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Patient Info"
        component={PatientInfoScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header              
              title="Patient Information"
              navigation={props.navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const PatientViewStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Patient View"
        component={PatientViewScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header home title="Patient View" navigation={props.navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const CaseViewStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Case View"
        component={CaseViewScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header home title="Case View" navigation={props.navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DoctorCaseViewStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Case View"
        component={DoctorCaseViewScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header home title="Case View" navigation={props.navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AgentCaseDetailStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="AgentCaseDetail"
        component={AgentCaseDetailScreen}
      />
    </Stack.Navigator>
  );
};

const DoctorCaseDetailStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="DoctorCaseDetail"
        component={DoctorCaseDetailScreen}
      />
    </Stack.Navigator>
  );
};

const patientCaseDetailStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="PatientCaseDetail"
        component={PatientCaseDetailScreen}
      />
    </Stack.Navigator>
  );
};

const DoctorScheduleDetailStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="DoctorScheduleDetail"
        component={DoctorScheduleDetailScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Doctor Schedule Detail"
              navigation={props.navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const PrimaryCareDoctorViewStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Primary Care Doctor View"
        component={PrimaryCareDoctorViewScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              home
              title="Primary Care Doctor View"
              navigation={props.navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DoctorInfo"
        component={DoctorInfoScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Doctor Info" navigation={props.navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const ScheduleViewStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Schedule View"
        component={ScheduleViewScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header home title="Schedule View" navigation={props.navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AgentInfoStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Agent Info"
        component={AgentInfoScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Agent Info" navigation={props.navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const BookDoctorStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="BookDoctor"
        component={BookDoctorScreen}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

const ScheduleDetailStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="ScheduleDetail"
        component={ScheduleDetailScreen}
        options={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const PatientScheduleDetailStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="PatientScheduleDetail"
        component={PatientScheduleDetailScreen}
        options={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const CaseHistoryStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Case History"
        component={CaseHistoryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Case History" navigation={props.navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DashboardPatientStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="DashboardPatient"
        component={DashboardPatientScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              home
              title="DashboardPatient"
              navigation={props.navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DashboardDoctorStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="DashboardDoctor"
        component={DashboardDoctorScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              home
              title="DashboardDoctor"
              navigation={props.navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TimeSlotStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="TimeSlot"
        component={TimeSlotScreen}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

const DoctorDetailStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="DoctorDetail"
        component={DoctorDetailScreen}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

const NotificationStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        option={{
          header: ({ navigation, scene }) => (
            <Header home title="Notification" navigation={props.navigation} />
          ),
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

export default UserSelectStack;
