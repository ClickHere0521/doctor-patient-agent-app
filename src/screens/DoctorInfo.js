import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Block, Button, Text, theme, Input } from "galio-framework";
import materialTheme from "../constants/Theme";
import { IMLocalized, init } from "../localization/IMLocalization";
import { Icon } from "../components/";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const { height, width } = Dimensions.get("screen");

const AgentDoctorDetail = (props) => {
  const { navigation } = props;
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const currentUserUid = auth().currentUser.uid;
    firestore().collection('PCDoctors').doc(currentUserUid).collection('PCDoctor').get().then((querySnapshot) => {
      let doctorTemp = {};
      querySnapshot.forEach((doc) => {
        doctorTemp = doc.data();
      });
      setDoctor(doctorTemp);
    });
  }, []);
  
  const navbar = () => {
    return (
      <Block row flexDirection="row" style={styles.navbar} center>
        <Block flex={1}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
          >
            <Icon
              name="align-justify"
              family="font-awesome"
              color="white"
              size={16}
            />
          </TouchableOpacity>
        </Block>
        <Block flex={14}>
          <Text
            color="white"
            size={17}
            bold
          >
            {IMLocalized('profileInfo')}
          </Text>
        </Block>
        {/* <Block flex={2}>
          <TouchableOpacity>
            <Image
              source={require("../assets/icons/editHeaderWhite.png")}
              alt=""
            />
          </TouchableOpacity>
        </Block> */}
      </Block>
    );
  };

  return (
    <Block>
      {navbar()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={{height: height * 0.8}}>
        <Block style={styles.container}>
          <Block style={{ backgroundColor: 'white', shadowColor: '#ccc', shadowOffset: { width: 6, height: 6 }, shadowOpacity: 0.3, elevation: 2, borderRadius:30, margin: theme.SIZES.BASE, padding: theme.SIZES.BASE ,  marginTop: theme.SIZES.BASE *4 }}>
            <Block row center style={{marginTop: -theme.SIZES.BASE * 3.5}}>
              <Block middle>
                {/* <TouchableOpacity
                  onPress={() => {}}
                > */}
                  {doctor && doctor.avatar ? (
                    <Image
                      source={{ uri: doctor.avatar }}
                      style={{ width: 80, height: 80, borderRadius: 50, borderWidth: 3, borderColor: "white" }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/images/userDefault.png")}
                      style={{ width: 80, height: 80, borderRadius: 50, borderWidth: 3, borderColor: "white" }}
                    />
                  )}
                {/* </TouchableOpacity> */}
                {/* <Icon
                  name="camera"
                  family="font-awesome"
                  color="#555"
                  size={20}
                  style={{position: 'absolute', bottom: 4, right: 4}}
                /> */}
              </Block>
            </Block>
            <Text size={20} style={{ marginVertical: 10 }} center>
              { doctor && doctor.name }
            </Text>
            {/* <Text color={"grey"} text={12} center>
              B.Sc, MBBS, DDVL, MD- Dermitologist
            </Text> */}
            {/* <Text color="grey" size={12} style={{marginBottom: theme.SIZES.BASE}}>
              <Text color="black" size={14}>
                16
              </Text>{" "}
              yrs. Experience
            </Text> */}
            <Block row>
              <Icon
                name="map-marker"
                family="font-awesome"
                color={"#0288D1"}
                style={{ margin: 10 }}
              />
              <Text size={12} color={"grey"} style={{ marginTop: 10 }}>
                {doctor && doctor.address} {doctor && doctor.city_state}
              </Text>
            </Block>
            <Block style={{ borderRadius: 10 }}>
              <MapView
                region={{
                  latitude: 41.880032,
                  longitude: -87.623177,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                style={styles.mapView}
              >
                <Marker
                  coordinate={{
                    latitude: 41.880032,
                    longitude: -87.623177,
                  }}
                  title={doctor ? `${doctor.address} ${doctor.city_state}` : null}
                  onDragEnd={(e) => {
                    console.log("dragEnd", e.nativeEvent.coordinate);
                  }}
                />
              </MapView>
            </Block>
            <Block flexDirection="row" style={{margin: 10}}>
              <Block flex={1}>
                <Text color="black">
                  Tel
                <Text color="red">*</Text>
                </Text>
              </Block>
              <Block flex={4}>
                <Text color="grey">
                  +{doctor && doctor.phone}
                </Text>
              </Block>      
            </Block>
            <Block>
              <Text color="black" style={{margin: 10}} size={14}>
                Account Info
                <Text color="red">*</Text>
              </Text>
              <Block flex flexDirection="row" style={{ left: width * 0.1 }}>
                <Block flex={1}>
                  <Text color="grey">
                    Email
                    <Text color="grey">*</Text>
                  </Text>
                  <Text color="grey" style={{paddingTop: theme.SIZES.BASE}}>
                    Password
                    <Text color="grey">*</Text>
                  </Text>
                </Block>
                <Block flex={3}>
                  <Text color="grey">{doctor && doctor.email}</Text>
                  <Text color="grey" style={{paddingTop: theme.SIZES.BASE}}>{doctor && doctor.password}</Text>
                </Block>
              </Block>
            </Block>
            <Block>
              <Text color="black" style={{margin: 10}} size={14}>
                Description
              <Text color="red">*</Text>
              </Text>
              <Text color="grey" size={16} style={styles.descriptionText}>
                {doctor && doctor.description}
              </Text>
            </Block>
            <Block flex flexDirection="row" style={{margin: 10}} >
              <Block flex={6}>
                <Text color="black" size={14}>
                  Schedule
                  <Text color="red">*</Text>
                </Text>
              </Block>
              <Block flex={1}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("DoctorMySchedule", {doctor})}
                >
                  <Text
                    color={"#00CE30"}
                    sytle={{ textDecorationLine: "underline" }}
                  >
                    View
                  </Text>
                </TouchableOpacity>
              </Block>
            </Block>
            {/* <Button color="#00CE30" style={{borderRadius: 16, width: width * 0.8}}>UPDATE</Button> */}
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#6E78F7",
    width: width,
    height: height * 0.1,
    paddingTop: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE,
  },
  input: {
    width: width * 0.3
  },
  modalButton: {
    width: width * 0.25,
    height: theme.SIZES.BASE * 2,
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: "#C7C7C7",
    marginTop: theme.SIZES.BASE,
  },
  innerModal: {
    backgroundColor: "rgba(255,255,255,0.99)",
    width: width * 0.8,
    borderRadius: 15,
    height: height * 0.15,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 5,
  },
  container: {
    backgroundColor: "#F5F5F5",
  },
  headArrow: {
    marginTop: height * 0.1,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    position: "absolute",
    zIndex: 1,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 25,
    width: width - theme.SIZES.BASE * 6,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 2,
    shadowOpacity: 5,
    backgroundColor: "white",
  },
  optionsButton: {
    backgroundColor: "#6E78F7",
    borderRadius: 25,
    marginVertical: 50,
    height: 50,
    width: width * 0.5,
    justifyContent: "center",
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 8,
    marginLeft: 12,
    borderRadius: 2,
    height: 22,
  },
  gradient: {
    zIndex: 1,
    position: "absolute",
    top: 33 + theme.SIZES.BASE,
    left: 0,
    right: 0,
    height: 90,
  },
  circle: {
    width: theme.SIZES.BASE * 10,
    height: theme.SIZES.BASE * 10,
    backgroundColor: "#3946FF",
    position: "absolute",
    borderRadius: 1000,
    right: -theme.SIZES.BASE * 5,
    bottom: -theme.SIZES.BASE * 8,
  },
  body: {
    marginHorizontal: width * 0.04,
    backgroundColor: "white",
    borderRadius: 12,
  },
  prime: {
    top: height * 0.08,
    left: -width * 0.08,
    position: "absolute",
  },
  header: {
    marginHorizontal: width * 0.01,
    marginTop: -height * 0.05,
  },
  rating: {
    top: height * 0.08,
    right: -width * 0.08,
    position: "absolute",
  },
  headBottom: {
    margin: theme.SIZES.BASE,
  },
  star: {
    top: height * 0.08,
    right: -width * 0.01,
    position: "absolute",
  },
  info: {
    marginHorizontal: theme.SIZES.BASE,
    padding: theme.SIZES.BASE,
  },
  schedule: {
    alignSelf: "flex-start",
    margin: 10,
    marginBottom: 0,
  },
  descriptionText: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  mapView: {
    width: width * 0.8,
    height: 150,
    margin: width * 0.01,
    alignSelf: "center",
  },
});

export default AgentDoctorDetail;
