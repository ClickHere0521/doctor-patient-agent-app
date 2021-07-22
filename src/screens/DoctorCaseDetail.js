import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import {
  Icon,
} from "../components/";
import { IMLocalized } from "../localization/IMLocalization";
import { CheckBox } from "react-native-elements";
import firestore from '@react-native-firebase/firestore';
const { width, height } = Dimensions.get("screen");

const Components = (props) => {
  const { navigation } = props;
  const { category } = props.route.params;
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
  const [caseStatus, setCaseStatus] = useState(category.caseStatus);
  console.log("=======================", category);
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
            <TouchableOpacity key={index} onPress={() => { handleWeekbar(index) }} style={value.status ? styles.dateActive : styles.dateInActive}>
              <Text size={16} color={value.status ? "white" : "black"}>
                {value.date}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    );
  };
  const renderNotes = (notes) => {
    let { author, date, content, index } = notes;
    return (
      <Block key={index} row center style={styles.patientHeading}>
        <Block>
          <Image
            source={require("../assets/images/grayscale-photo-of-man2.png")}
            style={{ width: 60, height: 60 }}
          />
          <Image
            source={require("../assets/images/ok.png")}
            style={{ position: "absolute", right: 0 }}
          />
        </Block>
        <TouchableOpacity
          onPress={() => navigation.navigate("DoctorAddNotes", {category, notes, edit: true})}
        >
          <Block column style={{ paddingLeft: 10, width: width * 0.7 }}>
            <Text bold size={16}>
              {author}
            </Text>
            <Text
              color={"#909CA1"}
              style={{ paddingTop: theme.SIZES.BASE * 0.5 }}
            >
              {date.toDate().toDateString()}
            </Text>
            <Text
              color={"#909CA1"}
              style={{ paddingTop: theme.SIZES.BASE * 0.5 }}
            >
              {content}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };
  const changeStatus = (statusNum) => {
    setCaseStatus(statusNum);
    firestore().collection('Cases').doc(category.uID).collection("Case").doc(category.caseID).update({
      caseStatus: statusNum
    });
  }
  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
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
          Case Detail
        </Text>
      </Block>
    );
  };

  return (
    <Block flex style={styles.agentCaseDetail}>
      {navbar()}
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        <Text bold size={18} style={{ paddingLeft: width * 0.05 }}>
          Patient
        </Text>
        <Block row center style={styles.patientHeading}>
          <Image 
            source={category && category.patientInfo.avatar ? { uri: (category && category.patientInfo.avatar) } : require("../assets/images/userDefault.png")}
            style={styles.avatar} 
          />
          <Block column style={{ paddingLeft: 10, width: width * 0.55 }}>
            <Text size={16}>
              {category.patientInfo.patientName}
            </Text>
            <Text
              color={"#909CA1"}
              style={{ paddingTop: theme.SIZES.BASE * 0.5 }}
            >
              {category.caseCreateTime.toDate().toDateString()}
            </Text>
          </Block>
        </Block>
        <Text bold size={18} style={{ paddingLeft: width * 0.05 }}>
          Doctor
        </Text>
        <Block row center style={styles.patientHeading}>
          <Block>
            <Image
              source={require("../assets/images/grayscale-photo-of-man2.png")}
              style={{ width: 60, height: 60 }}
            />
          </Block>
          <Block column style={{ paddingLeft: 10, width: width * 0.55 }}>
            <Text size={16}>
              {category.pcDoctorInfo.name}
            </Text>
            <Text
              color={"#909CA1"}
              style={{ paddingTop: theme.SIZES.BASE * 0.5 }}
            >
              {category.pcDoctorInfo.phone}
            </Text>
          </Block>
        </Block>
        <Block style={styles.interval}>
          <Text bold size={18} style={{ paddingLeft: width * 0.05 }}>
            Status
          </Text>
          <Text size={14} style={styles.startTimeRight}>
            Case start time：{category.caseCreateTime.toDate().toDateString()}
          </Text>
        </Block>
        <Block center>
          <Block row>
            <Block>
              <Block row>
                <CheckBox checked={caseStatus >= 1 ? true : false} onPress={() => changeStatus(1)} />
                <Block style={styles.textCenter}>
                  <Text size={16} style={styles.text}>
                    New case
                  </Text>
                </Block>
              </Block>
              <Block row>
                <CheckBox checked={caseStatus >= 2 ? true : false} onPress={() => changeStatus(2)} />
                <Block style={styles.textCenter}>
                  <Text size={16} style={styles.text}>
                    Waiting Schedule
                  </Text>
                </Block>
              </Block>
              <Block row>
                <CheckBox checked={caseStatus >= 3 ? true : false} onPress={() => changeStatus(3)} />
                <Block style={styles.textCenter}>
                  <Text size={16} style={styles.text}>
                    Schedules
                  </Text>
                </Block>
              </Block>
            </Block>
            <Block>
              <Block row>
                <CheckBox checked={caseStatus >= 4 ? true : false} onPress={() => changeStatus(4)} />
                <Block style={styles.textCenter}>
                  <Text size={16} style={styles.text}>
                    Treatment
                  </Text>
                </Block>
              </Block>
              <Block row>
                <CheckBox checked={caseStatus >= 5 ? true : false} onPress={() => changeStatus(5)} />
                <TouchableOpacity
                  onPress={() => navigation.navigate("AgentReview")}
                  style={styles.textCenter}
                >
                  <Text color={"#6E78F7"} size={16} style={styles.text}>
                    Case final review
                  </Text>
                </TouchableOpacity>
              </Block>
              <Block row>
                <CheckBox disabled checked={caseStatus >= 6 ? true : false} />
                <Block style={styles.textCenter}>
                  <Text color="black" size={16} style={styles.text}>
                    Discharged
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block row style={styles.interval}>
          <Block flex={6}>
            <Text bold size={18} style={{ paddingLeft: width * 0.05 }}>
              Date of Injury
            </Text>
          </Block>
          <Block flex={5}>
            <Text size={16}>
              {category.dateOfInjury.toDate().toDateString()}
            </Text>
          </Block>
        </Block>
        <Block row style={styles.interval}>
          <Block flex={6}>
            <Text
              bold
              size={18}
              color={"black"}
              style={{ paddingLeft: width * 0.05 }}
            >
              Attorney Info
            </Text>
          </Block>
          <Block flex={5}>
            <TouchableOpacity onPress={() => navigation.navigate("AddAttorney", { info: category.attorneyInfo })}>
              <Text
                size={16}
                color={"#6E78F7"}
              >
                Detail
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
        <Block row style={styles.interval}>
          <Block flex={6}>
            <Text
              bold
              size={18}
              color={"black"}
              style={{ paddingLeft: width * 0.05 }}
            >
              Insurance Info
            </Text>
          </Block>
          <Block flex={5}>
            <TouchableOpacity onPress={() => navigation.navigate("AddInsurance", {info: category.InsuranceInfo})}>
              <Text
                size={16}
                color={"#6E78F7"}
              >
                Detail
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
        <Block style={styles.interval}>
          <Text bold size={18} style={{ paddingLeft: width * 0.05 }}>
            Schedule
          </Text>
        </Block>
        {weekBar()}
        <Block center row style={{ marginBottom: 10 }}>
          <Text style={{ marginRight: width * 0.3 }}>9.00-11.00</Text>
          <Text>Dr.Ronald</Text>
        </Block>
        <Block row center>
          <TouchableOpacity
            style={styles.save}
            onPress={() => navigation.navigate("PatientCaseFile")}
          >
            <Text color={"white"} size={16}>
              Case file
            </Text>
          </TouchableOpacity>
        </Block>
        <Block style={styles.bar}></Block>
        <Block style={styles.interval}>
          <Text bold size={18} style={{ paddingLeft: width * 0.05 }}>
            Notes
          </Text>
          <TouchableOpacity
            style={{
              right: theme.SIZES.BASE * 1,
              top: theme.SIZES.BASE * 0.3,
              position: "absolute",
              zIndex: 10,
              width: 20,
              height: 20,
            }}
            onPress={() => navigation.navigate("DoctorAddNotes", {category, edit: false})}
          >
            <Image source={require('../assets/images/add.png')} alt="" />
          </TouchableOpacity>
        </Block>
        {category.notes.map((value, index) => {
          return (
            renderNotes({
              author: value.authorName,
              date: value.createDate && value.createDate,
              content: value.note,
              index
            })
          )
        })}
        {/* {renderNotes({
          author: category.notes[0].authorName,
          date: category.notes[0].createDate.toDate().toDateString(),
          content: category.notes[0].note,
        })}
        {renderNotes({
          author: category.notes[1].authorName,
          date: category.notes[1].createDate.toDate().toDateString(),
          content: category.notes[1].note,
        })} */}
        <Block style={{ marginBottom: 50 }}></Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  components: {
    paddingTop: theme.SIZES.BASE,
    backgroundColor: "white",
  },
  patientImage: {
    width: 60,
    height: 60,
  },
  statusImage: {
    position: "absolute",
    right: 0,
  },
  takePhoto: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#CCCCCC",
    paddingVertical: 8,
    paddingHorizontal: 32,
    marginTop: 16,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  doctor: {
    paddingVertical: 14,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginTop: theme.SIZES.BASE * 18,
  },
  doctorItem: {
    marginHorizontal: 10,
  },
  profileBtn: {
    borderRadius: 20,
    backgroundColor: "#00CE30",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  text: {
    marginVertical: 10,
  },
  startTimeRight: {
    marginHorizontal: 10,
    position: "absolute",
    right: 16,
  },
  camera: {
    backgroundColor: "#E7F0FF",
    borderRadius: 30,
    marginVertical: theme.SIZES.BASE * 4,
    width: 250,
    height: 250,
    position: "absolute",
  },
  slider: {
    position: "absolute",
    marginTop: theme.SIZES.BASE * 4,
  },
  backIcon: {
    position: "absolute",
    marginLeft: theme.SIZES.BASE * 2,
  },
  roundBlock: {
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    backgroundColor: "rgba(100, 120, 247, 0.84)",
    height: height * 0.16,
    width: width,
    top: -10,
    zIndex: 2,
  },
  heading: {
    marginTop: height * 0.08,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    zIndex: 1,
  },
  agentCaseDetail: {
    backgroundColor: "white",
  },
  patientHeading: {
    width: width * 0.92,
    borderColor: "#F1F1F1",
    borderRadius: 20,
    shadowColor: "grey",
    shadowOpacity: 0.2,
    shadowOpacity: 5,
    elevation: 2,
    backgroundColor: "#FEFEFE",
    padding: 10,
    marginVertical: 5,
  },
  interval: {
    marginTop: 14,
  },
  weekScrollView: {
    marginVertical: theme.SIZES.BASE,
    padding: theme.SIZES.BASE,
    marginRight: theme.SIZES.BASE,
    paddingTop: 0,
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
  save: {
    backgroundColor: "#00CE30",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  bar: {
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
    paddingTop: 20,
    width: width * 0.8,
  },
  startTimeDetail: {
    textDecorationLine: "underline",
    marginHorizontal: 10,
  },
  navbar: {
    backgroundColor: "#6E78F7",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE,
  },
  textCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 15
  },
});

export default Components;
