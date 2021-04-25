import React, { useState } from "react";
import { Modal, Image, View, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight } from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import materialTheme from "../constants/Theme";
import { IMLocalized, init } from "../src/localization/IMLocalization";
import { Icon } from "../components/";
import { ScrollView } from "react-native-gesture-handler";

const DoctorDetail = (props) => {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(0);

  return (
    <Block flex style={styles.container}>
      <Block> 
        <Block style={styles.roundBlock}>
          <Block row style={styles.headArrow}>
            <Block>
              <Icon
                size={16}
                name="chevron-left"
                family="font-awesome"
                color={"white"}
                style={{ paddingLeft: theme.SIZES.BASE }}
                onPress={() => navigation.goBack()}
              />
            </Block>
          </Block>
        </Block>
      </Block>
      <Block style={styles.body}>
        <Block  style={styles.header}>
          <Block center>
            <Image
              source={require("../assets/images/grayscale-photo-of-man2.png")}
              style={styles.imageStyle}
            ></Image>
          </Block>
          <Text size={14} style={{ marginTop: 10 }} center>
            Dr. Ronald Joseph
          </Text>
          <Text color={"grey"} text={12} center>B.Sc, MBBS, DDVL, MD- Dermitologist</Text>
          <Block style={styles.headBottom} >
            <Text color="grey" size={12}>
              <Text color="black" size={14}>
                16
              </Text>{" "}
              yrs. Experience
            </Text>
            <Block row center>
              <Block style={{paddingHorizontal: theme.SIZES.BASE / 2}}>
                <Image style={{width: 70, height: 70}} source={require("../assets/images/grayscale-photo-of-man2.png")}></Image>
              </Block>
              <Block style={{paddingHorizontal: theme.SIZES.BASE / 2}}>
                <Image style={{width: 70, height: 70}} source={require("../assets/images/grayscale-photo-of-man2.png")}></Image>
              </Block>
              <Block style={{paddingHorizontal: theme.SIZES.BASE / 2}}>
                <Image style={{width: 70, height: 70}} source={require("../assets/images/grayscale-photo-of-man2.png")}></Image>
              </Block>
              <Block style={{paddingHorizontal: theme.SIZES.BASE / 2}}>
                <Image style={{width: 70, height: 70}} source={require("../assets/images/grayscale-photo-of-man2.png")}></Image>
              </Block>
            </Block>
          </Block>
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
                92/6, 3rd Floor, Outer Ring Road, Chandra Layout
              </Text>
            </Block>
            <Image
              source={require("../assets/images/map.png")}
              alt=""
              style={{ margin: width * 0.01, alignSelf: "center" }}
            />
            <Block row style={{ margin: 10 }}>
              <Text color="black" style={{ alignSelf: "flex-start" }}>
                Tel
                <Text color="red">*</Text>
              </Text>
              <Text color="grey" style={{ paddingLeft: 10 }}>
                +1234567890
              </Text>
            </Block>
            <Text color="black" style={styles.info} size={14}>
              Description
              <Text color="red">*</Text>
            </Text>
            <Text
              color="grey"
              size={16}
              style={{
                alignSelf: "flex-start",
                paddingHorizontal: 10,
                marginLeft: 10,
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonu my eirmod tempor invidun.
            </Text>
            <Block center>
              <TouchableOpacity
                textStyle={styles.optionsButtonText}
                style={styles.optionsButton}
                onPress={() => setModalVisible(true)}
              >
                <Text color="white" center size={14}>{IMLocalized('book')}</Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </ScrollView>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <Block style={{marginTop: height * 0.3, backgroundColor: 'rgba(255,255,255,0.6)', width: width, height: height * 0.3}} center middle>
            <Block style={styles.innerModal} center middle>
              <Text size={16}>{IMLocalized('You have successfully booked.')}</Text>
              <Button color="white" style={styles.modalButton} onPress={() => setModalVisible(1)}><Text size={18}>OK</Text></Button>
            </Block>
          </Block>
        </Modal>
    </Block>
  );
};

const styles = StyleSheet.create({
  modalButton: {
    width: width * 0.25,
    height: theme .SIZES.BASE * 2,
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: "#C7C7C7",
    marginTop: theme.SIZES.BASE
  },
  innerModal: {
    backgroundColor: 'rgba(255,255,255,0.99)', width: width * 0.8, borderRadius: 15, height: height * 0.15, 
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 5
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
  roundBlock: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: "absolute",
    backgroundColor: "#6E78F7",
    height: height * 0.25,
    width: width,
    top: 0,
    zIndex: 2,
  },
  backIcon: {
    position: "absolute",
    zIndex: 100,
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
    marginTop: height * 0.18,
    zIndex: 2,
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
    marginTop: height * 0.06,
    zIndex: 2,
    backgroundColor: "white",
    borderRadius: 12,
  },
  info: {
    marginHorizontal: 10,
    marginTop: height * 0.01,
    zIndex: 2,
    backgroundColor: "white",
    borderRadius: 12,
  },
  schedule: {
    alignSelf: "flex-start",
    margin: 10,
    marginBottom: 0,
  },
});

export default DoctorDetail;
