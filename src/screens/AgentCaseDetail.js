import React, { useEffect, useState, useRef } from "react";
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
  ListItem,
} from "../components/";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import { SliderBox } from "react-native-image-slider-box";
import { CheckBox } from "react-native-elements";
import { weekdays } from "moment";
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get("screen");

const Components = (props) => {
  const isFocused = useIsFocused();
  const scrollRef = useRef();
  const { navigation } = props;
  let { category } = props.route.params;
  const [imageSource, setImageSource] = useState(null);
  const [weekState, setWeekState] = useState([]);

  useEffect(() => {
    if (isFocused) {
      scrollRef.current.scrollTo({ x: 0, y: 100, animated: true })
      setWeekState([
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
    }
  }, [isFocused]);

  const [caseStatus, setCaseStatus] = useState(category.caseStatus);

  const weekBar = () => {
    // if (caseStatus > 2) {
      const handleWeekbar = index => {
        scrollRef.current.scrollTo({ x: 38 * index, y: 100, animated: true });
        weekState.map((value, indexTemp) => {
          weekState[indexTemp].status = (index == indexTemp) ? true : false;
        })
        setWeekState([...weekState]);
      }
      return (
        <ScrollView
          ref={scrollRef}
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
    // }
    // else {
    //   return (
    //     <Block></Block>
    //   )
    // }
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
          onPress={() => navigation.navigate("Note", { notes })}
        >
          <Block column style={{ paddingLeft: 10, width: width * 0.7 }}>
            <Text bold size={16}>
              {author}
            </Text>
            <Text
              color={"#909CA1"}
              style={{ paddingTop: theme.SIZES.BASE * 0.5 }}
            >
              {date}
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
    console.log(category);
    console.log("Uid:", category.uID, "caseID", category.caseID, "statusNum", statusNum);
    firestore().collection('Cases').doc(category.uID).collection("Case").doc(category.caseID).update({
      caseStatus: statusNum
    });
  }
  const navbar = () => {
    return (
      <Block row style={styles.navbar} center>
        <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.goBack()}>
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
          style={{ paddingLeft: theme.SIZES.BASE * 0.5 }}
          size={16}
          bold
        >
          Case Detail
        </Text>
      </Block>
    );
  };

  const doctorCard = () => {
    if (caseStatus > 2) {
      return (
        <Block>
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
        </Block>
      )
    }
    else {
      return (
        <Block></Block>
      )
    }
  }
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
        {doctorCard()}
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
                <CheckBox checked={caseStatus >= 6 ? true : false} onPress={() => changeStatus(6)} />
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
            <TouchableOpacity onPress={() => navigation.navigate("AddInsurance", { info: category.InsuranceInfo })}>
              <Text
                size={16}
                color={"#6E78F7"}
              >
                Detail
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
        {caseStatus > 2 ?
          <Block style={styles.interval}>
            <Text bold size={18} style={{ paddingLeft: width * 0.05 }}>
              Schedule
            </Text>
          </Block> : <Block></Block>}
        {weekBar()}
        {caseStatus > 2 ?
          <Block center row style={{ marginBottom: 10 }}>
            <Text style={{ marginRight: width * 0.3 }}>9.00-11.00</Text>
            <Text>Dr.Ronald</Text>
          </Block> : <Block />}

        <Block row center>
          <TouchableOpacity
            style={styles.save}
            onPress={() => navigation.navigate("PatientCaseFile", {category})}
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
          {/* <TouchableOpacity
            style={{
              right: theme.SIZES.BASE * 1,
              top: theme.SIZES.BASE * 0.3,
              position: "absolute",
              zIndex: 10,
            }}
            onPress={() => navigation.navigate("AddNotes")}
          >
            <Text color={"white"}>
              <SvgUri
                width="16"
                height="16"
                source={require("../assets/icons/add.svg")}
              />
            </Text>
          </TouchableOpacity> */}
        </Block>
        {category.notes.map((value, index) => {
          return (
            renderNotes({
              author: value.authorName,
              date: value.createDate.toDate().toDateString(),
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 15
  },
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
  startTime: {
    marginHorizontal: 10,
    position: "absolute",
    left: width * 0.5,
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
    shadowOffset: {
      width: 0,
      height: 5
    },
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
    width: width * 0.35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  touchableArea: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navbar: {
    backgroundColor: "#6E78F7",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE * 0.5,
  },
  textCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Components;
