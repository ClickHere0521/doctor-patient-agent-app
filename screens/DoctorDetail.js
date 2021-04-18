import React, { useEffect } from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import {IMLocalized, init} from '../src/localization/IMLocalization';
import { Icon} from '../components/';
import { ScrollView } from 'react-native-gesture-handler';

const DoctorDetail = (props) => {
  
  const { navigation } = props;

  return (
    <Block flex style={styles.container}>        
      <Block >
        <Block style={styles.roundBlock}>
        <Block row style={styles.headArrow}>
          <Block>                
            <Icon size={16} name="chevron-left" family="font-awesome" color={'white'} style={{padding: 5}} onPress={() => navigation.navigate("Primary Care Doctor View")} />
          </Block>
        </Block>
        </Block>
      </Block>
      <Block style={styles.body}>
        <Block center style={styles.header}>
          <Text style={styles.prime} color={'#00CE30'} bold > Prime </Text>    
          <Text style={styles.rating} color={'grey'} > 4.2 </Text> 
          <Image style={styles.star} source={require('../assets/images/star.png')} alt="" />   
          <Block>                        
            <Image source={require('../assets/images/grayscale-photo-of-man2.png')} style={styles.imageStyle}></Image>                        
          </Block>                    
          <Text bold size={16} style={{marginTop: 10}}>
            Dr. Ronald Joseph
          </Text>
          <Text  color={'grey'}>
            B.Sc, MBBS, DDVL, MD- Dermitologist
          </Text>
          <Block row style={styles.headBottom}>
            <Text color="grey" size={12} style={{paddingRight: width * 0.1}}>
              <Text color="black" size={14}>16</Text> yrs. Experience
            </Text>
            <Text color="grey" size={12}>
              <Text color="black" size={14}>89</Text>% (4384 votes)
            </Text>
          </Block>
        </Block>
      </Block> 
      <ScrollView>
        <Block style={styles.mainBody}>
          <Block  style={{marginHorizontal: width * 0.01}}>
            <Block row>
              <Icon
                name="map-marker"
                family="font-awesome"
                color={'#00CE30'}
                style={{ margin:10}}
              />
              <Text size={12} color={'grey'} style={{marginTop: 10}}>
                92/6, 3rd Floor, Outer Ring Road, Chandra Layout
              </Text>
            </Block>                        
            <Image                             
              source={require('../assets/images/map.png')}
              alt=""
              style={{margin: width * 0.01, alignSelf:"center"}}    
            />                        
            <Block row style={{margin: 10, marginBottom: height * 0.02}}>
              <Text bold color="black" style={{alignSelf: 'flex-start'}}>
                Tel
                <Text color="red">*</Text>                                
              </Text>
              <Text color="grey" style={{paddingLeft: 10}}>+1234567890</Text>
            </Block>
            <Text bold color="black" style={styles.info}>
              Info
              <Text color="red">*</Text>                                
            </Text>
            <Text color="grey" style={{alignSelf: 'flex-start', paddingLeft: 10, marginLeft: 10}}>
              Description: Lorem ipsum dolor sit amet, 
              consetetur sadipscing elitr, sed diam nonu my eirmod tempor invidun.                             
            </Text>
            <Block center>
              <TouchableOpacity                                                                                        
                textStyle={styles.optionsButtonText}
                style={styles.optionsButton}
                onPress={() => navigation.navigate("DoctorInfo")}
              >
              <Text color="white">
                Detail
              </Text>
              </TouchableOpacity>
            </Block>
            <Text bold color="black" style={styles.schedule}>
              Schedule
              <Text color="red">*</Text>                                
            </Text>
            <Block center>
              <TouchableOpacity                                                                                        
                textStyle={styles.optionsButtonText}
                style={styles.optionsButton}
                onPress={() => navigation.navigate("DoctorScheduleDetail")}
              >
                <Text color="white">
                    Detail
                </Text>
              </TouchableOpacity>
            </Block>
            <Text bold color="black" style={{alignSelf: 'flex-start', margin: 10, marginBottom:0}}>
              Linked case list
              <Text color="red">*</Text>                                
            </Text>
            <Block center>
              <TouchableOpacity                                                                                        
                textStyle={styles.optionsButtonText}
                style={styles.optionsButton}
                onPress={() => handleDelete(item.id)}
              >
              <Text color="white">
                Detail
              </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>  
      </ScrollView>           
    </Block>
  );  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
  },
  headArrow: {
    marginTop: height * 0.1, 
    paddingHorizontal: theme.SIZES.BASE * 0.5, 
    position: 'absolute', 
    zIndex: 1 
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
  optionsButton: {
    paddingVertical: 6,
    paddingHorizontal: 40,
    backgroundColor: '#00CE30',  
    borderRadius: 14,
    marginVertical: 16,
      
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
  imageStyle: {
    width:80, 
    height:80
  },
  body: {
    marginHorizontal: width * 0.04, 
    marginTop: height * 0.18, 
    zIndex: 2, 
    backgroundColor: 
    'white', 
    borderRadius: 12
  },
  prime: {
    top: height * 0.08, 
    left: - width * 0.08, 
    position: "absolute"
  },
  header: {
    marginHorizontal: width * 0.01, 
    marginTop: -height * 0.05
  },
  rating: {
    top: height * 0.08, 
    right: -width * 0.08,
    position: "absolute"
  },
  headBottom: {
    marginTop: 10, 
    marginBottom: height * 0.02
  },
  star: {
    top: height * 0.08, 
    right: -width * 0.01, 
    position: "absolute"
  },
  mainBody: {
    marginHorizontal: width * 0.04, 
    marginTop: height * 0.06, 
    zIndex: 2, 
    backgroundColor: 'white', 
    borderRadius: 12
  },
  info: {
    marginHorizontal: width * 0.04, 
    marginTop: height * 0.06, 
    zIndex: 2, 
    backgroundColor: 'white', 
    borderRadius: 12
  },
  schedule: {
    alignSelf: 'flex-start', 
    margin: 10, 
    marginBottom:0
  }
});

export default DoctorDetail;