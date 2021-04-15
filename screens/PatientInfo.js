import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";

const { width,height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

const PatientInfo = (props) => {
  return (
    <Block flex style={styles.patientInfo}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <Block style={{paddingTop: height * 0.05}} >
          <Block style={styles.options}>
            <Block row>
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block middle>
                      <Icon name="user" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                    </Block>
                    <Block>
                      <Text muted size={12}>Patient Name</Text>
                    </Block>                      
                  </Block>                                    
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start' , width: width * 0.36, padding: width * 0.02}}>Jimmy Fallon</Text>
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block middle>
                      <Icon name="phone" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                    </Block>
                    <Block>
                    <Text muted size={12} >Phone Number</Text>
                    </Block>                      
                  </Block>                    
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start' , width: width * 0.36, padding: width * 0.02}}>01234567890</Text>
                </Block>
                <Block middle>
                <Block row style={{ alignSelf: 'flex-start'}}>
                  <Block middle>
                    <Icon name="envelope" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                  </Block>
                  <Block>
                    <Text muted size={12} >Email address</Text>
                    </Block>                      
                  </Block>                    
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start', width: width * 0.36, padding: width * 0.02}}>emailaddress@gmail.com</Text>
                </Block>
              </Block>   
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block middle>
                      <Icon name="id-card" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                    </Block>
                    <Block>
                    <Text muted size={12}>National ID</Text>
                    </Block>                      
                  </Block>                  
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start', padding: width * 0.02}}>3236945328940784098</Text>
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block middle>
                      <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                    </Block>
                    <Block>
                    <Text muted size={12}>Country, Province</Text>
                    </Block>                      
                  </Block>                   
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start', padding: width * 0.02}}>US California</Text>
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block middle>
                      <Icon name="address-book" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                    </Block>
                    <Block>
                    <Text muted size={12}>Address</Text>
                    </Block>                      
                  </Block>                  
                  <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start', padding: width * 0.02}}>Address here</Text>
                </Block>
              </Block>   
            </Block>    
          </Block>        
        </Block>
        <Block style={{paddingTop: height * 0.05}} >
          <Block style={styles.options}>        
            <Block row>
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3, width: width * 0.45}}>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>                      
                      <Icon name="heart" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>  
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>Age</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.18}}>33</Text>
                    </Block>                    
                  </Block>                  
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>
                      <Icon name="arrow-up" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>                        
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>Height</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.1}}>170CM</Text>
                    </Block>                    
                  </Block>                  
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>
                      <Icon name="tint" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>                        
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>Blood Type</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.07}}>AB</Text>
                    </Block>                    
                  </Block>                  
                </Block>
              </Block>   
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>
                      <Icon name="venus-mars" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>                        
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>Gender</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.19}}>F</Text>
                    </Block>                    
                  </Block>                  
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>
                      <Icon name="fire" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>                        
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>Weight</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.16}}>70 kg</Text>
                    </Block>                    
                  </Block>                  
                </Block>
                <Block middle>
                  <Block row style={{ alignSelf: 'flex-start'}}>
                    <Block block>
                      <Icon name="shield" family="font-awesome" color={theme.COLORS.MUTED} size={16}> </Icon>                        
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>Insurance</Text>
                    </Block>
                    <Block block>
                      <Text bold size={12} color="black" style={{marginBottom: 8, alignSelf: 'flex-end', padding: width * 0.02, paddingLeft: width * 0.1}}>Insured</Text>
                    </Block>                    
                  </Block>                  
                </Block>
              </Block>  
            </Block>  
          </Block>        
        </Block>
        <Block style={{paddingTop: height * 0.05}}>
          <Block style={styles.options}>          
            <Block row>
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Text muted size={10} style={{ alignSelf: 'flex-start'}}>15</Text>
                  <Text bold size={10} color="black" style={{marginBottom: 8, alignSelf: 'flex-start' }}>Prescriptions</Text>
                </Block>
              </Block>   
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Text muted size={10} style={{ alignSelf: 'flex-start'}}>6</Text>
                  <Text bold size={10} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>Ongoing Meds</Text>
                </Block>
              </Block>  
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Text muted size={10} style={{ alignSelf: 'flex-start'}}>10</Text>
                  <Text bold size={10} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>Visits</Text>
                </Block>
              </Block>
              <Block block space="between" style={{ padding: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE * 0.3}}>
                <Block middle>
                  <Text muted size={10} style={{ alignSelf: 'flex-start'}}>10</Text>
                  <Text bold size={10} color="black" style={{marginBottom: 8, alignSelf: 'flex-start'}}>Consultations</Text>
                </Block>
              </Block>    
            </Block>    
          </Block>        
        </Block>
      </ScrollView>      
    </Block>
  );
}

const styles = StyleSheet.create({
  patientInfo: {
    marginTop: Platform.OS === 'android' ? height * 0.01 : height * 0.01,
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
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE,
    marginBottom: 0,
    paddingTop: height * 0.02,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    elevation: 3,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 8,
    shadowOpacity: 0.8,
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
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
});

export default PatientInfo;