import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon } from '../components/';

const { width } = Dimensions.get('screen');

const ListItem = props => {
  const { navigation, product, horizontal, full, style, priceColor, imageStyle, time, unReaden, weekday } = props;
  const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

  return (
    <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { product: product })}>
        <Block style={[styles.imageContainer, styles.shadow]}>
          <Image source={{ uri: product.image }} style={imageStyles}/>
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { product: product })}>
        <Block flex={3}>
          <Text size={16} style={styles.userName}>{product.title}</Text>
          <Block flexDirection={'row'}>
            <Icon name="photo" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.BASE} style={styles.icons}> </Icon>  
            <Icon name="check" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.BASE} style={styles.icons}> </Icon>  
            <Text size={16} muted={!priceColor} color={priceColor}>${product.price}</Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { product: product })}>
        <Block flex={1}>
          <>
            {(product.time) ? (
              <Text size={12} style={styles.times} color={"#06D81E"}>{product.time}</Text>
            ) : (
              <Text size={12} style={styles.times} color={"#000"}>{product.weekday}</Text>
            )}
          </>
          
          <Block style={{borderRadius: 100, backgroundColor: "#06D81E", width: theme.SIZES.BASE * 1.2, height: theme.SIZES.BASE * 1.2, position: "absolute", right: theme.SIZES.BASE, bottom: theme.SIZES.BASE}}>
            <Text size={12} center style={{justifyContent: 'center', alignItems: 'center'}} color={"#FFF"} fontWeight={"semiBold"}>{product.unReaden}</Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
}

const styles = StyleSheet.create({
  product: {
    backgroundColor: "#EFEFEF",
    marginVertical: theme.SIZES.BASE,
    borderWidth: 2,
    borderColor: theme.COLORS.WHITE,
    minHeight: theme.SIZES.BASE * 2,
    borderRadius: theme.SIZES.BASE
  },
  productTitle: {
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
    width : width / 1.5,
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
    height: theme.SIZES.BASE * 4.5,
    width: theme.SIZES.BASE * 4.5,
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
    padding: theme.SIZES.BASE/2,
    paddingBottom: theme.SIZES.BASE / 2
  },
  icons: {
    paddingTop: 2,
    paddingRight: 2,
  }
});

export default withNavigation(ListItem);