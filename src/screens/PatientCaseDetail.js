import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions,
  Touchable,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { materialTheme, products, Images, tabs } from "../constants/";
import {
  Select,
  Icon,
  Header,
  Product,
  Switch,
  Tabs,
  ListItem,
} from "../components/";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import { SliderBox } from "react-native-image-slider-box";

const { width, height } = Dimensions.get("screen");

const Components = (props) => {
  const { navigation } = props;
  const [imageSource, setImageSource] = useState(null);
  const options = {
    title: "Load Photo",
    customButtons: [
      { name: "button_id_1", title: "CustomButton 1" },
      { name: "button_id_2", title: "CustomButton 2" },
    ],
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

  const weekBar = () => {
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
        <TouchableOpacity style={styles.dateActive}>
          <Text size={16} color={"white"}>
            WED
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateInActive}>
          <Text size={16} style={{ paddingLeft: 3 }}>
            THU
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateInActive}>
          <Text size={16} style={{ paddingLeft: 8 }}>
            FRI
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateInActive}>
          <Text size={16} style={{ paddingLeft: 6 }}>
            SAT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateInActive}>
          <Text size={16} style={{ paddingLeft: 4 }}>
            SUN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateInActive}>
          <Text size={16}>MON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateInActive}>
          <Text size={16} style={{ paddingLeft: 4 }}>
            THE
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderNotes = (notes) => {
    let { author, date, content } = notes;
    return (
      <Block row center style={styles.patientHeading}>
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
      </Block>
    );
  };

  return (
    <Block flex style={styles.agentCaseDetail}>
      <Block style={styles.roundBlock}>
        <Block row style={styles.heading}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              size={16}
              name="chevron-left"
              family="font-awesome"
              color={"white"}
              style={{ padding: 7 }}
            />
          </TouchableOpacity>
          <Block>
            <Text
              color="white"
              size={20}
              style={{ fontFamily: "Inter-Black" }}
              bold
            >
              Case Details
            </Text>
          </Block>
          <Block
            style={{
              position: "absolute",
              right: 10,
              padding: 7,
            }}
          >
            <Image source={require("../assets/images/editWhite.png")} />
          </Block>
        </Block>
      </Block>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        <Text bold size={18} style={{ paddingLeft: width * 0.05 }}>
          Patient
        </Text>
        <Block row center style={styles.patientHeading}>
          <Image
            source={require("../assets/images/patient1.png")}
            style={{ width: 60, height: 60 }}
          />
          <Block column style={{ paddingLeft: 10, width: width * 0.55 }}>
            <Text bold size={16}>
              Edie Sparks Turie
            </Text>
            <Text
              color={"#909CA1"}
              style={{ paddingTop: theme.SIZES.BASE * 0.5 }}
            >
              1993/04/29
            </Text>
          </Block>
          <Block column>
            <Text style={{ alignSelf: "flex-end" }} color={"#06D81E"}></Text>
            {/* <SvgUri
              width="20"
              height="20"
              source={require("../assets/icons/editGreen.svg")}
              style={{
                right: -theme.SIZES.BASE * 2,
                paddingTop: theme.SIZES.BASE,
              }}
            /> */}
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
            <Image
              source={require("../assets/images/ok.png")}
              style={{ position: "absolute", right: 0 }}
            />
          </Block>

          <Block column style={{ paddingLeft: 10, width: width * 0.55 }}>
            <Text bold size={16}>
              Edie Sparks
            </Text>
            <Text
              color={"#909CA1"}
              style={{ paddingTop: theme.SIZES.BASE * 0.5 }}
            >
              1993/04/29
            </Text>
          </Block>
          <Block column>
            <Text style={{ alignSelf: "flex-end" }} color={"#06D81E"}></Text>
            {/* <SvgUri
              width="20"
              height="20"
              source={require("../assets/icons/editGreen.svg")}
              style={{
                right: -theme.SIZES.BASE * 2,
                paddingTop: theme.SIZES.BASE,
              }}
            /> */}
          </Block>
        </Block>
        <Block style={styles.interval}>
          <Text bold size={18} style={{ paddingLeft: width * 0.05 }}>
            Status
          </Text>
          <Text size={16} style={styles.startTimeRight}>
            Case start time：2020.09.23
          </Text>
        </Block>
        <Block center>
          <Block row>
            <Block style={{ marginLeft: 30 }}>
              <Block row>
                {/* <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                /> */}
                <Text size={16} style={styles.text}>
                  New case
                </Text>
              </Block>
              <Block row>
                {/* <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                /> */}
                <Text size={16} style={styles.text}>
                  Waiting schedule
                </Text>
              </Block>
              <Block row>
                {/* <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                /> */}
                <Text size={16} style={styles.text}>
                  Scheduled
                </Text>
              </Block>
            </Block>
            <Block style={{ marginLeft: 30 }}>
              <Block row>
                {/* <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                /> */}
                <Text size={16} style={styles.text}>
                  Treatment
                </Text>
              </Block>
              <Block row>
                {/* <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                /> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("AgentReview")}
                >
                  <Text color={"#6E78F7"} size={16} style={styles.text}>
                    Case final review
                  </Text>
                </TouchableOpacity>
              </Block>
              <Block row>
                {/* <SvgUri
                  width="25"
                  height="25"
                  source={require("../assets/icons/rect_check.svg")}
                  style={{
                    position: "absolute",
                    marginLeft: -16,
                    marginTop: 6,
                  }}
                /> */}
                <Text color={"black"} size={16} style={styles.text}>
                  Discharged
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block style={styles.interval}>
          <Text bold size={18} style={{ paddingLeft: width * 0.05 }}>
            Date of Injury
          </Text>
          <Text size={16} style={styles.startTime}>
            23.09.2020
          </Text>
        </Block>
        <Block row style={styles.interval}>
          <Text bold size={18} color={"black"} style={{ paddingLeft: width * 0.05 }}>
            Attorney Info
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("AddAfforney")}>
            <Text size={16} color={"#6E78F7"} style={styles.startTimeDetail, {marginLeft: width * 0.2}}>
              Detail
            </Text>
          </TouchableOpacity>
        </Block>
        <Block row style={styles.interval}>
          <Text bold size={18} color={"black"} style={{ paddingLeft: width * 0.05 }}>
            Insurance Info
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("AddInsurance")}>
            <Text size={16} color={"#6E78F7"} style={styles.startTimeDetail, {marginLeft: width * 0.18}}>
              Detail
            </Text>
          </TouchableOpacity>
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
            onPress={() => navigation.navigate('PatientCaseFile')}
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
            }}
            onPress={() => navigation.navigate("CreateCase")}
          >
            <Text color={"white"}>
              {/* <SvgUri
                width="16"
                height="16"
                source={require("../assets/icons/add.svg")}
              /> */}
            </Text>
          </TouchableOpacity>
        </Block>
        {renderNotes({
          author: "DR.Adila Tahir",
          date: "21/02/2021",
          content: "Please don't say that...",
        })}
        {renderNotes({
          author: "DR.Adila Tahir",
          date: "21/02/2021",
          content: "Please don't say that...",
        })}
        {renderNotes({
          author: "DR.Adila Tahir",
          date: "21/02/2021",
          content: "Please don't say that...",
        })}
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
    marginHorizontal: 10,
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
});

export default Components;
