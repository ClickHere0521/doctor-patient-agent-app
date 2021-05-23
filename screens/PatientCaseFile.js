import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { Icon } from "../components";
import { LinearGradient } from "expo-linear-gradient";
import { IMLocalized } from "../src/localization/IMLocalization";
import { useSelector } from "react-redux";
// import DocumentScanner from 'react-native-documentscanner-android';

const { width, height } = Dimensions.get("screen");

const cardWidth = theme.SIZES.BASE * 4;

const sortCategories = [
  {
    title: IMLocalized("Label"),
  },
  {
    title: IMLocalized("Author"),
  },
  {
    title: IMLocalized("Upload Time"),
  },
  {
    title: IMLocalized("File"),
  },
];

const caseFiles = [
  {
    label: "Eddie",
    author: "Wilson",
    uploadTime: "11:00 AM",
    file: "url",
  },
  {
    label: "Malcol",
    author: "Milk",
    uploadTime: "11:00 AM",
    file: "url",
  },
  {
    label: "John",
    author: "Wonder",
    uploadTime: "11:00 AM",
    file: "url",
  },
  {
    label: "Elif",
    author: "Jin",
    uploadTime: "11:00 AM",
    file: "url",
  },
  {
    label: "John",
    author: "Wonder",
    uploadTime: "11:00 AM",
    file: "url",
  },
  {
    label: "Elif",
    author: "Jin",
    uploadTime: "11:00 AM",
    file: "url",
  },
  {
    label: "John",
    author: "Wonder",
    uploadTime: "11:00 AM",
    file: "url",
  },
  {
    label: "Elif",
    author: "Jin",
    uploadTime: "11:00 AM",
    file: "url",
  },
  {
    label: "Boy",
    author: "Wonder",
    uploadTime: "11:00 AM",
    file: "url",
  },
  {
    label: "Girl",
    author: "Wonder",
    uploadTime: "11:00 AM",
    file: "url",
  },
];

