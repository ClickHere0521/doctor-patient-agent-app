import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import products from "../constants/images/home";
import {
  Icon,
  ListItem,
} from "../components/";
import { LinearGradient } from "expo-linear-gradient";
import { IMLocalized } from "../src/localization/IMLocalization";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = theme.SIZES.BASE * 4;

const sortCategories = [
  {
    title: IMLocalized("Name"),
  },
  {
    title: IMLocalized("Case"),
  },
  {
    title: IMLocalized("Date"),
  },
  {
    title: IMLocalized("currentStatus"),
  },
];

const Components = (props) => {

  const { navigation } = props;

  const renderSort = (item, index) => {
    const { navigation } = props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => { }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0.25, y: 1.1 }}
          locations={[0.2, 1]}
          colors={["#EFEFEF", "#FFF"]}
          style={styles.sortItem}
        >
          <Block center>
            <Text center size={15} fontWeight="semiBold">
              {item.title}
            </Text>
          </Block>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  };

  const renderSorts = () => {
    return (
      <Block flex>
        <Block flex>
          <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              style={{ width }}
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
              contentContainerStyle={{
                paddingHorizontal: theme.SIZES.BASE / 2,
              }}
            >
              {sortCategories &&
                sortCategories.map((item, index) => renderSort(item, index))}
            </ScrollView>
          </Block>
        </Block>
      </Block>
    );
  };

  const patientLists = async () => {
    const agentUid = '6hQ6yTAGNXNihOuFfQku05BK1SJ2';

    if (editFlg == true) {
      let patientId;
      try {
        await firestore.collection('Patients').doc().collection('Patient').doc().collection('profile').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            patientId = doc.id;
          });
        });
      } catch (e) {
        console.log(e);
      }

      let newRef = firestore.collection('Patients').doc().collection('Patient').doc();
      newRef.get({
        email, fullName: fullname, phone: tel, location: address, role: "agent"
      })
        .then(async () => {
          const pngRef = storage.ref(`logo/${agentUid}.png`);
          await pngRef.put(imageUri);
          const url = await pngRef.getDownloadURL();
          console.log("FDFD", url);

          Alert.alert(
            "Success",
            "You have successfully edited the agent info",
            [
              {
                text: 'OK',
                onPress: () => { }
              }
            ]
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const renderPatientsList = () => {
    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <ListItem product={products[0]} horizontal role="agentPatient" />
          <ListItem product={products[1]} horizontal role="agentPatient" />
          <ListItem product={products[2]} horizontal role="agentPatient" />
          <ListItem product={products[3]} horizontal role="agentPatient" />
          <ListItem product={products[4]} horizontal role="agentPatient" />
          <ListItem product={products[0]} horizontal role="agentPatient" />
          <ListItem product={products[1]} horizontal role="agentPatient" />
          <ListItem product={products[2]} horizontal role="agentPatient" />
          <ListItem product={products[3]} horizontal role="agentPatient" />
          <ListItem product={products[4]} horizontal role="agentPatient" />
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
            size={22}
            fontWeight="semiBold"
          >
            {IMLocalized("Patients")}
          </Text>
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
        <TouchableOpacity onPress={() => navigation.navigate("AddPatient", { editPatient: false })} style={{ width: 60 }}>
          <Image source={require("../assets/images/createCase.png")} />
        </TouchableOpacity>
        <Text size={10} style={{ left: 26 }}> Add</Text>
        {renderSorts()}
        {renderPatientsList()}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  components: {
    paddingTop: theme.SIZES.BASE,
    backgroundColor: "white",
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
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
    width: width - theme.SIZES.BASE * 3,
  },
  options: {
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
    borderColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: width * 0.03,
    marginHorizontal: theme.SIZES.BASE * 0.7,
    shadowColor: "black",
    shadowOffset: { width: -3, height: -3 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 2,
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
    borderColor: "#DDDDDD",
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
    height: height * 0.16,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
});

export default Components;
