import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import Icon from "./Icon";
import SvgUri from "react-native-svg-uri";
const { width } = Dimensions.get("screen");

const HorizontalList = (props) => {
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
  } = props;
  const imageStyles = [
    styles.image,
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];

  return (
    <Block row={horizontal} card flex style={[styles.product, styles.shadow]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("BookDoctor")}
      >
        <Block flex middle style={[styles.imageContainer, styles.shadow]}>
          <Image source={{ uri: product.image }} style={imageStyles} />
        </Block>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("BookDoctor")}
      >
        <Block flex space="between" style={styles.productDescription}>
          <Text size={14} style={styles.productTitle}>
            Doctor Name
          </Text>
          <Text size={14} style={styles.productTitle}>
            {product.title}
          </Text>
          <Block flex flexDirection="row" middle>
              <SvgUri
                width="20"
                height="20"
                source={require("../assets/icons/star.svg")}
              />
            <Text size={14}>{product.price}</Text>
          </Block>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    width: theme.SIZES.BASE * 10,
    marginRight: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE * 2,
  },
  productTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -theme.SIZES.BASE * 2,
  },
  horizontalImage: {
    borderRadius: 1000,
    height: theme.SIZES.BASE * 5,
    width: theme.SIZES.BASE * 5,
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 5,
  },
});

export default withNavigation(HorizontalList);
