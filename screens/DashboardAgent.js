import React from 'react';
import { StyleSheet, Dimensions, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { useDispatch, useSelector } from "react-redux";
import { IMLocalized } from "../src/localization/IMLocalization";

const { width } = Dimensions.get('screen');

const DashboardAgent = (props) => {

  const renderEvents = (events) => {

    let { eventHeading, eventContent } = {...events};
    const userRole = useSelector(state => state.user.role);

    return(
      <Block style={styles.options}>          
        <Block column space="between" style={styles.events}>
          <Block row style={styles.marginLB10}>
            <Block>
              <Text color={'grey'} size={14}>
                {IMLocalized(eventHeading)}
              </Text>
            </Block>
            <Block>
              <Text color={'red'}>
                *
              </Text>
            </Block>                
          </Block>
          <Block style={styles.marginL10}>
            <Text  size={16} color={'black'}>{eventContent}</Text>
          </Block>              
        </Block>          
      </Block>
    );
  }

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
      <Block flex={0.7}>        
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
  marginL10: {
    marginLeft: 10
  },
  options: {
    position: 'relative',
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 3,
    marginBottom: theme.SIZES.BASE * 4,
    borderRadius: 30,    
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
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
});

export default DashboardAgent;