import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon, Drawer as DrawerCustomItem } from "../components/Icon";

const { width } = Dimensions.get('screen');

const Product = props => {
  const { navigation, product, horizontal, full, style, priceColor, imageStyle, time, unReaden } = props;
  const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage];

  return (
    <Block row={horizontal} card flex style={[styles.product, styles.shadow]}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { product: product })}>
        <Block flex middle style={[styles.imageContainer, styles.shadow]}>
          <Image source={{ uri: product.image }} style={imageStyles} />
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { product: product })}>
        <Block flex space="between" style={styles.productDescription}>
          <Text size={14} style={styles.productTitle}>Doctor Name</Text>
          <Text size={14} style={styles.productTitle}>{product.title}</Text>
          <Block flex flexDirection="row" middle>
            <Icon name="shape-star" family="GalioExtra" size={14} />
            <Text size={14} >{product.price}</Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
}

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
    flexWrap: 'wrap',
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
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 5,
  },
});

export default withNavigation(Product);