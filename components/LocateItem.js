import React from "react";
import { withNavigation } from "@react-navigation/compat";
import { StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";
import Icon from "./Icon";
import Button from "./Button";
import { useSelector } from "react-redux";
import { IMLocalized } from "../src/localization/IMLocalization";
import SvgUri from "expo-svg-uri";
const { width } = Dimensions.get("screen");

const ListItem = (props) => {
  const {
    navigation,
    product,
    horizontal,
    full,
    style,
    priceColor,
    imageStyle,
    time,
    unReaden,
    weekday,
  } = props;

  const imageStyles = [
    styles.image,
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];
  const userRole = useSelector((state) => state.user.role);

  return (
    <Block
      row={horizontal}
      card
      flex
      style={[styles.product, styles.shadow, style]}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DoctorDetail");
        }}
      >
        <Block style={[styles.imageContainer, styles.shadow]}>
          <Image source={{ uri: product.image }} style={imageStyles} />
        </Block>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DoctorDetail");
        }}
      >
        <Block>
          <Text size={16} style={styles.userName}>
            {product.title}
          </Text>
          <Text
            size={16}
            muted={!priceColor}
            color={priceColor}
            style={{ paddingTop: 8 }}
          >
            ${product.price}
          </Text>
        </Block>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DoctorDetail");
        }}
      >
        <Block flex middle center>
          <SvgUri
            width="25"
            height="25"
            source={require("../assets/icons/locate.svg")}
          />
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

const styles = StyleSheet.create({
  product: {
    backgroundColor: "#F8F8F8",
    marginVertical: theme.SIZES.BASE / 2,
    marginHorizontal: theme.SIZES.BASE / 4,
    borderWidth: 2,
    borderColor: theme.COLORS.WHITE,
    minHeight: theme.SIZES.BASE * 2,
    borderRadius: theme.SIZES.BASE,
  },
  productTitle: {
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
    width: width / 1.5,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 1000,
    marginHorizontal: theme.SIZES.BASE / 2,
    margin: theme.SIZES.BASE / 2,
  },
  horizontalImage: {
    height: theme.SIZES.BASE * 4,
    width: theme.SIZES.BASE * 4,
    borderWidth: 2,
    borderColor: theme.COLORS.WHITE,
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 5,
  },
  times: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  userName: {
    padding: theme.SIZES.BASE / 2,
    paddingBottom: theme.SIZES.BASE / 2,
    width: width * 0.62,
  },
  icons: {
    paddingTop: 10,
    paddingRight: 2,
    marginLeft: 8,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: theme.SIZES.BASE * 5,
    height: theme.SIZES.BASE * 1.5,
    position: "absolute",
    right: theme.SIZES.BASE / 2,
    borderRadius: 40,
    bottom: 0,
  },
});

export default withNavigation(ListItem);