const PatientView = (props) => {
  const userRole = useSelector((state) => state.user.role);
  const { navigation } = props;
  const navbar = () => {
    return (
      <Block>
        <Block row style={styles.navbar} center>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
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
            {IMLocalized("Case File")}
            {roleTitle()}
          </Text>
        </Block>
        <Block style={{ borderTopWidth: 1, borderColor: "white" }}></Block>
      </Block>
    );
  };

  const roleTitle = () => {
    switch (userRole) {
      case "agent":
        return <Text>(Agent)</Text>;
      case "patient":
        return <Text>(Patient)</Text>;
      case "doctor":
        return <Text>(Doctor)</Text>;
    }
  };

  const renderSort = (item, index) => {
    const { navigation } = props;

    return (
      <TouchableHighlight
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        // onPress={}
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
      </TouchableHighlight>
    );
  };

  const fileListItem = (vals, index) => {
    let { label, author, uploadTime, file, approved } = vals;
    return (
      <Block key={index}>
        <TouchableHighlight
          style={{ zIndex: 3 }}
          // onPress={}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0.25, y: 1.1 }}
            locations={[0.2, 1]}
            colors={["#EFEFEF", "#FFF"]}
            style={styles.caseItem}
          >
            <Block flex flexDirection="row" middle>
              <Block flex={1} style={{ alignItems: "flex-start" }}>
                <Text center size={15} fontWeight="semiBold">
                  {IMLocalized(label)}
                </Text>
              </Block>
              <Block flex={1}>
                <Text center size={15} fontWeight="semiBold">
                  {IMLocalized(author)}
                </Text>
              </Block>
              <Block flex={1}>
                <Text center size={15} fontWeight="semiBold">
                  {IMLocalized(uploadTime)}
                </Text>
              </Block>
              <Block flex={1} style={{ alignItems: "flex-end" }}>
                <Icon name="paperclip" family="font-awesome" size={20}></Icon>
              </Block>
            </Block>
          </LinearGradient>
        </TouchableHighlight>
      </Block>
    )
  }

  const scanAndUpload = () => {
    if (userRole != "doctor") {
      return (
        <Block>
          <ScrollView
            horizontal={true}
            style={{ marginLeft: width * 0.2, marginBottom: theme.SIZES.BASE }}
          >
            <TouchableHighlight
              style={{ zIndex: 3 }}
              // onPress={}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.25, y: 1.1 }}
                locations={[0.2, 1]}
                colors={["#00CE30", "#00CE30"]}
                style={styles.sortItem}
              >
                <Block center>
                  <Text center size={15} fontWeight="semiBold" color="white">
                    {IMLocalized("Scan File")}
                  </Text>
                </Block>
              </LinearGradient>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ zIndex: 3 }}
              // onPress={}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.25, y: 1.1 }}
                locations={[0.2, 1]}
                colors={["#00CE30", "#00CE30"]}
                style={styles.sortItem}
              >
                <Block center>
                  <Text center size={15} fontWeight="semiBold" color="white">
                    {IMLocalized("Upload Files")}
                  </Text>
                </Block>
              </LinearGradient>
            </TouchableHighlight>
          </ScrollView>
        </Block>
      );
    }
  };

  const renderSorts = () => {
    return (
      <Block
        style={{
          marginTop: theme.SIZES.BASE / 2,
          padding: theme.SIZES.BASE / 2,
        }}
      >
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{ width }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
        >
          {sortCategories &&
            sortCategories.map((item, index) => renderSort(item, index))}
        </ScrollView>
      </Block>
    );
  };

  const returnButtons = () => {
    if (userRole == "agent") {
      return (
        <Block>
          <Button
            style={{ borderRadius: 16, width: width * 0.95 }}
            color="#00CE30"
            onPress={() => navigation.navigate("UploadCaseFiles")}
          >
            {IMLocalized("UPLOAD PATIENT FILES")}
          </Button>
          <Button
            style={{ borderRadius: 16, width: width * 0.95 }}
            color="#00CE30"
          >
            {IMLocalized("PACK AND SHARE")}
          </Button>
        </Block>
      );
    } else {
      return (
        <Button
          style={{ borderRadius: 16, width: width * 0.95 }}
          color="#00CE30"
          onPress={() => navigation.navigate("UploadCaseFiles")}
        >
          {IMLocalized("UPLOAD PATIENT FILES")}
        </Button>
      );
    }
  };
  return (
    <Block flex style={styles.components}>
      {navbar()}
      {scanAndUpload()}
      {renderSorts()}
      {/* <View>
        <DocumentScanner
          onPictureTaken={data => {
            console.log(data.path);
          }}
          enableTorch={false}
          detectionCountBeforeCapture={5}
        />
      </View> */}
      <ScrollView
        vertical={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={{ width }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
        style={{ padding: theme.SIZES.BASE / 2 }}
      >
        {caseFiles && caseFiles.map((vals, index) => fileListItem(vals, index))}
      </ScrollView>
      {returnButtons()}
    </Block>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "white",
    width: width,
    height: height * 0.16,
    paddingTop: theme.SIZES.BASE * 2,
    paddingLeft: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.1)",
  },
  sortBox: {
    borderTopWidth: 2,
    borderColor: "white",
    margin: theme.SIZES.BASE,
    marginBottom: 0,
  },
  components: {
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
  sortItem: {
    borderWidth: 2,
    borderRadius: 1000,
    borderColor: "white",
    marginVertical: 4,
    paddingVertical: 6,
    paddingHorizontal: 22,
    marginHorizontal: theme.SIZES.BASE / 4,
    shadowColor: "black",
    shadowOffset: { width: -3, height: -3 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  caseItem: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 4,
    paddingVertical: 6,
    paddingHorizontal: 25,
    marginHorizontal: theme.SIZES.BASE / 4,
    shadowColor: "black",
    shadowOffset: { width: -3, height: -3 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 2,
    height: theme.SIZES.BASE * 4,
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
    marginLeft: 5,
  },
  greyGradient: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
  },
});

export default PatientView;
