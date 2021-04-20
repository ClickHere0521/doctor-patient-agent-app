import React from 'react';
import { StyleSheet, Dimensions, ImageBackground, Platform, TouchableWithoutFeedback, Image } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme, products } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { useDispatch, useSelector } from "react-redux";
import { IMLocalized } from "../src/localization/IMLocalization";
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from "../components/"
const { width } = Dimensions.get('screen');
const cardWidth = theme.SIZES.BASE * 4;

const categories = [
  {
    title: "Eddie",
    image:
      "https://images.unsplash.com/photo-1507290439931-a861b5a38200?fit=crop&w=840&q=80",
  },
  {
    title: "Julia",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?fit=crop&w=840&q=80",
  },
  {
    title: "Frank",
    image:
      "https://images.unsplash.com/photo-1536942338469-91c7022e55a7?fit=crop&w=840&q=80",
  },
  {
    title: "Sam",
    image:
      "https://images.unsplash.com/photo-1507290439931-a861b5a38200?fit=crop&w=840&q=80",
  },
  {
    title: "Yan",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?fit=crop&w=840&q=80",
  },
  {
    title: "John",
    image:
      "https://images.unsplash.com/photo-1536942338469-91c7022e55a7?fit=crop&w=840&q=80",
  },
  {
    title: "Nick",
    image:
      "https://images.unsplash.com/photo-1507290439931-a861b5a38200?fit=crop&w=840&q=80",
  },
  {
    title: "Power",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?fit=crop&w=840&q=80",
  },
  {
    title: "Sarah",
    image:
      "https://images.unsplash.com/photo-1536942338469-91c7022e55a7?fit=crop&w=840&q=80",
  },
];

const sortCategories = [
  {
    title: "Case",
  },
  {
    title: "Date",
  },
  {
    title: "Current Status",
  },
];

const DashboardAgent = (props) => {

  const renderEvents = (events) => {

    let { eventHeading, eventContent } = {...events};
    const userRole = useSelector(state => state.user.role);

    return(
      <Block style={styles.options}>          
        <Block column space="between" style={styles.events}>
          <Block row >
            <Block style={styles.marginLB10}>
              <Text color={'grey'} size={14}>
                {IMLocalized(eventHeading)}
              </Text>
            </Block>
            <Block>
              <Text color={'red'}>
                *
              </Text>
            </Block>      
            <Block style={styles.marginR10}>
              <Text  size={16} color={'black'}>{eventContent}</Text>
            </Block>                        
          </Block>
        </Block>          
      </Block>
    );
  }

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
                paddingHorizontal: theme.SIZES.BASE / 4,
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

  const renderSort = (item, index) => {
    const { navigation } = props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => console.log("Sort pressed")}
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

  const renderPatientsList = () => {
    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </Block>
    );
  };

  return (
    <Block flex style={styles.profile}>
      <ImageBackground
        source={ require('../assets/images/dashboard.png')}
        style={styles.profileContainer}
        imageStyle={styles.profileImage}>
        <Block flex style={styles.profileDetails}>
          <Block style={styles.profileTexts}>            
          </Block>
          <LinearGradient 
            colors={['rgba(110,120,247,0.2)', 'rgba(110,120,247,0.3)']} 
            style={styles.gradient} 
          />
          <LinearGradient 
            colors={['rgba(110,120,247,0.2)', 'rgba(110,120,247,0.3)']} 
            style={styles.gradient} 
          />
        </Block>
      </ImageBackground>
      <Block flex={0.7} style={{top: theme.SIZES.BASE * 12, position:'absolute'}}>        
        {renderEvents({
          eventHeading: IMLocalized('Total active case'), 
          eventContent: 3000
        })}
        {renderEvents({
          eventHeading: IMLocalized('This year'), 
          eventContent: 700
        })}
        {renderEvents({
          eventHeading: IMLocalized('Case resolved this year'),
          eventContent: 605
        })}
        {renderEvents({
          eventHeading: IMLocalized('ongoingCase'),
          eventContent: 80
        })}                       
      </Block>      
      <Block flex={1}>
        <ScrollView          
          showsVerticalScrollIndicator={false}
        >
          {renderSorts()}
          {renderPatientsList()}
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: 'auto',
    flex: 1,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 90,
  },
  events: {
    padding: theme.SIZES.BASE * 0.2, 
    marginLeft: 10 
  },
  marginLB10: {
    marginLeft: 10, 
    marginBottom: 10
  },
  marginR10: {
    right: theme.SIZES.BASE * 2,
    position: 'absolute' 
  },
  options: {
    width: width * 0.9,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE * 0.5,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 3,
    marginBottom: theme.SIZES.BASE * 4,
    borderRadius: 40,    
    backgroundColor: theme.COLORS.WHITE,    
    shadowColor: 'black',
    shadowOffset: { width:0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation:3,
    zIndex: 2,
  },
  gradient: {
    zIndex: 10,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    position: 'absolute',
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 3,
  },
  optionsCaseView: {
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
    paddingHorizontal: width * 0.05,
    marginHorizontal: theme.SIZES.BASE,
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

export default DashboardAgent;