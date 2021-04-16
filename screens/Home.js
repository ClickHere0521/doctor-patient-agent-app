import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

const Home = (props) => {
  return (
    <Block flex style={styles.profile}>
      <ImageBackground
        source={ require('../assets/images/dashboard.png')}
        style={styles.profileContainer}
        imageStyle={styles.profileImage}>
        <Block flex style={styles.profileDetails}>
          <Block style={styles.profileTexts}>            
          </Block>
          <LinearGradient colors={['rgba(110,120,247,0.2)', 'rgba(110,120,247,0.3)']} style={styles.gradient} />
          <LinearGradient colors={['rgba(110,120,247,0.2)', 'rgba(110,120,247,0.3)']} style={styles.gradient} />
        </Block>
      </ImageBackground>
      <Block flex={0.7}>        
        <Block style={styles.options}>          
          <Block column space="between" style={{ padding: theme.SIZES.BASE * 0.2, marginLeft: 10 }}>
            <Block row style={{marginLeft: 10, marginBottom: 10}}>
              <Block>
                <Text color={'grey'} size={14}>
                  Total active case               
                </Text>
              </Block>
              <Block>
                <Text color={'red'}>
                  *
                </Text>
              </Block>                
            </Block>
            <Block style={{marginLeft: 10}}>
              <Text  size={16} color={'black'}>3000</Text>
            </Block>              
          </Block>          
        </Block>
        <Block style={styles.options}>          
          <Block column space="between" style={{ padding: theme.SIZES.BASE * 0.2, marginLeft: 10 }}>
            <Block row style={{marginLeft: 10, marginBottom: 10}}>
              <Block>
                <Text color={'grey'} size={14}>
                  This year               
                </Text>
              </Block>
              <Block>
                <Text color={'red'}>
                  *
                </Text>
              </Block>                
            </Block>
            <Block style={{marginLeft: 10}}>
              <Text  size={16} color={'black'}>700</Text>
            </Block>              
          </Block>          
        </Block>
        <Block style={styles.options}>          
          <Block column space="between" style={{ padding: theme.SIZES.BASE * 0.2, marginLeft: 10 }}>
            <Block row style={{marginLeft: 10, marginBottom: 10}}>
              <Block>
                <Text color={'grey'} size={14}>
                  Case resolved this year               
                </Text>
              </Block>
              <Block>
                <Text color={'red'}>
                  *
                </Text>
              </Block>                
            </Block>
            <Block style={{marginLeft: 10}}>
              <Text  size={16} color={'black'}>605</Text>
            </Block>              
          </Block>          
        </Block>
        <Block style={styles.options}>          
          <Block column space="between" style={{ padding: theme.SIZES.BASE * 0.2, marginLeft: 10 }}>
            <Block row style={{marginLeft: 10, marginBottom: 10}}>
              <Block>
                <Text color={'grey'} size={14}>
                  Ongoing case               
                </Text>
              </Block>
              <Block>
                <Text color={'red'}>
                  *
                </Text>
              </Block>                
            </Block>
            <Block style={{marginLeft: 10}}>
              <Text  size={16} color={'black'}>80</Text>
            </Block>              
          </Block>          
        </Block>      
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
  seller: {
    marginRight: theme.SIZES.BASE / 2,
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
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
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

export default Home;