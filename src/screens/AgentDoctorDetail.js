import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import materialTheme from "../constants/Theme";
import { IMLocalized, init } from "../localization/IMLocalization";
import { Icon } from "../components/";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
// import Geocoder from "react-native-geocoding";
import firestore from '@react-native-firebase/firestore';

const { height, width } = Dimensions.get("screen");

const AgentDoctorDetail = (props) => {
  const { navigation, route } = props;
  const { doctor } = route.params;
  const [imageUri, setImageUri] = useState(null);
  
  // Geocoder.init("AIzaSyAI7Bmf7Kw_ZXiDuUOFYHpjhJForJNprLo");
  // Geocoder.from(name)
  //   .then(json => {
  //     var location = json.results[0].geometry.location;
  //     console.log('location', location);
  //   })
  //   .catch(error => console.warn(error));      

  return (
    <Block flex style={styles.container}>
      <Block>
        <Block flex flexDirection="row" style={styles.roundBlock}>
          <Block flex={1} >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                size={16}
                name="chevron-left"
                family="font-awesome"
                color={"white"}
                style={{ paddingLeft: theme.SIZES.BASE }}
              />
            </TouchableOpacity>
          </Block>
          <Block flex={6}></Block>
          <Block flex={1}>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateDoctorAccount", { doctor })}
            >
              <Image
                source={require("../assets/icons/editHeaderWhite.png")}
                alt=""
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
      <Block style={styles.body}>
        <Block style={styles.header}>
          <Block center>
            <Block middle>
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    borderWidth: 3,
                    borderColor: "white",
                  }}
                />
              ) : (
                <Image
                  source={{ uri : doctor && doctor.avatar }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    borderWidth: 3,
                    borderColor: "white",
                  }}
                />
              )}
            </Block>
          </Block>
          <Text size={20} style={{ marginVertical: 10 }} center>
            {doctor && doctor.name}
          </Text>
        </Block>
      </Block>
      <ScrollView>
        <Block style={styles.mainBody}>
          <Block style={{ marginHorizontal: width * 0.01 }}>
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
            <Block row style={{ margin: 10 }}>
              <Text color="black" style={{ alignSelf: "flex-start" }}>
                Tel
                <Text color="red">*</Text>
              </Text>
              <Text color="grey" style={{ paddingLeft: 10 }}>
                +{doctor && doctor.phone}
              </Text>
            </Block>
            <Block>
              <Text color="black" style={styles.info} size={14}>
                Account Info
                <Text color="red">*</Text>
              </Text>
              <Block flex flexDirection="row" style={{ left: width * 0.1 }}>
                <Block flex={1}>
                  <Text color="grey">
                    Email
                    <Text color="grey">*</Text>
                  </Text>
                  <Text color="grey">
                    Password
                    <Text color="grey">*</Text>
                  </Text>
                </Block>
                <Block flex={3}>
                  <Text color="grey">{doctor && doctor.email}</Text>
                  <Text color="grey">{doctor && doctor.password}</Text>
                </Block>
              </Block>
            </Block>
            <Block>
              <Text color="black" style={styles.info} size={14}>
                Description
                <Text color="red">*</Text>
              </Text>
              <Text color="grey" size={16} style={styles.descriptionText}>
                {doctor && doctor.description}
              </Text>
            </Block>
            <Block row>
              <Block>
                <Text color="black" style={styles.info} size={14}>
                  Schedule
                  <Text color="red">*</Text>
                </Text>
              </Block>
              <TouchableOpacity
                style={{ marginTop: 10, marginLeft: width * 0.45 }}
                onPress={() => navigation.navigate("DoctorScheduleDetail", {doctor})}
              >
                <Text
                  color={"#00CE30"}
                  sytle={{ textDecorationLine: "underline" }}
                >
                  View
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 10, marginLeft: width * 0.05 }}
                onPress={() => navigation.navigate("ScheduleEdit", {doctor})}
              >
                <Text
                  color={"#00CE30"}
                  sytle={{ textDecorationLine: "underline" }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
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
    marginTop: height * 0.06,
    paddingHorizontal: theme.SIZES.BASE * 0.5,
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
  roundBlock: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: "absolute",
    backgroundColor: "#6E78F7",
    height: height * 0.15,
    width: width,
    paddingTop: theme.SIZES.BASE * 2.5,
    top: 0,
  },
  backIcon: {
    position: "absolute",
    width: theme.SIZES.BASE * 1.5,
    height: theme.SIZES.BASE * 1.5,
    left: theme.SIZES.BASE * 2,
    top: theme.SIZES.BASE * 5,
  },
  buttonTextStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  imageStyle: {
    width: 80,
    height: 80,
  },
  body: {
    marginHorizontal: width * 0.04,
    marginTop: height * 0.1,
    backgroundColor: "white",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
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
    marginTop: 10,
    marginBottom: height * 0.02,
  },
  star: {
    top: height * 0.08,
    right: -width * 0.01,
    position: "absolute",
  },
  mainBody: {
    marginHorizontal: width * 0.04,
    // marginTop: height * 0.01,
    paddingBottom: height * 0.05,
    backgroundColor: "white",
    // borderRadius: 12,
  },
  info: {
    marginHorizontal: 10,
    marginTop: height * 0.01,
    backgroundColor: "white",
    borderRadius: 12,
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
