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
import { Select, Icon, Header, Product, Switch, Tabs, ListItem } from '../components/';
import { LinearGradient } from 'expo-linear-gradient';
import SwitchButton from 'switch-button-react-native';


const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = theme.SIZES.BASE * 4;
const categories = [
  {
    title: 'Eddie',
    image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?fit=crop&w=840&q=80'
  },
  {
    title: 'Julia',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?fit=crop&w=840&q=80'
  },
  {
    title: 'Frank',
    image: 'https://images.unsplash.com/photo-1536942338469-91c7022e55a7?fit=crop&w=840&q=80'
  },
  {
    title: 'Sam',
    image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?fit=crop&w=840&q=80'
  },
  {
    title: 'Yan',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?fit=crop&w=840&q=80'
  },
  {
    title: 'John',
    image: 'https://images.unsplash.com/photo-1536942338469-91c7022e55a7?fit=crop&w=840&q=80'
  },
  {
    title: 'Nick',
    image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?fit=crop&w=840&q=80'
  },
  {
    title: 'Power',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?fit=crop&w=840&q=80'
  },
  {
    title: 'Sarah',
    image: 'https://images.unsplash.com/photo-1536942338469-91c7022e55a7?fit=crop&w=840&q=80'
  },
];

const sortCategories = [
    {
      title: 'Name'
    },
    {
      title: 'Case'
    },
    {
      title: 'Date'
    },
    {
      title: 'Current Status'
    },
  ];

const Components = (props) => {

  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(false);

  const toggleSwitch = switchId => {
    if (switchId == 'switch1')
    {
      setSwitch1(!switch1);
    }
    if (switchId == 'switch2')
    {
      setSwitch2(!switch2);
    }
  };

  const renderSort = (item, index) => {
    const { navigation } = props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => navigation.navigate('Pro', { product: item })}>
        <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.25, y: 1.1 }}
                  locations={[0.2, 1]}
                  colors={['#EFEFEF', '#FFF']} style={styles.sortItem}>
          <Block center>
              <Text center size={15} fontWeight="semiBold">{item.title}</Text>
          </Block>
        </LinearGradient>
      </TouchableWithoutFeedback>
    )
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
              style={{width}}
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + (theme.SIZES.BASE * 0.375)}
              contentContainerStyle={{ paddingHorizontal: theme.SIZES.BASE / 2 }}
            >
              {sortCategories && sortCategories.map((item, index) => renderSort(item, index))}
            </ScrollView>
          </Block>
        </Block>
      </Block>
    )
  }

  const renderPatientsList = () => {
      return(
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={{marginBottom: theme.SIZES.BASE * 3}}>
                <ListItem product={products[0]} horizontal />
                <ListItem product={products[1]} horizontal />
                <ListItem product={products[2]} horizontal />
                <ListItem product={products[3]} horizontal />
                <ListItem product={products[4]} horizontal />
                <ListItem product={products[0]} horizontal />
                <ListItem product={products[1]} horizontal />
                <ListItem product={products[2]} horizontal />
                <ListItem product={products[3]} horizontal />
                <ListItem product={products[4]} horizontal />
                <ListItem product={products[0]} horizontal /> 
            </ScrollView>    
        </Block>
      )
  }


  return (
    <Block flex>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}>
        {/* {navbar()} */}
        {renderSorts()}
        {renderPatientsList()}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  sortBox: {
    borderTopWidth:2,
    borderColor: 'white',
    margin: theme.SIZES.BASE,
    marginBottom: 0
  },
  components: {
    backgroundColor: "#FFF",
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - (theme.SIZES.BASE * 3),
  },
  options: {
    paddingHorizontal: theme.SIZES.BASE / 2,
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: '#4a4a4a',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  sortItem: {
    borderWidth: 2,
    borderRadius : 1000,
    borderColor: 'white',
    marginVertical: 4,
    paddingVertical: 6,
    paddingHorizontal: 25,
    marginHorizontal: theme.SIZES.BASE / 4,
    shadowColor: 'black',
    shadowOffset: { width: -3, height: -3 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  productRounded: {
    borderWidth: 2,
    borderRadius : 1000,
    borderColor: '#DDDDDD',
    padding: 3,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  productImage: {
    borderWidth: 1,
    borderRadius : 1000,
    padding: 5,
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
  },
  searchBtn: {
    position: 'absolute',
    right: theme.SIZES.BASE,
    borderRadius: 1000,
    borderWidth:1,
    borderColor: '#DDD',
    backgroundColor: "#FFF",
    width: theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 2,
    marginLeft: 5
  },
  greyGradient: {
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
  }
});

export default Components;