import React, { useEffect } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, View, TouchableOpacity } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import materialTheme from '../constants/Theme';
import {IMLocalized, init} from '../src/localization/IMLocalization';
import { Icon, Product } from '../components/';
import { ScrollView } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('screen');

const TimeSlot = (props) => {
  const { navigation } = props;
  
    return (
      <Block flex style={styles.container}>        
        <Block>
          <Block style={styles.roundBlock}>
            <Block row style={styles.head}>
              <Block>                
                <Icon size={16} name="arrow-left" family="font-awesome" color={'white'} style={{padding: 5}} />
              </Block>
              <Block>
                <Text color="white" size={20} style={{fontFamily: 'Inter-Black'}} bold>Select a time slot</Text>                    
              </Block>
            </Block>
          </Block>
        </Block>
        <Block style={{marginHorizontal: width * 0.03, marginTop: height * 0.18, zIndex: 2, backgroundColor: 'white', borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
          <ScrollView>
            <Block row style={{margin: 10, borderBottomWidth: 1, borderColor: '#F0F0F0'}}>
              <Image source={require('../assets/images/avatar.png')} alt="" ></Image>
              <Block center>
                <Text bold style={{alignSelf: 'flex-start'}}>
                  Dr. Jitendra Raut
                </Text>
                <Text color={'grey'}>
                  B.Sc, MBBS, DDVL, MD- Dermitol...
                </Text>
              </Block>
            </Block>
            <Block row center>
              <Icon size={20} name="arrow-circle-left" family="font-awesome" style={{padding: 5, marginRight: width * 0.1}} color="grey" />
              <Text>
                Tomorrow, 9 Dec
              </Text>
              <Icon size={20} name="arrow-circle-right" family="font-awesome" style={{padding: 5, marginLeft: width * 0.1}} color="grey" />
            </Block>
            <Block center row style={{margin: 10, backgroundColor: "#FBFBFB", borderColor: "#D8D8D8", borderWidth: 1, borderRadius: 10, padding: 20}}>
              <Text style={{paddingHorizontal: width * 0.03}}>
                10.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                11.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                12.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                12.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                12.00
              </Text>
              <ImageBackground
                source={require('../assets/images/morning.png') }  
                style={{top: -10, left: 10, width: 100, height: 20,  position: 'absolute'}}
              >
                <Block style={{top: 0, left: 24, position: 'absolute'}}>
                  <Text size={12}>
                    Morning
                  </Text>
                </Block>
              </ImageBackground>
            </Block>       
            <Block center row style={{margin: 10, backgroundColor: "#FBFBFB", borderColor: "#D8D8D8", borderWidth: 1, borderRadius: 10, padding: 20}}>
              <Text style={{paddingHorizontal: width * 0.03}}>
                10.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                11.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                12.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                12.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                12.00
              </Text>
              <ImageBackground
                source={require('../assets/images/afternoon.png') }  
                style={{top: -10, left: 10, width: 100, height: 20,  position: 'absolute'}}
              >
                <Block style={{top: 0, left: 24, position: 'absolute'}}>
                  <Text size={12}>
                    Afternoon
                  </Text>
                </Block>
              </ImageBackground>
            </Block> 
            <Block center row style={{margin: 10, backgroundColor: "#FBFBFB", borderColor: "#D8D8D8", borderWidth: 1, borderRadius: 10, padding: 20}}>
              <Text style={{paddingHorizontal: width * 0.03}}>
                10.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                11.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                12.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                12.00
              </Text>
              <Text style={{paddingHorizontal: width * 0.03}}>
                12.00
              </Text>
              <ImageBackground
                source={require('../assets/images/evening.png') }  
                style={{top: -10, left: 10, width: 150, height: 20,  position: 'absolute'}}
              >
                <Block style={{top: 0, left: 24, position: 'absolute'}}>
                  <Text size={12}>
                    Evening and Night
                  </Text>
                </Block>
              </ImageBackground>
            </Block>              
            <TouchableOpacity
              style={{borderRadius: 20, alignSelf: 'center', marginVertical: 30, paddingVertical: 10, paddingHorizontal: 50, backgroundColor: 'rgba(100, 120, 247, 0.84)'}}
            >
              <Text bold size={16} color={'white'}>
                Book
              </Text>
            </TouchableOpacity>                      
          </ScrollView>                
        </Block>            
      </Block>
    );
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
  },
  button: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius : 25,
    width: width - theme.SIZES.BASE * 6,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 2,
    shadowOpacity: 5,
    backgroundColor: 'white'
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 8,
    marginLeft: 12,
    borderRadius: 2,
    height: 22
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    top: 33 + theme.SIZES.BASE,
    left: 0,
    right: 0,
    height: 90,
  },
  circle: {
    width: theme.SIZES.BASE * 10,
    height: theme.SIZES.BASE * 10,
    backgroundColor: '#3946FF',
    position: 'absolute',
    borderRadius: 1000,
    right: -theme.SIZES.BASE * 5,
    bottom: -theme.SIZES.BASE * 8
  },
  roundBlock: {
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    position: 'absolute',
    backgroundColor: 'rgba(100, 120, 247, 0.84)',
    height: height * 0.25,    
    width: width,
    top: 0,
    zIndex: 2
  },
  backIcon: {
    position: 'absolute',
    zIndex: 100,
    width: theme.SIZES.BASE * 1.5,
    height: theme.SIZES.BASE * 1.5,
    left: theme.SIZES.BASE * 2,
    top: theme.SIZES.BASE * 5
  },
  buttonTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  head: { 
    marginTop: height * 0.1, 
    paddingHorizontal: theme.SIZES.BASE * 0.5, 
    position: 'absolute', 
    zIndex: 1 
  },
});

export default TimeSlot;