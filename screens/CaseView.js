import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";

import products from "../constants/images/home";
import { materialTheme, Images, tabs } from "../constants/";
import {
  Select,
  Icon,
  Header,
  Product,
  Switch,
  Tabs,
  ListItem,
} from "../components/";
import { LinearGradient } from "expo-linear-gradient";
import { IMLocalized } from "../src/localization/IMLocalization";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = theme.SIZES.BASE * 4;

const sortCategories = [
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
  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(false);

  const toggleSwitch = (switchId) => {
    if (switchId == "switch1") {
      setSwitch1(!switch1);
    }
    if (switchId == "switch2") {
      setSwitch2(!switch2);
    }
  };

  const renderPatient = (item, index) => {
    const { navigation } = props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => navigation.navigate("Pro", { product: item })}
      >
        <Block center style={styles.productItem}>
          <Block style={[styles.productRounded]}>
            <Image
              resizeMode="cover"
              style={styles.productImage}
              source={{ uri: item.image }}
            />
          </Block>
          <Block center>
            <Text center size={10}>
              {item.title}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  };

  const renderSort = (item, index) => {
    const { navigation } = props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => navigation.navigate("Pro", { product: item })}
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

  const onclick = () => {};

  const navbar = () => {
    return (
      <Block flex flexDirection="row" style={{ padding: 10 }}>
        <Block left>
          <Image
            source={require("../assets/icons/PatientIcon.png")}
            style={{
              height: theme.SIZES.BASE * 3,
              width: theme.SIZES.BASE * 3,
              marginRight: theme.SIZES.BASE,
            }}
          />
        </Block>
        <Block center>
          <Text h6 center middle>
            Patient View
          </Text>
        </Block>
        <TouchableWithoutFeedback onclick={onclick()}>
          <Block center middle style={[styles.searchBtn, styles.greyGradient]}>
            <Icon
              name="search"
              family="font-awesome"
              color={theme.COLORS.MUTED}
              size={theme.SIZES.BASE}
            >
              {" "}
            </Icon>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  };

  const renderPatients = () => {
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
              {categories &&
                categories.map((item, index) => renderPatient(item, index))}
            </ScrollView>
          </Block>
        </Block>
      </Block>
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

  const renderPatientsList = () => {
    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <ListItem product={products[0]} horizontal role="agentCases" />
          <ListItem product={products[1]} horizontal role="agentCases" />
          <ListItem product={products[2]} horizontal role="agentCases" />
          <ListItem product={products[3]} horizontal role="agentCases" />
          <ListItem product={products[4]} horizontal role="agentCases" />
          <ListItem product={products[0]} horizontal role="agentCases" />
          <ListItem product={products[1]} horizontal role="agentCases" />
          <ListItem product={products[2]} horizontal role="agentCases" />
          <ListItem product={products[3]} horizontal role="agentCases" />
          <ListItem product={products[4]} horizontal role="agentCases" />
        </ScrollView>
      </Block>
    );
  };

  return (
    <Block flex>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => navigation.navigate("AddPatient")} style={{width:60}}>
          <Image source={require("../assets/images/createCase.png")} />
        </TouchableOpacity> 
        <Text size={10} style={{left: 26}}>
          Add
        </Text>
        {renderSorts()}
        {renderPatientsList()}
        {/* {renderAlbum()} */}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  components: {
    paddingTop: theme.SIZES.BASE,
    backgroundColor: "#F8F8F8",
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
    paddingHorizontal: 25,
    marginHorizontal: theme.SIZES.BASE * 0.5,
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
});

export default Components;
