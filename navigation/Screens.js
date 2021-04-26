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
import ContactUsScreen from "../screens/ContactUs";
import AgreementScreen from "../screens/Agreement";
import AgentInfoScreen from "../screens/AgentInfo";
import AgentCaseDetailScreen from "../screens/AgentCaseDetail";
import BookDoctorScreen from "../screens/BookDoctor";
import PatientCaseHistoryScreen from "../screens/PatientCaseHistory";
import ChatScreen from "../screens/Chat";
import CartScreen from "../screens/Cart";
import CaseViewScreen from "../screens/CaseView";
import CustomDrawerContent from "./Menu";
import DoctorScheduleDetailScreen from "../screens/DoctorScheduleDetail";
import DashboardPatientScreen from "../screens/DashboardPatient";
import DashboardDoctorScreen from "../screens/DashboardDoctor";
import DashboardAgentScreen from "../screens/DashboardAgent";
import DoctorCaseViewScreen from "../screens/DoctorCaseView";
import DoctorDetailScreen from "../screens/DoctorDetail";
import DoctorInfoScreen from "../screens/DoctorInfo";
import DoctorCaseDetailScreen from "../screens/DoctorCaseDetail";
import LanguageScreen from "../screens/Language";
import NotificationScreen from "../screens/Notification";
import ProfileScreen from "../screens/Profile";
import PrivacyScreen from "../screens/Privacy";
import PatientScheduleDetailScreen from "../screens/PatientScheduleDetail";
import PatientViewScreen from "../screens/PatientView";
import PrimaryCareDoctorViewScreen from "../screens/PrimaryCareDoctorView";
import PatientCaseDetailScreen from "../screens/PatientCaseDetail";
import PatientActiveCaseScreen from "../screens/PatientActiveCase";
import PatientTimeSlotScreen from "../screens/PatientTimeSlot";
import PatientInfoScreen from "../screens/PatientInfo";
import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";
import ForgotPasswordScreen from "../screens/ForgotPassword";
import SettingsScreen from "../screens/Settings";
import ScheduleDetailScreen from "../screens/ScheduleDetail";
import ScheduleViewScreen from "../screens/ScheduleView";
import TimeSlotScreen from "../screens/TimeSlot";
import UserSelectScreen from "../screens/UserSelect";
import InsuranceInfoScreen from "../screens/InsuranceInfo";
import AgentFinalReviewScreen from "../screens/AgentFinalReview";
import DoctorReviewScreen from "../screens/DoctorTreatmentReview";
import CreateCaseScreen from "../screens/CreateCase";
import AddPatientScreen from "../screens/AddPatient";
import AddAttorneyScreen from "../screens/AddAttorney";
import AddInsuranceScreen from "../screens/AddInsurance";
import AddNotesScreen from "../screens/AddNotes";
import AgentDoctorDetailScreen from "../screens/AgentDoctorDetail";
import CreateDoctorAccountScreen from "../screens/CreateDoctorAccount";
import CalendarScreen from "../screens/Calendar";
import PatientActiveCase from "../screens/PatientActiveCase";
import PatientCaseFileScreen from "../screens/PatientCaseFile";
import UploadCaseFilesScreen from "../screens/UploadCaseFiles";
import ScheduleEditScreen from "../screens/EditSchedule";
import SchedulePatientListScreen from "../screens/SchedulePatientList";
import NotificationsScreen from "../screens/Notifications";
import FontScreen from "../screens/Font";
import NoteScreen from "../screens/Note";
import DoctorMyScheduleScreen from "../screens/DoctorMySchedule";
import DoctorCaseHistoryScreen from "../screens/DoctorCaseHistory";
import DoctorAllNotesScreen from "../screens/DoctorAllNotes";
import DoctorAddNotesScreen from "../screens/DoctorAddNotes";

import { IMLocalized } from "../src/localization/IMLocalization";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const SettingsStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="Settings" mode="card" headerMode="none">
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
      <Stack.Screen name="Font" component={FontScreen} />
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
        name="ContactUs"
        component={ContactUsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="ContactUs"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
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
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="DashboardAgent"
        component={DashboardAgentScreen}
        options={{
          headerTransparent: true,
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
    <Stack.Navigator mode="card" headerMode="none">
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

const DoctorCaseHistoryStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Case History"
        component={DoctorCaseHistoryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Doctor Info" navigation={props.navigation} />
          ),
        }}
      />
      <Stack.Screen name="PatientCaseFile" component={PatientCaseFileScreen} />
      <Stack.Screen name="DoctorCaseDetailFile" component={DoctorCaseDetailScreen} />
      <Stack.Screen name="DoctorAllNotes" component={DoctorAllNotesScreen} />
      <Stack.Screen name="DoctorAddNotes" component={DoctorAddNotesScreen} />
    </Stack.Navigator>
  );
};

