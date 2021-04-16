import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { materialTheme, products, Images, tabs } from '../constants/';
import { Select, Icon, Header, Product, Switch, Tabs, HorizontalListItem } from '../components/';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - (theme.SIZES.BASE * 2);

const Components = (props) => {

  const navbar = () => {
    return (
      <Block>
        <Block style={[styles.navbar,{paddingLeft: theme.SIZES.BASE}]} middle left>
          <Text middle color="white" bold size={17}>Book Doctor</Text>
        </Block>
        <Block flex flexDirection={'row'} style={[styles.navbarBtnGroup]}>
          <Block flexDirection={'column'} style={[styles.navbarBtn]} center>
            <Block center middle style={{ width: theme.SIZES.BASE * 5, height: theme.SIZES.BASE * 5, borderRadius: 1000 , backgroundColor: 'white'}}>
              <Image shadow source={require('../assets/images/doctor.png')} style={{ width: theme.SIZES.BASE * 4, height: theme.SIZES.BASE * 4, borderRadius: 1000 }}/>
            </Block>
            <Block center style={{width: theme.SIZES.BASE * 6}}>
              <Text size={17} center color={'#000'} >Doctor</Text>
              <Text size={14} muted color={'#000'} center>Search doctor around you</Text>
            </Block>
          </Block>
          <Block flexDirection={'column'} style={[styles.navbarBtn]} center>
            <Block center middle style={{ width: theme.SIZES.BASE * 5, height: theme.SIZES.BASE * 5, borderRadius: 1000 , backgroundColor: 'white'}}>
              <Image shadow source={require('../assets/images/doctor.png')} style={{ width: theme.SIZES.BASE * 4, height: theme.SIZES.BASE * 4, borderRadius: 1000 }}/>
            </Block>
            <Block center style={{width: theme.SIZES.BASE * 6}}>
              <Text size={17} center color={'#000'} >Medicines</Text>
              <Text size={14} muted color={'#000'} center>Order Medicine to home</Text>
            </Block>
          </Block>
          <Block flexDirection={'column'} style={[styles.navbarBtn]} center>
            <Block center middle style={{ width: theme.SIZES.BASE * 5, height: theme.SIZES.BASE * 5, borderRadius: 1000 , backgroundColor: 'white'}}>
              <Image shadow source={require('../assets/images/doctor.png')} style={{ width: theme.SIZES.BASE * 4, height: theme.SIZES.BASE * 4, borderRadius: 1000 }}/>
            </Block>
            <Block center style={{width: theme.SIZES.BASE * 6}}>
              <Text size={17} center color={'#000'} >Digonostic</Text>
              <Text size={14} muted color={'#000'} center>Book test at Doorstep</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
  
  const googleMap = () => {
    return (
      <Block style={{borderRadius: theme.SIZES.BASE}} center>
        <Image shadow middle center source={require('../assets/images/doctor.png')} style={{ width: width - (theme.SIZES.BASE * 2), padding: theme.SIZES.BASE}}/>
      </Block>
    )
  }
  const renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Block flex card shadow style={styles.category}>
                    <ImageBackground
                        source={{ uri: Images.Products['Accessories'] }}
                        style={[styles.imageBlock, { width: width - (theme.SIZES.BASE * 2), height: 200 }]}
                        imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 200 }}>
                        <Block style={styles.categoryTitle}>
                        <Text size={18} bold color={theme.COLORS.WHITE}>Accessories</Text>
                        </Block>
                    </ImageBackground>
                </Block>
                <Block flex card shadow style={styles.category}>
                    <ImageBackground
                        source={{ uri: Images.Products['Makeup'] }}
                        style={[styles.imageBlock, { width: width - (theme.SIZES.BASE * 2), height: 200 }]}
                        imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 200 }}>
                        <Block style={styles.categoryTitle}>
                        <Text size={18} bold color={theme.COLORS.WHITE}>Makeup</Text>
                        </Block>
                    </ImageBackground>
                </Block>
                <Block flex card shadow style={styles.category}>
                    <ImageBackground
                        source={{ uri: Images.Products['Harley-Davidson'] }}
                        style={[styles.imageBlock, { width: width - (theme.SIZES.BASE * 2), height: 200 }]}
                        imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 200 }}>
                        <Block style={styles.categoryTitle}>
                        <Text size={18} bold color={theme.COLORS.WHITE}>Harley-Davidson</Text>
                        </Block>
                    </ImageBackground>
                </Block>
            </ScrollView>
            <Text color={'#3F4079'} bold size={17} style={{marginVertical: theme.SIZES.BASE}}>Doctors near by you</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Block flex row>
                        <HorizontalListItem product={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
                        <HorizontalListItem product={products[2]} />
                        <HorizontalListItem product={products[3]} />
                        <HorizontalListItem product={products[4]} />
                </Block>
            </ScrollView>
          </Block>
        </Block>
      </Block>
    )
  }

  return (
    <Block flex>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}> 
        {navbar()}
        {renderCards()}
        {googleMap()}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  navbarBtn: {
    width: theme.SIZES.BASE * 5,
    height: theme.SIZES.BASE * 5,
    padding: theme.SIZES.BASE,
    borderColor: 'white',
    marginLeft: theme.SIZES.BASE * 3,
  },
  components: {
    marginBottom: theme.SIZES.BASE,
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
  navbar: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#6E78F7',
    padding: 0,
    height: theme.SIZES.BASE * 10,
  },
  navbarBtnGroup: {
    marginTop: -theme.SIZES.BASE * 4,
    marginBottom: theme.SIZES.BASE,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 1,
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
    paddingRight: theme.SIZES.BASE,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Components;