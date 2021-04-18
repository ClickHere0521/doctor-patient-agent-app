import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon } from '../components/Icon';

const { width } = Dimensions.get('screen');

const ListItem = props => {
  const { navigation, product, horizontal, full, style, priceColor, imageStyle, time, unReaden, weekday } = props;
  const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

  return (
        
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
          <TouchableWithoutFeedback onPress={() =>  ('Product', { product: product })}>
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
              <Text size={12} style={styles.times} color={"#06D81E"}>{product.time}</Text>
                              
              <Button shadowless color={'#06D81E'} style={[styles.button, styles.shadow]} size={12}>
                <Text size={13} center bold style={{justifyContent: 'center', alignItems: 'center'}} color={"#FFF"} fontWeight={"semiBold"}>Detail</Text>
              </Button>
                            
            </Block>
          </TouchableWithoutFeedback>
          <Block center middle style={{borderRadius: 50, backgroundColor: '#06D81E', width: theme.SIZES.BASE* 1.3, height: theme.SIZES.BASE * 1.3, position: 'absolute', right: -5, top: -5}}>
            <Icon name="check" family="font-awesome" color={theme.COLORS.WHITE} size={theme.SIZES.BASE} style={{paddingLeft: 3, paddingTop: 0}}> </Icon>  
          </Block>
      </Block>
  );
}

const styles = StyleSheet.create({
  product: {
    backgroundColor: "#F8F8F8",
    marginVertical: theme.SIZES.BASE / 2,
    marginHorizontal: theme.SIZES.BASE / 4,
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
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: theme.SIZES.BASE * 5,
    height: theme.SIZES.BASE * 1.5,
    position: "absolute",
    right: theme.SIZES.BASE / 2,
    borderRadius: 40,
    bottom: 0
  },
});

export default withNavigation(ListItem);