const AppStack = (props) => {
  const userRole = useSelector((state) => state.user.role);

  let profile = {};
  switch (userRole) {
    case "agent":
      profile = {
        avatar: Images.Profile,
        name: "Agent",
        type: "Agent",
        plan: "Workforce",
      };
      break;
    case "patient":
      profile = {
        avatar: Images.Profile,
        name: "Patient",
        type: "Patient",
        plan: "Workforce",
      };
      break;
    case "doctor":
      profile = {
        avatar: Images.Profile,
        name: "Doctor",
        type: "Doctor",
        plan: "Workforce",
      };
      break;
    default:
      break;
  }

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
              headerTransparent: true,
            }}
          />
          <Drawer.Screen
            name="Agent Info"
            component={AgentInfoStack}
            options={{
              headerTransparent: true,
            }}
          />
          <Drawer.Screen
            name="Patients"
            component={PatientViewStack}
            options={{
              headerTransparent: true,
            }}
          />
          <Drawer.Screen
            name="Cases"
            component={CaseViewStack}
            options={{
              headerTransparent: true,
            }}
          />
          <Drawer.Screen
            name="Doctors"
            component={PrimaryCareDoctorViewStack}
            options={{
              headerTransparent: true,
            }}
          />
          <Drawer.Screen
            name="Schedules"
            component={ScheduleViewStack}
            options={{
              headerTransparent: true,
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
            component={DoctorDetailStack}
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
              headerTransparent: true,
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
            component={AgentFinalReviewScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="CreateCase"
            component={CreateCaseScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="AddPatient"
            component={AddPatientScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="AddAttorney"
            component={AddAttorneyScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="AddInsurance"
            component={AddInsuranceScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="AddNotes"
            component={AddNotesScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="AgentDoctorDetail"
            component={AgentDoctorDetailScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="CreateDoctorAccount"
            component={CreateDoctorAccountScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="ScheduleEdit"
            component={ScheduleEditScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="SchedulePatientList"
            component={SchedulePatientListScreen}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="PatientCaseFile"
            component={PatientCaseFileScreen}
          />
          <Stack.Screen name="Note" component={NoteScreen} />
          <Stack.Screen
            name="UploadCaseFiles"
            component={UploadCaseFilesScreen}
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

          <Drawer.Screen name="BookDoctor" component={BookDoctorStack} />

          <Stack.Screen name="DoctorDetail" component={DoctorDetailStack} />
          <Drawer.Screen name="Profile Info" component={PatientInfoStack} />
          <Drawer.Screen
            name="Case History"
            component={PatientCaseHistoryStack}
          />
          <Drawer.Screen name="Notification" component={NotificationStack} />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
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
            name="PatientCaseFile"
            component={PatientCaseFileScreen}
          />
          <Stack.Screen
            name="UploadCaseFiles"
            component={UploadCaseFilesScreen}
          />
          <Stack.Screen
            name="PatientCaseDetail"
            component={PatientCaseDetailScreen}
          />
          <Stack.Screen
            name="PatientActiveCase"
            component={PatientActiveCaseScreen}
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
            name="Case History"
            component={DoctorCaseHistoryStack}
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
          <Stack.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{
              headerTransparent: true,
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
          <Drawer.Screen
            name="DoctorMySchedule"
            component={DoctorMyScheduleScreen}
          />
          <Stack.Screen
            name="DoctorCaseDetail"
            component={DoctorCaseDetailScreen}
          />
          <Stack.Screen
            name="DoctorReview"
            component={DoctorReviewScreen}
            options={{
              headerTransparent: true,
            }}
          />
        </Drawer.Navigator>
      );
    default:
      break;
  }
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
      <Drawer.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
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
      <Stack.Screen
        name="InsuranceInfo"
        component={InsuranceInfoScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="AddNotes"
        component={AddNotesScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

const PatientInfoStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Patient Info"
        component={PatientInfoScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Patient Information" navigation={props.navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const PatientViewStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Patients"
        component={PatientViewScreen}
        options={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const CaseViewStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Cases"
        component={CaseViewScreen}
        options={{
          headerTransparent: true,
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
      <Stack.Screen name="AgentCaseDetail" component={AgentCaseDetailScreen} />
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
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Doctors"
        component={PrimaryCareDoctorViewScreen}
        options={{
          headerTransparent: true,
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
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Schedules"
        component={ScheduleViewScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header home title="Schedules" navigation={props.navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AgentInfoStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Agent Info"
        component={AgentInfoScreen}
        options={{
          headerTransparent: true,
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

const PatientCaseHistoryStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Case History"
        component={PatientCaseHistoryScreen}
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
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="DashboardPatient"
        component={DashboardPatientScreen}
      />
    </Stack.Navigator>
  );
};

const DashboardDoctorStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
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
    </Stack.Navigator>
  );
};

const NotificationStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

export default UserSelectStack;
