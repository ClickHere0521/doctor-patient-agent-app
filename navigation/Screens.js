import React from "react";
import { Easing, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Icon, Header } from "../components/";
import { Images, materialTheme } from "../constants/";

// screens
import OnboardingScreen from "../screens/Onboarding";
import HomeScreen from "../screens/Home";
import WomanScreen from "../screens/Woman";
import ManScreen from "../screens/Man";
import KidsScreen from "../screens/Kids";
import NewCollectionScreen from "../screens/NewCollection";
import DealsScreen from "../screens/Deals";

import CategoriesScreen from "../screens/Categories";
import CategoryScreen from "../screens/Category";
import ProductScreen from "../screens/Product";
import GalleryScreen from "../screens/Gallery";
import ChatScreen from "../screens/Chat";

import CartScreen from "../screens/Cart";
import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";

import SearchScreen from "../screens/Search";
import ComponentsScreen from "../screens/Components";

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
import EditProfileScreen from "../screens/EditProfile";
import NotificationScreen from "../screens/Notification";
import CaseHistoryScreen from "../screens/CaseHistory";
import PatientViewScreen from "../screens/PatientView";
import PrimaryCareDoctorViewScreen from "../screens/PrimaryCareDoctorView";
import BookDoctorScreen from "../screens/BookDoctor";
import CaseViewScreen from "../screens/CaseView";
import CustomDrawerContent from "./Menu";
import TimeSlotScreen from "../screens/TimeSlot";
import DoctorDetailScreen from "../screens/DoctorDetail";

import { tabs } from "../constants/";

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
        name="Agency Info"
        component={ProfileScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              title="Agency Info"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true
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
          )
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Cart" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

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
          )
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
          )
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
          )
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
          )
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
          )
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
          )
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
          )
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
          )
        }}
      />
    </Stack.Navigator>
  );
}

const ComponentsStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="Components" mode="card" headerMode="screen">
      <Stack.Screen
        name="Components"
        component={ComponentsScreen}
        options={{
          header: ({ navigation }) => (
            <Header title="Components" navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

const OnboardingStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

const WomanStack = (props) =>{
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Woman"
        component={WomanScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              options
              title="Woman"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              tabs={tabs.deals}
              title="Best Deals"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation, scene, route }) => (
            <Header
              back
              tabs={tabs.categories}
              tabIndex={tabs.categories[1].id}
              title="Categories"
              navigation={navigation}
              route={route}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          header: ({ navigation, scene }) => {
            const { params } = scene.descriptor;
            const title = (params && params.headerTitle) || "Category";
            return (
              <Header
                back
                title={title}
                navigation={navigation}
                scene={scene}
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
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
          )
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
          )
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Search" navigation={navigation} scene={scene} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

const ManStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Man"
        component={ManScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              options
              title="Man"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              tabs={tabs.deals}
              title="Best Deals"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation, scene, route }) => (
            <Header
              back
              tabs={tabs.categories}
              tabIndex={tabs.categories[1].id}
              title="Categories"
              navigation={navigation}
              route={route}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          header: ({ navigation, scene }) => {
            const { params } = scene.descriptor;
            const title = (params && params.headerTitle) || "Category";
            return (
              <Header
                back
                title={title}
                navigation={navigation}
                scene={scene}
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
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
          )
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
          )
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Search" navigation={navigation} scene={scene} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

const KidsStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Kids"
        component={KidsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              options
              title="Kids"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              tabs={tabs.deals}
              title="Best Deals"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation, scene, route }) => (
            <Header
              back
              tabs={tabs.categories}
              tabIndex={tabs.categories[1].id}
              title="Categories"
              navigation={navigation}
              route={route}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          header: ({ navigation, scene }) => {
            const { params } = scene.descriptor;
            const title = (params && params.headerTitle) || "Category";
            return (
              <Header
                back
                title={title}
                navigation={navigation}
                scene={scene}
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
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
          )
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
          )
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Search" navigation={navigation} scene={scene} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

const NewCollectionStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="NewCollection"
        component={NewCollectionScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              options
              title="New Collection"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              tabs={tabs.deals}
              title="Best Deals"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation, scene, route }) => (
            <Header
              back
              tabs={tabs.categories}
              tabIndex={tabs.categories[1].id}
              title="Categories"
              navigation={navigation}
              route={route}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          header: ({ navigation, scene }) => {
            const { params } = scene.descriptor;
            const title = (params && params.headerTitle) || "Category";
            return (
              <Header
                back
                title={title}
                navigation={navigation}
                scene={scene}
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
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
          )
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
          )
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Search" navigation={navigation} scene={scene} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

const HomeStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header               
              title="Dashboard" 
              navigation={props.navigation}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

const AppStack = (props) => {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => (
        <CustomDrawerContent {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          // paddingVertical: 4,
          justifyContent: "center",
          alignContent: "center",
          // alignItems: 'center',
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 48,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Dashboard"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-woman"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginLeft: 4, marginRight: 4 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Agent Info"
        component={ProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
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
          )
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
          )
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
          )
        }}
      />
      <Drawer.Screen
        name="Schedule View"
        component={ProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="calender"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
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
          )
        }}
      />
      <Drawer.Screen
        name="Components"
        component={ComponentsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-switch"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Patient Info"
        component={PatientInfoStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-woman"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginLeft: 4, marginRight: 4 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Doctor Schedule Detail"
        component={DoctorScheduleDetailStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-woman"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginLeft: 4, marginRight: 4 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Edit Profile"
        component={EditProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-woman"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginLeft: 4, marginRight: 4 }}
            />
          )
        }}
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
          )
        }}
      />
      <Drawer.Screen
        name="CaseHistory"
        component={CaseHistoryStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-woman"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginLeft: 4, marginRight: 4 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="BookDoctor"
        component={BookDoctorScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-person-add"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Time Slot"
        component={TimeSlotStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="briefcase-medical"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Doctor Detail"
        component={DoctorDetailStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="briefcase-medical"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Sign In"
        component={SignInScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="ios-log-in"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
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
          )
        }}
      />
    </Drawer.Navigator>
  );
}

const UserSelectStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="UserSelectStack"
        component={UserSelectScreen}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

const PatientInfoStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Patient Info"
        component={PatientInfoScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back 
              title="Patient Information" 
              navigation={props.navigation}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

const PatientViewStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Patient View"
        component={PatientViewScreen}
        option={{
          header: ({ navigation, scene }) => (
            <Header
              back 
              title="Patient View" 
              navigation={props.navigation}
            />
          )
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

const DoctorScheduleDetailStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Doctor Detail"
        component={DoctorScheduleDetailScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back 
              title="Doctor Schedule Detail" 
              navigation={props.navigation}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

const PrimaryCareDoctorViewStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Primary Care Doctor View"
        component={PrimaryCareDoctorViewScreen}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

const EditProfileStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back 
              title="Edit Profile" 
              navigation={props.navigation}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

const BookDoctorStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="BookDoctor"
        component={BookDoctorScreen}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

const NotificationStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerTransparent: true          
        }}
      />      
    </Stack.Navigator>
  );
}

const CaseHistoryStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="CaseHistory"
        component={CaseHistoryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back               
              title="CaseHistory" 
              navigation={props.navigation}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

const CaseViewStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Case View"
        component={CaseViewScreen}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

const TimeSlotStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="TimeSlot"
        component={TimeSlotScreen}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

const DoctorDetailStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Doctor Detail"
        component={DoctorDetailScreen}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

export default UserSelectStack;
