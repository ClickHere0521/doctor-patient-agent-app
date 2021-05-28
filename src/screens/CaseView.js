import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import LinearGradient from "react-native-linear-gradient";

import products from "../constants/images/home";
import { materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { useDispatch, useSelector } from "react-redux";
import { IMLocalized } from "../localization/IMLocalization";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem } from "../components/";
import SvgUri from "react-native-svg-uri";
import firestore from '@react-native-firebase/firestore';

import _ from "lodash";

import {
  useFocusEffect
} from '@react-navigation/native';

const { width, height } = Dimensions.get("screen");
const cardWidth = theme.SIZES.BASE * 4;

const sortCategories = [
  {
    title: "Case",
  },
  {
    title: "Date",
  },
  {
    title: "Current Status",
  },
];


const CaseView = (props) => {

  const [cases, setCases] = useState([]);

  let caseLists = [];
  const { navigation } = props;
  const [sortDirection, setSortDirection] = useState({
    patientName: true,
    caseCreateTime: true,
    caseStatus: true,
  });

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Log out",
          "Are you sure you want to log out?",
          [
            {
              text: "OK",
              onPress: () => { navigation.navigate("UserSelectStack") }
            },
            {
              text: "Cancel",
              onPress: () => { }
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
    firestore()
      .collection("Cases")
      .get()
      .then((querySnapshot) => {
        const caseArrayPromise = querySnapshot.docs.map((doc) => {
          return firestore()
            .collection("Cases")
            .doc(doc.id)
            .collection("Case")
            .get()
            .then((querySnapshot) => {
              const caseId = doc.id;
              var caseData = {};
              querySnapshot.forEach((caseDoc) => {
                const { patientName, avatar, patientReference, caseStatus, caseCreateTime, caseID, caseWarning, docId } =
                  caseDoc.data();
                caseData = { ...caseDoc.data() };
              });
              return caseData;
            });
        });
        Promise.all(caseArrayPromise).then((usersArray) => {
          setCases(usersArray);
        });
      });
  }, []);

  const renderEvents = (events) => {
    let { eventHeading, eventContent } = { ...events };
    const userRole = useSelector((state) => state.user.role);
    return (
      <Block style={styles.options}>
        <Block column space="between" style={styles.events} flex flexDirection="row">
          <Block row center style={{ padding: theme.SIZES.BASE }} >
            <Text color={"grey"} size={14}>
              {eventHeading}
            </Text>
            <Text color={"red"}> *</Text>
          </Block>
          <Block center style={{ paddingRight: theme.SIZES.BASE }}>
            <Text size={16} color={"black"}>
              {eventContent}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  };

  const renderSorts = () => {
    return (
      <Block style={{ marginTop: theme.SIZES.BASE / 2 }}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          decelerationRate={0}
          scrollEventThrottle={16} azzz
          snapToAlignment="center"
          style={{ width: width }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
          contentContainerStyle={{
            paddingHorizontal: theme.SIZES.BASE / 4,
          }}
        >
          <Block flexDirection="row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            {sortCategories &&
              sortCategories.map((item, index) => renderSort(item, index))}
          </Block>
        </ScrollView>
      </Block>
    );
  };

  const renderSort = (item, index) => {
    const sortting = () => {
      switch (item.title) {
        case 'Case':
          const sortArray = [...cases].sort((a, b) => {
            if (a.patientName < b.patientName) return (sortDirection.patientName ? -1 : 1);
            if (a.patientName > b.patientName) return (sortDirection.patientName ? 1 : -1);
            return 0;
          });
          setCases(sortArray);
          let temSort1 = { ...sortDirection };
          setSortDirection({ ...temSort1, patientName: !temSort1.patientName })
          break;
        case 'Date':
          const sortArray1 = [...cases].sort((a, b) => {
            if (a.caseCreateTime < b.caseCreateTime) return (sortDirection.caseCreateTime ? -1 : 1);
            if (a.caseCreateTime > b.caseCreateTime) return (sortDirection.caseCreateTime ? 1 : -1);
            return 0;
          });
          setCases(sortArray1);
          let temSort2 = { ...sortDirection };
          setSortDirection({ ...temSort2, caseCreateTime: !temSort2.caseCreateTime })
          break;
        case 'Current Status':
          const sortArray2 = [...cases].sort((a, b) => {
            if (a.caseStatus < b.caseStatus) return (sortDirection.caseStatus ? -1 : 1);
            if (a.caseStatus > b.caseStatus) return (sortDirection.caseStatus ? 1 : -1);
            return 0;
          });
          setCases(sortArray2);
          let temSort3 = { ...sortDirection };
          setSortDirection({ ...temSort3, caseStatus: !temSort3.caseStatus })
          break;
      }
    }

    return (
      <TouchableOpacity
        style={{ zIndex: 3, marginHorizontal: theme.SIZES.BASE }}
        key={`product-${item.title}`}
        onPress={() => {
          console.log("sortting");
          sortting();
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0.25, y: 1.1 }}
          locations={[0.2, 1]}
          colors={["#EFEFEF", "#FFF"]}
          style={styles.sortItem}
        >
          <Block center>
            <Text center size={13} fontWeight="semiBold">
              {item.title}
            </Text>
          </Block>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderPatientsList = () => {
    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>

          {cases.length === 0 ? (
            <ActivityIndicator size={50} color="#6E78F7" />):
            cases.map((val, index) =>
            (
              <ListItem key={index} category={val} product={products[0]} horizontal role="agentCases" />
            )
            )
          }

        </ScrollView>
      </Block>
    );
  };

  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
          >
            <Icon
              name="align-justify"
              family="font-awesome"
              color="black"
              size={16}
              style={styles.chevronLeft}
            />
          </TouchableOpacity>
          <Text
            color="black"
            style={{ paddingLeft: theme.SIZES.BASE }}
            size={16}
            fontWeight="semiBold"
          >
            {/* {IMLocalized("Cases")} */}
            Cases
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  return (
    <Block flex style={styles.profile}>
      {navbar()}
      <Block flex={1.3} style={{ backgroundColor: "#F8F8F8" }}>
        <Block
          style={{
            backgroundColor: "white",
            paddingVertical: theme.SIZES.BASE * 0.3,
          }}
        >
          <Block>
            <TouchableOpacity onPress={() => navigation.navigate("CreateCase", { editPatient: false })} style={{ width: 60 }}>
              <Image source={require("../assets/images/createCase.png")} />
            </TouchableOpacity>
            <Text size={10} style={{ left: 26 }}>
              Add
            </Text>

          </Block>
        </Block>
        {renderSorts()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderPatientsList()}
        </ScrollView>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    paddingTop: Platform.OS === "android" ? height * 0.02 : height * 0.02,
    backgroundColor: "white",
    width: width,
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
  },
  profileContainer: {
    width: width,
    height: "auto",
    flex: 0.6,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 90,
  },
  events: {
    padding: theme.SIZES.BASE * 0.2,
    marginLeft: 10,
  },
  marginLB10: {
    marginLeft: 10,
    marginBottom: 10,
  },
  marginR10: {
    right: theme.SIZES.BASE * 2,
    position: "absolute",
  },
  options: {
    width: width * 0.9,
    paddingHorizontal: theme.SIZES.BASE * 0.3,
    paddingVertical: theme.SIZES.BASE * 0.1,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE / 1.5,
    borderRadius: 40,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
    zIndex: 2,
    height: theme.SIZES.BASE * 3,
  },
  gradient: {
    zIndex: 10,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 3,
  },
  optionsCaseView: {
    paddingHorizontal: theme.SIZES.BASE / 2,
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: "#4a4a4a",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  sortItem: {
    borderWidth: 2,
    borderRadius: 1000,
    borderColor: "#EFEFEF",
    paddingVertical: 4,
    paddingHorizontal: width * 0.05,
    shadowColor: "black",
    shadowOffset: { width: -1, height: -1 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 1,
    margin: 2,
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  productRounded: {
    borderWidth: 2,
    borderRadius: 1000,
    borderColor: "#fff",
    padding: 3,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  productImage: {
    borderWidth: 1,
    borderRadius: 1000,
    padding: 5,
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
  },
  searchBtn: {
    position: "absolute",
    right: theme.SIZES.BASE,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    width: theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 2,
    paddingLeft: 5,
  },
  greyGradient: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
});

export default CaseView;
