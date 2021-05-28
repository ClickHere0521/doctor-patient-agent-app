import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { IMLocalized } from "../localization/IMLocalization";
import {
  Select,
  Icon,
} from "../components/";
import Accordion from "react-native-collapsible/Accordion";
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get("screen");

const ScheduleView = (props) => {
  const { navigation } = props;
  const [activeSections, setActiveSections] = useState([0]);
  const [schedule, setSchedule] = useState([]);
  let doctorId;

  const [weekState, setWeekState] = useState([
    {
      date: "MON",
      status: true,
    },
    {
      date: "TUE",
      status: false,
    },
    {
      date: "WED",
      status: false,
    },
    {
      date: "THU",
      status: false,
    },
    {
      date: "FRI",
      status: false,
    },
    {
      date: "SAT",
      status: false,
    },
    {
      date: "SUN",
      status: false,
    },
  ]);

  useEffect(() => {
    firestore()
      .collection("PCDoctors")
      .get()
      .then((querySnapshot) => {
        const doctorArrayPromise = querySnapshot.docs.map((doc) => {
          return firestore()
            .collection("PCDoctors")
            .doc(doc.id)
            .collection("PCDoctor")
            .get()
            .then((querySnapshot) => {
              doctorId = doc.id;
              var doctorData = {};
              querySnapshot.forEach((doctorDoc) => {
                const { address, city_state, email, name, phone, description } =
                  doctorDoc.data();
                doctorData = { ...doctorDoc.data(), doctorId };
              });
              return doctorData;
            });
        });
        Promise.all(doctorArrayPromise).then((usersArray) => {
          setSchedule(usersArray);
        });
      });
  }, []);

  const weekBar = () => {
    const handleWeekbar = index => {
      weekState.map((value, indexTemp) => {
        weekState[indexTemp].status = (index == indexTemp) ? true : false;
      })        
      setWeekState([...weekState]);      
    }
    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        snapToInterval={theme.SIZES.BASE * 0.375}
        style={styles.weekScrollView}
      >
        {weekState.map((value, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => {handleWeekbar(index)}} style={value.status ? styles.dateActive : styles.dateInActive}>
              <Text size={16} color={value.status ? "white" : "black"}>
                {value.date}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    );
  };

  const _renderHeader = (section) => {
    return (
      <Block flex style={[styles.container]}>
        <Block flex style={{ flexDirection: "row" }}>
          <Block style={[styles.picBox]}>
            <Image
              source={{
                uri: section.avatar,
              }}
              style={[
                styles.picBox,
                {
                  height: theme.SIZES.BASE * 3.5,
                  width: theme.SIZES.BASE * 3.5,
                },
              ]}
            />
          </Block>
          <Block flex style={styles.ml_3}>
            <Text size={22}>{section.name}</Text>
            <Text size={14} muted>
              {"Phone +"}{section.phone}{" "}
            </Text>
          </Block>
          <Block center>
            <Icon
              name="chevron-down"
              family="font-awesome"
              color={theme.COLORS.MUTED}
              size={theme.SIZES.BASE}
            >
              {" "}
            </Icon>
          </Block>
        </Block>
        <Block style={{ paddingTop: 10 }}>
          <Text size={16}>
            {section.address}
          </Text>
        </Block>
      </Block>
    );
  };

  const _renderContent = (section) => {
    return (
      <Block flex style={[styles.contentContainer]}>
        <Block flex style={{ flexDirection: "column" }}>
          <Block flex>
            <Text size={16}>
              <Text bold>Description:</Text>
              {section.description}
            </Text>
          </Block>
        </Block>
        <Button
          shadowless
          color={"#00CE30"}
          style={[styles.button]}
          onPress={() => navigation.navigate("ScheduleDetail", {section})}
        >
          <Text size={15} color={"white"}>
            Detail
          </Text>
        </Button>
      </Block>
    );
  };

  const onChangeHandle = (event) => {
    setActiveSections(event);
  };

  const renderPatientsList = () => {
    return (
      <Block style={{ marginBottom: theme.SIZES.BASE * 2 }}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <Block height={theme.SIZES.BASE} flex></Block>
          {schedule.length == 0 ? (
            <ActivityIndicator size={50} color="#6E78F7" />
          ) : (
            <Accordion
              sections={schedule}
              activeSections={activeSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={onChangeHandle}
              style={{backgroundColor: 'white'}}
            />
          )}
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
            size={20}
            fontWeight="semiBold"
          >
            {IMLocalized("schedules")}
          </Text>
          
        {/* <Block row>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateDoctorAccount")}
            style={{ paddingLeft: width * 0.4, padding: 2 }}
          >
            <Text color={"white"}>
              <SvgUri
                width="18"
                height="18"
                source={require("../assets/icons/add.svg")}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={{ paddingLeft: width * 0.02, padding: 2 }}
          >
            <Text color={"white"}>
              <SvgUri
                width="20"
                height="20"
                source={require("../assets/icons/headerEditBlack.svg")}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={{ paddingLeft: width * 0.02 }}
          >
            <Text color={"white"}>
              <SvgUri
                width="24"
                height="24"
                source={require("../assets/icons/trash.svg")}
              />
            </Text>
          </TouchableOpacity>
        </Block> */}
      
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  return (
    <Block flex>
      {navbar()}
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        <Block style={{ margin: theme.SIZES.BASE, marginBottom: 0 }}>
          <Text size={22}>Appointments</Text>
        </Block>
        {weekBar()}
        {renderPatientsList()}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  weekScrollView: {
    marginVertical: theme.SIZES.BASE,
    padding: theme.SIZES.BASE,
    paddingTop: 0,
  },
  container: {
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 4,
    padding: theme.SIZES.BASE * 1.5,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    borderBottomWidth: 0,
  },
  contentContainer: {
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 4,
    padding: theme.SIZES.BASE * 1.5,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    borderTopWidth: 0,
    paddingTop: 0,
    marginBottom: theme.SIZES.BASE * 3,
  },
  picBox: {
    borderRadius: 16,

  },
  ml_1: {
    marginLeft: theme.SIZES.BASE / 2,
  },
  ml_2: {
    marginLeft: theme.SIZES.BASE,
  },
  ml_3: {
    marginLeft: theme.SIZES.BASE * 2,
  },
  ml_4: {
    marginLeft: theme.SIZES.BASE * 3,
  },
  components: {
    backgroundColor: "#FFFFFF",
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: theme.SIZES.BASE * 8,
    borderRadius: 15,
    position: "absolute",
    right: theme.SIZES.BASE * 2,
    bottom: -theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 2,
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
  dateActive: {
    backgroundColor: "#00CE30",
    borderRadius: theme.SIZES.BASE * 1.5,
    paddingHorizontal: 8,
    paddingVertical: 20,
    marginRight: theme.SIZES.BASE,
    width: theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  dateInActive: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: theme.SIZES.BASE * 1.5,
    paddingHorizontal: 4,
    paddingVertical: 20,
    marginRight: theme.SIZES.BASE,
    width: theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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

export default ScheduleView;